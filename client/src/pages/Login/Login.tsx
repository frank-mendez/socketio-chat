import {Link} from "react-router-dom";

const Login = () => {
    return (
        <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
            <div
                className='w-full
                p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
                <h1 className='text-3xl font-semi-bold text-center text-gray-300'>
                    Login
                    <span className='text-blue-500'> Chat App</span>
                </h1>
                <form className='mt-6 space-y-6'>
                    <div>
                        <label className='label p-2'>
                            <span className='text-base label-text'>Username</span>
                        </label>
                        <input type='text' className='w-full input input-bordered h-10'
                               placeholder='Enter your username'/>
                    </div>
                    <div>
                        <label className='label p-2'>
                            <span className='text-base label-text'>Password</span>
                        </label>
                        <input type='password' className='w-full input input-bordered h-10'
                               placeholder='Password'/>
                    </div>
                    <Link to='/signup' className='text-sm  hover:underline hover:text-blue-600 mt-2 inline-block'>
                        {"Don't"} have an account?
                    </Link>
                    <div>
                        <button className='btn btn-block btn-sm mt-2'>
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;