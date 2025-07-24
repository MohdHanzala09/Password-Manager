import { useState, useEffect } from "react"

const Table = () => {
    // const [getData, setgetData] = useState(false)
    const [passData, setpassData] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3000/userData', {
                    method: 'GET',
                    credentials: 'include' // Include cookies in the request
                })
                if (response.ok) {
                    const data = await response.json()
                    console.log(data)
                    setpassData(Array.isArray(data.userData) ? data.userData : [data.userData])
                }
            } catch (error) {
                console.error('Error fetching data:', error)
            }
        }
        fetchData()
    }, [])

    return (
        <div>
            <div className="flex text-white justify-center mt-5">
                <div className="w-10 text-center border-1">s.no</div>
                <div className="w-xl text-center border-1">URL</div>
                <div className="w-xs text-center border-1">userName</div>
                <div className="w-3xs text-center border-1">password</div>
            </div>
            {passData.map((item, index) => (
                <div key={index} className="flex text-white justify-center h-auto">
                    <div className="w-10 text-center border-1">{index + 1}</div>
                    <div className="w-xl text-center border-1">{item.URL}</div>
                    <div className="w-xs text-center border-1">{item.userName}</div>
                    <div className="w-3xs text-center border-1">{item.password}</div>
                </div>
            ))}
        </div>
    )
}

export default Table
