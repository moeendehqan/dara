import { useLocation } from "react-router-dom"
import axios from "axios";
import { OnRun } from "../../config/OnRun";
import { useEffect } from "react";

const Register = () =>{
    const { state } = useLocation();

    const question = () =>{
        axios({method:'POST', url:OnRun+'/dara/questionauth',data:{nationalCode:state['nationalCode']}
        }).then(response=>{
            console.log(response.data)
        })
    }

    useEffect(question,[])
    return(
        <div>
            Re
        </div>
    )
}

export default Register