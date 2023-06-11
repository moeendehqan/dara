import axios from "axios"
import { OnRun } from "../config/OnRun"
import { getCookie } from "../Function/cookie"
import { useNavigate } from "react-router-dom"
import { setCookie } from "../Function/cookie"
import { useEffect } from "react"


const Company = ()=>{

    const navigate = useNavigate()

    const cookie = getCookie('phn')
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

    const getCompany = () =>{
        axios.post(OnRun+'/dara/getcompany', {cookie:cookie}).then()
    }

    useEffect(getCompany, [])

    return(
        <div>
            
        </div>
    )
}
export default Company