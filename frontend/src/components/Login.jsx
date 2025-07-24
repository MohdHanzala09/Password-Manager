import {useState} from 'react'
import { useNavigate,Link } from 'react-router-dom'
import {useGoogleLogin } from "@react-oauth/google"
const Login = () => {
    const responseGoolge = async (authresult) => {
        try {
            console.log(authresult)
            if(authresult['code']) {
            const idToken = credentialResponse.credential;
            const googleLogin = await fetch('http://localhost:3000/googleLogin', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ token: idToken })
        });           
    }
        } catch (error) {
            console.log("error while requesting on google :" , error);
        }
    }
    const GoogleLogin = useGoogleLogin({
        onSuccess: responseGoolge, 
        onError:responseGoolge, 
        flow: 'auth-code',
    })
    const [login, setlogin] = useState({
        email: '',
        password: ''
    })
    const navigate = useNavigate();
    const handleChange = (e) => {
        setlogin({
            ...login,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Form submitted');
        const loginUser = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include', // Include cookies in the request
            body: JSON.stringify(login)
        });
        const loginData = await loginUser.json();
        if (loginData.success) {
            alert('Login successful');
            navigate('/'); // Redirect to dashboard or home page
        } else {
            alert('Login failed, please check your credentials');
        }
    }
    return (
        <div>
            <section className="bg-gray-50 dark:bg-gray-900">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                        <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo"></img>
                            &lt;Pass OP&gt;
                    </a>
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Sign in to your account
                            </h1>
                            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                                <div>
                                    <input value={login.email} onChange={handleChange} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Email@company.com" required="" />
                                </div>
                                <div>
                                    <input type="password" value={login.password} onChange={handleChange} name="password" id="password" placeholder="Password" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-start">
                                        <div className="flex items-center h-5">
                                            <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="" />
                                        </div>
                                        <div className="ml-3 text-sm">
                                            <label className="text-gray-500 dark:text-gray-300">Remember me</label>
                                        </div>
                                    </div>
                                    <a className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
                                </div>
                                <button type="submit" className="text-white mr-3 w-96 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none">Signin</button>
                                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                    Don’t have an account yet?<Link className="font-medium text-primary-600 hover:underline dark:text-primary-500" to={'/signup'}>Signup</Link>
                                </p>
                            </form>
                            <div className='bg-blue-500 rounded-2xl cursor-pointer p-3 font-bold text-white text-center'>
                                <button onClick={GoogleLogin}>
                                Login with google
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Login
