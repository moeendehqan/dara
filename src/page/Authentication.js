import { useEffect, useState } from "react"
import { useNavigate  } from 'react-router-dom'
import { OnRun } from '../config/OnRun'
import { setCookie, getCookie } from '../Function/cookie'
import axios from "axios"


const Authentication = () =>{
    const [auth, setAuth] = useState('pending')
    const Navigate = useNavigate()
    const id = getCookie('id')


    const AuthenticationSession = () =>{
        axios({method:'POST',url:OnRun+'/dara/authenticationsession',data:{id:id}
        }).then(response=>{
            console.log(response.data)
            if(response.data.replay){
                setAuth(response.data.auth)
            }else{
                setCookie('id','',0)
                Navigate('/')
            }
        })


    }


    const AccessCheck = () =>{

        if(id){
            axios({method:'POST',url:OnRun+'/dara/access',data:{id:id}
            }).then(response=>{
                console.log(response.data)
                if(response.data.replay){
                    AuthenticationSession()
                }else{
                    setCookie('id','',0)
                    Navigate('/')
                }
            })
        }else{Navigate('/')}
    }

    useEffect(AccessCheck,[])

    return(
        <div className="Authentication">
            {
                auth=='pending'?
                <p>درحال بررسی</p>:
                auth=='rejected'?
                <p>متاسفانه امکان احراز هویت برای شما امکان پذیر نیست</p>:
                auth=='check'?
                <p>بررسی</p>:
                <p>تایید شد</p>

            }
        </div>
    )
}


export default Authentication