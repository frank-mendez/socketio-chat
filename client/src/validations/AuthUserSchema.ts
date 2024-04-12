import * as yup from "yup"
import {GenderEnum} from "../enums/gender.enum.ts";

export const AuthUserSchema = yup.object().shape({
    username: yup.string().required('Username is required').min(8, 'Username must be at least 8 characters'),
    password: yup.string().required('Password is required').min(8, 'Password must be at least 8 characters'),
    confirmPassword: yup.string().equals([yup.ref('password'), null], 'Passwords must match'),
    fullName: yup.string().required('Full Name is required').min(8, 'Full Name must be at least 8 characters'),
    gender: yup.string().oneOf([GenderEnum.FEMALE, GenderEnum.MALE]).required('gender is required')
})

export const LoginSchema = yup.object().shape({
    username: yup.string().required('Username is required').min(8, 'Username must be at least 8 characters'),
    password: yup.string().required('Password is required').min(8, 'Password must be at least 8 characters')
})
