import {Controller, Get, Request, UseGuards} from '@nestjs/common';
import {UserService} from "./user.service";
import {AuthGuard} from "../auth/auth.guard";

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {
    }

    @UseGuards(AuthGuard)
    @Get('/')
    async getUsers(@Request() req)  {
        return await this.userService.getUsers(req.user.id);
    }
}
