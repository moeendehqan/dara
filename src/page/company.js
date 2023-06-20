import axios from "axios"
import { OnRun } from "../config/OnRun"
import { getCookie } from "../Function/cookie"
import { useNavigate } from "react-router-dom"
import { setCookie } from "../Function/cookie"
import { useEffect, useState } from "react"
import { ImExit } from "react-icons/im"


const Company = ()=>{

    const navigate = useNavigate()
    const [datadf, setDatadf] = useState([])


    const cookie = getCookie('phn')
    const handleExit = ()=>{
        setCookie('phn', '', 0)
        navigate('/')

    }

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
        axios.post(OnRun+'/dara/getcompany', {cookie:cookie}).then(response=>{
            if (response.data.replay){
                setDatadf(response.data.df)
            }
        })
    }



    const handletoCompany = (symbol,volume)=>{
        if(volume>0){
           navigate('/'+symbol+'/desk', )
        }
    }

    useEffect(getCompany, [])

    return(
        <div className="company">
            <p onClick={handleExit}>
                <ImExit/>
            </p>
            <div className="listcompany">
                {
                    datadf.map((items)=>{
                        return(
                           
                           <div className={items['تعداد سهام']==0?'eachcompany ziro':'eachcompany'}
                            onClick={()=>handletoCompany(items.symbol,items['تعداد سهام'])}>
                                <div className="title">
                                    <img src={process.env.PUBLIC_URL+'/img/'+items.icon}></img>
                                    <div className="names">
                                        <p>{items.name}</p>
                                        <p>{items.fullname}</p>
                                    </div>
                                </div>
                                <h2>
                                     تعداد سهام شما:{items['تعداد سهام'].toLocaleString()}
                                </h2>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
export default Company