import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
   canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {

      /*
        By default, AuthGuardLocal uses the username field to get the user identifier, the code below takes the email field from the body 
        and overwrites the usename field of the context to allow using the email field in the request body as an identifier.
      */
      if (!(context as any).args[0].body.username && (context as any).args[0].body.email)
         (context as any).args[0].body.username = (context as any).args[0].body.email

      return super.canActivate(context) 
   }
}

