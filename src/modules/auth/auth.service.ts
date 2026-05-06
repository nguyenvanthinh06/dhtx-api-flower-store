import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ApiPayload } from '../../common/interceptors/response.interceptor';
import { AdminAccount, AdminProfile, AdminUser } from './auth.types';
import {
  AdminUserQueryDto,
  CreateAdminUserDto,
  UpdateAdminUserDto,
} from './dto';

@Injectable()
export class AuthService {
  private adminSequence = 3;

  private readonly admins: AdminAccount[] = [
    {
      id: 1,
      email: 'admin@flower-store.local',
      password: 'admin123',
      name: 'Flower Store Admin',
      roles: ['admin'],
      token: 'dev-admin-token',
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 2,
      email: 'staff@flower-store.local',
      password: 'staff123',
      name: 'Flower Store Staff',
      roles: ['staff'],
      token: 'dev-admin-token-2',
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];

  login(email: string, password: string) {
    const normalizedEmail = email.toLowerCase();
    const admin = this.admins.find((item) => item.email === normalizedEmail);

    if (!admin || admin.password !== password || !admin.isActive) {
      throw new UnauthorizedException('Invalid email or password');
    }

    return {
      accessToken: admin.token,
      tokenType: 'Bearer',
      admin: this.toProfile(admin),
    };
  }

  validateToken(token?: string): AdminUser {
    const admin = this.admins.find((item) => item.token === token);

    if (!admin || !admin.isActive) {
      throw new UnauthorizedException('Invalid admin token');
    }

    return this.toUser(admin);
  }

  findAll(query: AdminUserQueryDto): ApiPayload<AdminProfile[]> {
    const filtered = this.admins
      .filter((admin) => {
        const matchedKeyword = query.keyword
          ? admin.email.toLowerCase().includes(query.keyword.toLowerCase()) ||
            admin.name.toLowerCase().includes(query.keyword.toLowerCase())
          : true;
        const matchedStatus =
          typeof query.isActive === 'boolean'
            ? admin.isActive === query.isActive
            : true;

        return matchedKeyword && matchedStatus;
      })
      .map((admin) => this.toProfile(admin));
    const page = query.page;
    const limit = query.limit;
    const start = (page - 1) * limit;

    return {
      data: filtered.slice(start, start + limit),
      paging: {
        page,
        limit,
        total: filtered.length,
        totalPages: Math.ceil(filtered.length / limit),
      },
    };
  }

  findOne(id: number): AdminProfile {
    return this.toProfile(this.findAccountById(id));
  }

  create(dto: CreateAdminUserDto): AdminProfile {
    const normalizedEmail = dto.email.toLowerCase();
    this.assertEmailAvailable(normalizedEmail);

    const now = new Date().toISOString();
    const id = this.adminSequence++;
    const admin: AdminAccount = {
      id,
      email: normalizedEmail,
      password: dto.password,
      name: dto.name,
      roles: [...dto.roles],
      token: `dev-admin-token-${id}-${Date.now()}`,
      isActive: dto.isActive ?? true,
      createdAt: now,
      updatedAt: now,
    };

    this.admins.push(admin);
    return this.toProfile(admin);
  }

  update(id: number, dto: UpdateAdminUserDto): AdminProfile {
    const admin = this.findAccountById(id);

    if (dto.email) {
      const normalizedEmail = dto.email.toLowerCase();
      if (normalizedEmail !== admin.email) {
        this.assertEmailAvailable(normalizedEmail, id);
      }
      dto.email = normalizedEmail;
    }

    Object.assign(admin, dto, {
      ...(dto.roles ? { roles: [...dto.roles] } : {}),
      updatedAt: new Date().toISOString(),
    });
    return this.toProfile(admin);
  }

  remove(id: number, currentAdmin: AdminUser): AdminProfile {
    if (id === currentAdmin.id) {
      throw new BadRequestException('Cannot delete the currently logged-in admin');
    }

    const admin = this.findAccountById(id);
    const index = this.admins.findIndex((item) => item.id === id);
    this.admins.splice(index, 1);

    return this.toProfile(admin);
  }

  private findAccountById(id: number): AdminAccount {
    const admin = this.admins.find((item) => item.id === id);
    if (!admin) throw new NotFoundException('Admin user not found');
    return admin;
  }

  private assertEmailAvailable(email: string, ignoredId?: number): void {
    const existed = this.admins.some(
      (admin) => admin.email === email.toLowerCase() && admin.id !== ignoredId,
    );

    if (existed) {
      throw new ConflictException('Admin email already exists');
    }
  }

  private toUser(admin: AdminAccount): AdminUser {
    return {
      id: admin.id,
      email: admin.email,
      name: admin.name,
      roles: admin.roles,
    };
  }

  private toProfile(admin: AdminAccount): AdminProfile {
    const { password: _password, token: _token, ...profile } = admin;
    return profile;
  }
}
