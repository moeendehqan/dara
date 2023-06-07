import { useNavigate } from "react-router-dom"

const Menu = () =>{
    const navigate = useNavigate()

    return(
        <div className="menu">
            
                <p onClick={()=>{navigate('dashboard')}}> داشبورد </p>
                <p onClick={()=>{navigate('assembly')}}> مجامع </p>
           
        </div>
    )
}
export default Menu