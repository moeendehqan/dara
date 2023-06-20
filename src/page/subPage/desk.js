import Menu from "../../component/menu"
import { useEffect } from "react"
import { setCookie } from "../../Function/cookie"
import Header from "../../component/header"
import { getCookie } from "../../Function/cookie"
import { Outlet, useNavigate, useParams } from "react-router-dom"
import axios from "axios"
import { OnRun } from "../../config/OnRun"


const Desk = () =>{

    const cookie = getCookie('phn')
    const navigate = useNavigate()
    const CheckCookie = () =>{
        if (cookie){
        axios({method:'POST', url:OnRun+'/dara/checkcookie', data:{cookie:cookie}
    }).then(response=>{
        if (response.data.replay){

        }
        else{
            setCookie('phn', '', 0)
            navigate('/')
        }
    })
}
        else{
            navigate('/')
        }
    }
    useEffect(CheckCookie, [])

    return(
        <div className="desk">
            <Header/>
            <div className="container">
                <Menu />
                <Outlet />
            </div>
        </div>
    )

}
export default Desk