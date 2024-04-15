import {ForbiddenException, Injectable} from '@nestjs/common';
import {AuthDto} from "./dto/auth.dto";
import {UserEntity} from "../db/entities/user.entity";
import {UserService} from "../user/user.service";
import * as bcrypt from 'bcryptjs'
import {JwtService} from "@nestjs/jwt";
import {SignUpDto} from "./dto/signup.dto";
import {GenderEnum} from "../enums/gender.enum";
import {AuthUserType} from "../types";

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) {
    }

    async validateUser(authDto: AuthDto): Promise<UserEntity> {
        const {username, password} = authDto;
        const user = await this.userService.findByUsername(username);
        if (user) {
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (isPasswordValid) {
                return user;
            } else {
                throw new ForbiddenException('Invalid credentials')
            }
        } else {
            throw new ForbiddenException('Invalid credentials')
        }
    }

    async login(user: UserEntity): Promise<AuthUserType> {
        const payload = {
            username: user.username,
            fullName: user.fullName,
            id: user.id,
            profilePicture: user.profilePicture
        };
        return {
            access_token: this.jwtService.sign(payload),
            ...payload
        }
    }

    async signup(signupDto: SignUpDto): Promise<AuthUserType> {
        try {
            const {username, password, fullName, gender, confirmPassword} = signupDto;
            if (password !== confirmPassword) {
                throw new ForbiddenException('Passwords do not match')
            }

            const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`
            const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`

            const createdUser = await this.userService.createUser({
                username,
                password: await bcrypt.hash(password, 10),
                fullName,
                gender,
                profilePicture: gender === GenderEnum.MALE ? boyProfilePic : girlProfilePic
            });


            const payload = {
                username: createdUser.username,
                fullName: createdUser.fullName,
                id: createdUser.id,
                profilePicture: createdUser.profilePicture
            };
            return {
                access_token: this.jwtService.sign(payload),
                ...payload
            }
        } catch (error: any) {
            console.log('error', error)
            throw new ForbiddenException(error.message)
        }
    }

}
