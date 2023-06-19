import { useState } from "react"
import { useNavigate } from "react-router-dom"

const Menu = () =>{

    const navigate = useNavigate()

    return(
        <div className="menu">
            
                <p onClick={()=>{navigate('trades')}}> معاملات </p>
                <p onClick={()=>{navigate('sheet')}}> برگ سهم </p>
                <p onClick={()=>{navigate('assembly')}}> مجامع </p>
           
        </div>
    )
}
export default Menu