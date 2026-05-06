import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiEnvelopeOk } from '../../common/swagger/api-response-docs';
import { swaggerExamples } from '../../common/swagger/swagger-examples';
import { AuthService } from './auth.service';
import { LoginDto } from './dto';

@ApiTags('Admin - Auth')
@Controller('admin/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Đăng nhập quản trị và nhận bearer token demo.' })
  @ApiBody({ type: LoginDto, examples: { demo: { value: swaggerExamples.adminLogin } } })
  @ApiEnvelopeOk({ description: 'Đăng nhập thành công.' })
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto.email, dto.password);
  }
}
