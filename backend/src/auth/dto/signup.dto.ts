import {IsEnum, IsNotEmpty, IsString, IsStrongPassword, ValidationOptions, registerDecorator, ValidationArguments} from "class-validator";
import {GenderEnum} from "../../enums/gender.enum";

export function IsEqual(property: string, validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: 'isEqual',
            target: object.constructor,
            propertyName: propertyName,
            constraints: [property],
            options: validationOptions,
            validator: {
                validate(value: any, args: ValidationArguments) {
                    const relatedValue = (args.object as any)[property];
                    return value === relatedValue;
                },
                defaultMessage(args: ValidationArguments) {
                    const relatedPropertyName = args.constraints[0];
                    return `${propertyName} must equal ${relatedPropertyName}`;
                }
            }
        });
    };
}

export class SignUpDto {
    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    @IsNotEmpty()
    @IsStrongPassword()
    password: string;

    @IsString()
    @IsNotEmpty()
    @IsStrongPassword()
    @IsEqual('password', {message: 'Passwords do not match'})
    confirmPassword: string;

    @IsString()
    @IsNotEmpty()
    fullName: string;

    @IsNotEmpty()
    @IsEnum(GenderEnum, {message: 'Invalid Gender'})
    gender: GenderEnum;
}