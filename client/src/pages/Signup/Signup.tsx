import GenderCheckbox from "./GenderCheckbox.tsx";
import {Link} from "react-router-dom";
import {useState} from "react";
import {GenderEnum} from "../../enums/gender.enum.ts";
import {useSignupMutation} from "../../api";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {UserSignupType} from "../../types";
import {AuthUserSchema} from "../../validations";
import {useAuthContext} from "../../context/AuthContext.tsx";

const Signup = () => {
    const [error, setError] = useState<boolean>(false)
    const context = useAuthContext();
    const setAuthUser = context ? context.setAuthUser : () => {
    };
    const {mutateAsync: signUp, isPending} = useSignupMutation({
        onSuccess: (data) => {
            setAuthUser(data)
            setError(false)
        },
        onError: () => {
            setError(true)
        }
    })

    const {register, handleSubmit, formState: {errors}} = useForm<UserSignupType>({
        defaultValues: {
            username: '',
            password: '',
            confirmPassword: '',
            fullName: '',
            gender: GenderEnum.MALE
        },
        resolver: yupResolver(AuthUserSchema) as any
    })

    const handleSubmitSignup = handleSubmit(async (data) => {
        await signUp(data)
    })


    return (
        <div className={`flex flex-col items-center justify-center min-w-96 mx-auto ${isPending ? 'skeleton' : ''}`}>
            <div
                className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
                <h1 className='text-3xl font-semibold text-center text-gray-300'>
                    Sign Up <span className='text-blue-500'> ChatApp</span>
                </h1>
                {error && (<div role="alert" className="alert alert-error my-5">
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none"
                         viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    <span>Error! Username already exists.</span>
                </div>)}
                <form onSubmit={handleSubmitSignup}>
                    <div>
                        <label className='label p-2'>
                            <span className='text-base label-text'>Full Name</span>
                        </label>
                        <input
                            type='text'
                            placeholder='Type full name...'
                            {...register('fullName')}
                            className={`w-full input input-bordered h-10 ${errors.fullName ? 'input-error' : ''}`}/>
                        {errors.fullName && <p className='text-error'>{errors.fullName.message}</p>}
                    </div>

                    <div>
                        <label className='label p-2 '>
                            <span className='text-base label-text'>Username</span>
                        </label>
                        <input
                            type='text'
                            placeholder='Type username...'
                            {...register('username')}
                            className={`w-full input input-bordered h-10 ${errors.username ? 'input-error' : ''}`}/>
                        {errors.username && <p className='text-error'>{errors.username.message}</p>}
                    </div>

                    <div>
                        <label className='label'>
                            <span className='text-base label-text'>Password</span>
                        </label>
                        <input
                            type='password'
                            placeholder='Enter Password'
                            className={`w-full input input-bordered h-10 ${errors.password ? 'input-error' : ''}`}
                            {...register('password')}
                        />
                        {errors.password && <p className='text-error'>{errors.password.message}</p>}
                    </div>

                    <div>
                        <label className='label'>
                            <span className='text-base label-text'>Confirm Password</span>
                        </label>
                        <input
                            type='password'
                            placeholder='Confirm Password'
                            className={`w-full input input-bordered h-10 ${errors.confirmPassword ? 'input-error' : ''}`}
                            {...register('confirmPassword')}
                        />
                        {errors.confirmPassword && <p className='text-error'>{errors.confirmPassword.message}</p>}
                    </div>

                    <GenderCheckbox register={register}/>

                    <Link className='text-sm hover:underline hover:text-blue-600 mt-2 inline-block' to='/login'>
                        Already have an account?
                    </Link>

                    <div>
                        <button disabled={isPending} type='submit'
                                className='btn btn-block btn-sm mt-2 border border-slate-700'>Sign Up
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Signup;