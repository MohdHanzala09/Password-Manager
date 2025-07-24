import { useState, useEffect } from 'react'
import Table from './Table'
import Navbar from './Navbar'
import { useNavigate } from 'react-router-dom'
import Footer from './Footer'
const Body = () => {
    const navigate = useNavigate()
    // const [getData, setgetData] = useState(false)
    const [form, setform] = useState({
        URL: '',
        userName: '',
        password: ''
    })
    
    useEffect(() => {
       async function checkAuth() {
            const auth = await fetch('http://localhost:3000/checkAuth', {
                method: 'GET',
                credentials: 'include'
            })
            const data = await auth.json()
            if (!data.success) {
                navigate('/login')
            }
        }
        checkAuth();
    }, [])

    const handleChange = (e) => {
        setform({
            ...form,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log('Form submitted')
        const createPassMnager = await fetch('http://localhost:3000/createPass', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(form)
        })
    }
    return (
        <>
            <Navbar/>
            <div className='bg-slate-900 h-[88vh] w-[100vw]'>
                <div className='font-bold text-3xl text-white text-center ml-2'>&lt;Pass <span className='text-blue-800'>OP</span>&gt;</div>
                <div className='flex flex-col items-center justify-center'>
                    <form onSubmit={handleSubmit}>
                        <div className='mt-10'>
                            <input name='URL' placeholder='URL' value={form.URL} onChange={handleChange} type="text" className='w-4xl p-2 outline-none bg-amber-50 rounded-full ' />
                        </div>
                        <div className='mt-3 flex gap-8'>
                            <input type="text" placeholder='userName' value={form.userName} onChange={handleChange} name='userName' className='w-xl p-2 bg-amber-50 rounded-full ' />
                            <input name='password' placeholder='password' value={form.password} onChange={handleChange} type="password" className='w-2xs p-2 bg-amber-50 rounded-full ' />
                        </div>
                        <div className='mt-3 flex gap-8 mx-auto items-center justify-center'>
                            <input type="submit" value="Submit" className="text-white mr-3 w-4xl bg-blue-900 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg px-5 py-2.5 me-2 mb-2 dark:bg-blue-900 dark:hover:bg-blue-900 focus:outline-none"/>
                        </div>
                    </form>
                </div>
                <Table />
            </div>
            <div className='w-full bg-white h-0.5 opacity-10'></div>
            <Footer />
        </>
    )
}

export default Body
