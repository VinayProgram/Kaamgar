import {
  Controller,
  Post,
  Body,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { LoginModuleService } from './login-module.service';

@Controller('login-module')
export class LoginModuleController {
  constructor(private readonly loginModuleService: LoginModuleService) { }

  @Post('/')
  async login(
    @Body() body: { email: string; password: string },
    @Res() res: Response,
  ) {
    try {
      const result = await this.loginModuleService.login(body);
      res.cookie('authToken', result.data?.token, {
        httpOnly: true, // ✅ Not accessible via JS
        secure: process.env.NODE_ENV === 'production', // Only over HTTPS
        sameSite: 'lax', // Helps with CSRF
        
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });
      // Set JWT token in custom header

      // Send response with token and user data
      return res.status(HttpStatus.OK).json({
        success: true,
        user: result.data?.email,
        token: result.data?.token,
      });
    } catch (error) {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        success: false,
        message: error.message || 'Login failed',
      });
    }
  }
}
