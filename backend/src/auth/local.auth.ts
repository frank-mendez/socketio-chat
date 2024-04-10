import {PassportStrategy} from "@nestjs/passport";
import {AuthService} from "./auth.service";
import {ForbiddenException, Injectable} from "@nestjs/common";
import {AuthDto} from "./dto/auth.dto";
import { Strategy } from 'passport-local'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
        username: 'username',
        password: 'password'
    });
  }

  async validate(username: string, password: string): Promise<any> {
      const validatePayload = new AuthDto();
      validatePayload.username = username;
      validatePayload.password = password;
    const user = await this.authService.validateUser(validatePayload);
    if (!user) {
      throw new ForbiddenException('Invalid credentials');
    }
    return user;
  }
}