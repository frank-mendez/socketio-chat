import {ForbiddenException, Injectable} from '@nestjs/common';
import {AuthDto} from "./dto/auth.dto";
import {UserEntity} from "../db/entities/user.entity";
import {UserService} from "../user/user.service";
import * as bcrypt from 'bcryptjs'
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) {}

    async validateUser(authDto: AuthDto): Promise<UserEntity> {
        const { username, password } = authDto;
        const user = await this.userService.findByUsername(username);
        if(user) {
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if(isPasswordValid) {
                return user;
            } else {
                throw new ForbiddenException('Invalid credentials')
            }
        } else {
            throw new ForbiddenException('Invalid credentials')
        }
    }

    async login(user: UserEntity): Promise<{ access_token: string, username: string, fullName: string }>{
        const payload = { username: user.username, fullName: user.fullName };
        return {
            access_token: this.jwtService.sign(payload),
            ...payload
        }
    }
}
