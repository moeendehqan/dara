import {useNavigate , useParams} from "react-router-dom"
import { getCookie, setCookie } from "../Function/cookie"
import axios from "axios"
import { OnRun } from "../config/OnRun"
import { useEffect , useContext } from "react"

const Trades = () =>{
    const symbol = useParams()
    console.log(symbol)

   

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
        axios.post(OnRun + '/dara/gettrade', {cookie:cookie, symbol:symbol
        }).then(response =>{
            if (response.data.replay){

                console.log(response.data.replay)
            }
            else{

            }
        })
    }
    useEffect(checkcookie, [])
    useEffect(getTrades, [])

    return(
        <div>
            ddd
        </div>
    )
}
export default Trades