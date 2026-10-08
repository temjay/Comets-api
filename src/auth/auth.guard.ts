import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate( context: ExecutionContext, ): boolean | Promise<boolean> | Observable<boolean>
  { 
    const request = context.switchToHttp().getRequest();

    const token = extractToken(request)

    if(!token)
    {
      throw new UnauthorizedException();
    }

    const payload = verifyToken(token);

    request.user = payload;

    return true;
  }
}


function extractToken(request: any): string | undefined {
  throw new Error('Function not implemented.');
}

function verifyToken(token: any) {
  throw new Error('Function not implemented.');
}

