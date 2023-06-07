import { ImExit } from "react-icons/im";
import { setCookie } from "../Function/cookie";
import {useNavigate } from "react-router-dom";



const Header = () =>{

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

      </header>
    )
}
export default Header