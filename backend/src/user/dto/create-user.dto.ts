import {IsEnum, IsNotEmpty, IsString, IsStrongPassword} from "class-validator";
import {GenderEnum} from "../../enums/gender.enum";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    @IsNotEmpty()
    @IsStrongPassword()
    password: string;

    @IsString()
    @IsNotEmpty()
    fullName: string;

    @IsString()
    @IsNotEmpty()
    @IsEnum(GenderEnum, {message: 'Invalid Gender'})
    gender: GenderEnum;

    @IsString()
    @IsNotEmpty()
    profilePicture: string;
}