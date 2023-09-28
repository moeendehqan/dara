
import { useNavigate } from "react-router-dom"
import { TbArrowsExchange2 ,TbAlignBoxRightTop} from "react-icons/tb";

const Menu = () =>{

    const navigate = useNavigate()

    return(
        <div className="menu">
            
                <div className="items" onClick={()=>{navigate('trades')}}> 
                    <p>معاملات</p>
                    <span><TbArrowsExchange2/></span> 
                </div>
                <div className="items" onClick={()=>{navigate('sheet')}}> 
                    <p>برگ سهم</p>
                    <span><TbAlignBoxRightTop/></span> 
                </div>
                {/*<div className="items" onClick={()=>{navigate('assembly')}}> 
                    <p>مجامع</p>
                    <span><GiTrade/></span> 
                </div>*/}
           
        </div>
    )
}
export default Menu