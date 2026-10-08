import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate( context: ExecutionContext, ): boolean | Promise<boolean> | Observable<boolean>
  { 
    const request = context.switchToHttp().getRequest();

    const token = extractTokenFromHeader(request);

    if(!token)
    {
      throw new unauthorizedException();
    }

    const payload = verifyToken(token);

    request.user = payload;

    return true;
  }
}
