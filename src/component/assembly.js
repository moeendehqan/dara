import {useNavigate , useParams} from "react-router-dom"
import { getCookie, setCookie } from "../Function/cookie"
import axios from "axios"
import { OnRun } from "../config/OnRun"
import { useEffect , useContext, useState } from "react"
import { ToastContainer, toast } from 'react-toastify';


const Assembly = () =>{

    const symbol = useParams()
    const cookie = getCookie('phn')
    const [assemblyDic , setAssemblyDict] = useState(null)
    console.log(assemblyDic)
    const navigate = useNavigate()


    const checkcookie = () => {
        if (cookie){
            axios({method:'POST', url: OnRun + '/dara/checkcookie', data:{cookie:cookie}
        }).then(response =>{
            if(response.data.replay){}
            else{setCookie('phn', '', 0)}
        })        }
        else{navigate('/')}
    }



    const getDf = () =>{
        axios.post(OnRun+'/dara/getassembly',{cookie:cookie, symbol:symbol})
            .then(response=>{
                console.log(response.data)
                setAssemblyDict(response.data.assembly)
            })

    }

    useEffect(checkcookie, [])
    useEffect(getDf, [])

    return(
        <div>
            {
                assemblyDic==null?null:
                <div className="sub">
                    <p>مجمع در تاریخ {assemblyDic.date_jalali} در آدرس {assemblyDic.address} راس ساعت {assemblyDic.time} برگذار خواهد شد</p>
                    <p>موضوع جلسه:
                        {assemblyDic.agenda}
                    </p>
                    <p>توضیحات:
                        {assemblyDic.description}
                    </p>
                </div>
            }
        </div>
    )
}
export default Assembly