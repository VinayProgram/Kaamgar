import { Body, Controller, Delete, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { LoginModuleService } from './login-module.service';
import { signupDtoSchema } from './types/login.dto';
import { Request, Response } from 'express';
import { Public } from '@app/guards/gaurds.public.service';

@Controller('login-module')
export class LoginModuleController {
  constructor(private readonly loginModuleService: LoginModuleService) {}

  @Post('signup')
  @Public()
  async signup(@Body() signupDto: signupDtoSchema) {
    return await this.loginModuleService.signup(signupDto);
  }

  @Post('login')
  @Public()
  async login(@Body() loginDto: { email: string; password: string },@Res() res:Response) {
    const user = await this.loginModuleService.login(loginDto);
    if (!user) {
      throw new Error('Invalid email or password');
    }

    res.cookie('consumerToken', user.token, {
        httpOnly: true, // ✅ Not accessible via JS
        secure: process.env.NODE_ENV === 'production', // Only over HTTPS
        sameSite: 'lax', // Helps with CSRF
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });
    return res.status(HttpStatus.OK).json({
        success: true,
        user: user?.email,
        token: user?.token,
      });
  }

  @Delete('logout')
  @Public()
  async logout(@Res() res: Response) {
    res.clearCookie('consumerToken', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    });
    return res.status(HttpStatus.OK).json({
      success: true,
      message: 'Logged out successfully',
    });
  }

  @Post('check-auth')
  @Public()
  async checkAuth(@Req() req:Request,@Res() res: Response) {
    const token = req.cookies.consumerToken;
    if (!token) {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        success: false,
        message: 'No authentication token provided',
      });
    }
    const authResult = await this.loginModuleService.checkAuth(token);
    if (!authResult) {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        success: false,
        message: 'Invalid authentication token',
      });
    }
    return res.status(HttpStatus.OK).json({
      success: true,
      data: authResult,
      message: 'User is authenticated',
    });
  }

  
}
