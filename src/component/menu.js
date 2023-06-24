
import { useNavigate } from "react-router-dom"
import { GiTrade } from "react-icons/gi";
import { FaSheetPlastic, FaPeopleGroup } from "react-icons/fa6";

const Menu = () =>{

    const navigate = useNavigate()

    return(
        <div className="menu">
            
                <div className="items" onClick={()=>{navigate('trades')}}> 
                <p>معاملات</p>
                <span><GiTrade/></span> 
                </div>
                <div className="items" onClick={()=>{navigate('sheet')}}> 
                <p>برگ سهم</p>
                <span><FaSheetPlastic/></span> 
                </div>
                <div className="items" onClick={()=>{navigate('assembly')}}> 
                <p>مجامع</p>
                <span><FaPeopleGroup/></span> 
                </div>
           
        </div>
    )
}
export default Menu