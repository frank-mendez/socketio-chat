import {Link} from "react-router-dom";
import {LoginUserType} from "../../types";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {LoginSchema} from "../../validations";
import {useState} from "react";
import {useLoginMutation} from "../../api";
import {useAuthContext} from "../../context/AuthContext.tsx";

const Login = () => {
    const [error, setError] = useState<boolean>(false)
    const [errorText, setErrorText] = useState<string>('')
    const {setAuthUser} = useAuthContext()
    const {mutateAsync: login} = useLoginMutation({
        onSuccess: (data) => {
            setAuthUser(data)
            setError(false)
        },
        onError: (error: any) => {
            setError(true)
            setErrorText(error.response.data.message)
        }
    })
    const {register, handleSubmit, formState: {errors}} = useForm<LoginUserType>({
        defaultValues: {
            username: '',
            password: ''
        },
        resolver: yupResolver(LoginSchema)
    })

    const handleSubmitSignup = handleSubmit(async (data) => {
        await login(data)
    })

    return (
        <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
            <div
                className='w-full
                p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
                <h1 className='text-3xl font-semi-bold text-center text-gray-300'>
                    Login
                    <span className='text-blue-500'> Chat App</span>
                </h1>
                {error && (<div role="alert" className="alert alert-error my-5">
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none"
                         viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    <span>Error! {errorText}</span>
                </div>)}
                <form onSubmit={handleSubmitSignup} className='mt-6 space-y-6'>
                    <div>
                        <label className='label p-2'>
                            <span className='text-base label-text'>Username</span>
                        </label>
                        <input
                            type='text'
                            className={`w-full input input-bordered h-10 ${errors.username ? 'input-error' : ''}`}
                            placeholder='Enter your username'
                            {...register('username')}
                        />
                        {errors.username && <p className='text-error'>{errors.username.message}</p>}
                    </div>
                    <div>
                        <label className='label p-2'>
                            <span className='text-base label-text'>Password</span>
                        </label>
                        <input
                            type='password'
                            className={`w-full input input-bordered h-10 ${errors.password ? 'input-error' : ''}`}
                            placeholder='Password'
                            {...register('password')}
                        />
                        {errors.password && <p className='text-error'>{errors.password.message}</p>}
                    </div>
                    <Link to='/signup' className='text-sm  hover:underline hover:text-blue-600 mt-2 inline-block'>
                        {"Don't"} have an account?
                    </Link>
                    <div>
                        <button type='submit' className='btn btn-block btn-sm mt-2'>
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;