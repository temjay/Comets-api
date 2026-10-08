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
  const authorization = request.header.authorization

  if(!authorization)
  {
    return undefined
  }

  const [type, token] = authorization.split(' ')

  if(type !== "Bearer" || !token)
  {
    return undefined
  }

  return token
}

function verifyToken(token: any) {
  throw new Error('Function not implemented.');
}

