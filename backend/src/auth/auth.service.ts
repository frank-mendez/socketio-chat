import {ForbiddenException, Injectable} from '@nestjs/common';
import {AuthDto} from "./dto/auth.dto";
import {UserEntity} from "../db/entities/user.entity";
import {UserService} from "../user/user.service";
import * as bcrypt from 'bcryptjs'
import {JwtService} from "@nestjs/jwt";
import {SignUpDto} from "./dto/signup.dto";
import {GenderEnum} from "../enums/gender.enum";
import {jwtDecode} from "jwt-decode";

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
        const payload = { username: user.username, fullName: user.fullName, id: user.id };
        return {
            access_token: this.jwtService.sign(payload),
            ...payload
        }
    }

    async profile(id: number): Promise<UserEntity> {
        return await this.userService.findById(id);
    }

    async signup(signupDto: SignUpDto): Promise<any> {
        try{
            const { username, password, fullName, gender, confirmPassword } = signupDto;
            if(password !== confirmPassword) {
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

            return {
                access_token: this.jwtService.sign({ username: createdUser.username, fullName: createdUser.fullName }),
                ...createdUser
            }
        } catch (error:any) {
            console.log('error', error)
            throw new ForbiddenException(error.message)
        }
    }

    decodeToken(token: string): any {
        return jwtDecode(token)
    }

}