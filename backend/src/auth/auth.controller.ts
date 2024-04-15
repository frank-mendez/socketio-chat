import {Controller, Get, Post, UseGuards, Request, Param} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {AuthGuard} from "@nestjs/passport";
import {AuthGuard as JwtAuthGuard} from './auth.guard'
import {AuthUserType} from "../types";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {
    }


    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(@Request() req: any): Promise<AuthUserType> {
        return this.authService.login(req.user);
    }

    @Post('signup')
    async signup(@Request() req: any): Promise<AuthUserType> {
        return this.authService.signup(req.body);
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    async profile(@Request() req) {
        return req.user
    }
}
