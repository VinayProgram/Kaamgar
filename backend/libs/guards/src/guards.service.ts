import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Request } from 'express';
import { verifyToken } from 'libs/encryption';
import { IS_PUBLIC_KEY } from './gaurds.public.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Check for @Public() decorator
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) return true;

    // Handle both REST and GraphQL
    const request = this.getRequest(context);

    const token = this.getTokenFromCookie(request);
    if (token) {
      // console.log(token)  
      request.user = token; // verified payload
    } else {
      console.log('No valid token found in cookies');
      return false; // or throw UnauthorizedException()
    }

    return true;
  }

  /**
   * Get request object for REST or GraphQL
   */
  private getRequest(context: ExecutionContext): Request {
    if (context.getType() === 'http') {
      return context.switchToHttp().getRequest();
    } else if (context.getType()==='graphql' as string ) {
      const gqlCtx = GqlExecutionContext.create(context);
      return gqlCtx.getContext().req;
    }
    throw new Error(`Unsupported request type: ${context.getType()}`);
  }

  /**
   * Verify token from cookies
   */
  private getTokenFromCookie(request: Request): Authpayload | null {
    if (request.cookies?.consumerToken) {
      return verifyToken(request.cookies.consumerToken, 'hehehehe');
    } else if (request.cookies?.authToken) {
      return verifyToken(request.cookies.authToken, 'YourSecretKeyHere');
    }
    return null;
  }
}

declare global {
  namespace Express {
    interface Request {
      user?: Authpayload;
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
