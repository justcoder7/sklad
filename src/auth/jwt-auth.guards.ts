import { JwtService } from "@nestjs/jwt";

import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import {Observable} from "rxjs"

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(private jwtservice : JwtService) {

    }
    canActivate(context: ExecutionContext,): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest();
        try {
            const authHeader = req.headers.authorization;
            const bearer = authHeader.split(" ")[0];
            const token = authHeader.split(" ")[1];
            if(!token  || bearer !== 'Bearer') {
                throw new UnauthorizedException({message: "Unautothorizated User"})
            }
            else {
                const user = this.jwtservice.verify(token);
                req.user = user;
                return true;
            }
        } catch (error) {
            throw new UnauthorizedException({message: "Unautothorizated User"})
        }
    }
}
