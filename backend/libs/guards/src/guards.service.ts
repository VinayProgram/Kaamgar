import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { verifyToken } from 'libs/encryption';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from './gaurds.public.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private reflector: Reflector) {}
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }
    const token = this.getTokenFromCookie(request);
    if (token) {
      request.headers.user = {
        token, // example payload
      };
    } else {
      console.log('No token found in cookies');
    }

    return true;
  }

  private getTokenFromCookie(request: Request) {
    if (request.cookies && request.cookies['consumerToken']) {
        return verifyToken(request.cookies['consumerToken'], 'hehehehe');
    }
    else if(request.cookies && request.cookies['authToken']) {
        return verifyToken(request.cookies['authToken'], 'YourSecretKeyHere');
    }
    return null;
  }
}

declare global{
    namespace Express{
        interface Request{
            user?:Authpayload
        }
    }
}

export interface Authpayload {
    userId: string;
    email: string;
    fullName: string;
    phoneNumber: string;
    type: 'consumer' | 'kaamgar';
}