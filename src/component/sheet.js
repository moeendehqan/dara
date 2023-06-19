import {useNavigate , useParams} from "react-router-dom"
import { getCookie, setCookie } from "../Function/cookie"
import axios from "axios"
import { OnRun } from "../config/OnRun"
import { useEffect , useContext, useState } from "react"

import { ToastContainer, toast } from 'react-toastify';

const Sheet = () =>{
    const symbol = useParams()
    const [sheetDic, setSheetDic] = useState(null)
    const cookie = getCookie('phn')
    const navigate = useNavigate()
    

    const checkcookie = () => {
        if (cookie){
            axios({method:'POST', url: OnRun + '/dara/checkcookie', data:{cookie:cookie}
        }).then(response =>{
            if(response.data.replay){


            }
            else{
                setCookie('phn', '', 0)
            }
        })
        }
        else{
            navigate('/')
        }
    }

    const getTrades = () =>{
        axios.post(OnRun + '/dara/getsheet', {cookie:cookie, symbol:symbol})
            .then(response =>{
                if (response.data.replay){
                    setSheetDic(response.data.sheet)
                }
                else{
                    toast.error(response.data.msg,{position: toast.POSITION.BOTTOM_RIGHT});
                    console.log(response.data)

                }
        })
    }
    useEffect(checkcookie, [])
    useEffect(getTrades, [])
    

    return(
        <div>
            <ToastContainer autoClose={3000} />
                {
                    sheetDic==null?null:
                    <p>
                        دارنده این ورقه سهم {sheetDic['fullName']} فرزند {sheetDic['نام پدر']} به کد ملی {sheetDic['کد ملی']} مالک تعداد  {sheetDic['سهام کل']} ، ({sheetDic['stockword']}) سهم یک هزار ریالی با نام از شرکت {sheetDic['company']} میباشد
                

                    </p>
                    

                    
                }



        </div>
    )
}
export default Sheet