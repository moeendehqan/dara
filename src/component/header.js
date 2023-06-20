import { ImExit } from "react-icons/im";
import { getCookie, setCookie } from "../Function/cookie";
import { useNavigate,useParams } from "react-router-dom";
import { IoHome } from "react-icons/io5";
import { useState } from "react";
import axios from "axios";
import { OnRun } from "../config/OnRun";
import { useEffect } from "react";

const Header = () =>{
    const [CompanyName, setCompanyName] = useState('')
    const cookie = getCookie('phn')
    const symbol = useParams()
    

    const NameCompany = () =>{
      axios({method:'POST', url: OnRun+'/dara/getsheet', data:{cookie: cookie, symbol:symbol}
    }).then(response =>{
      if (response.data.replay){
        setCompanyName(response.data.sheet.company)
      }
    })
    }

    useEffect(NameCompany,[])

    const navigate = useNavigate()

    const exit = ()=>{
        setCookie('phn', '',0)
        navigate('/')
    }

    return(
      <header>
        <span onClick={exit}>
            <ImExit/>
        </span>
        <span onClick={()=>{navigate('/company')}}>
            <IoHome/>
        </span>
        <p>
          {
            CompanyName
          }
        </p>
        <img src={process.env.PUBLIC_URL+'/img/'+symbol['symbol']+'.png'}></img>


      </header>
    )
}
export default Header