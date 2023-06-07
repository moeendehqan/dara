import { useLocation } from "react-router-dom"
import axios from "axios";
import { OnRun } from "../../config/OnRun";
import { useEffect, useState } from "react";

const Register = () =>{
    const { state } = useLocation();
    const [question, setQuestion] =useState(null);
    const [nameQuestion, setNameQuestion] = useState('family');
    const [answer, setAnswer]= useState({'family':''})


    const getquestion = () =>{
        axios({method:'POST', url:OnRun+'/dara/questionauth',data:{nationalCode:state['nationalCode']}
        }).then(response=>{
            setQuestion(response.data.qustion)
        })
    }

    const handleAnswer = (qts,inp,forwardQuestion) =>{
        setAnswer({...answer,qts:inp})
        setNameQuestion(forwardQuestion)

    }

    useEffect(getquestion,[])

    return(
        <div>
            {
                nameQuestion =='family' && question!=null?
                <div>
                    <h2>نام خانوادگی خود را وارد کنید</h2>
                    <div>
                        {
                            question.family.map(i=>{
                                return(
                                    <button onClick={()=>handleAnswer('family',i,'boursiCode')}>{i}</button>
                                )
                            })
                        }
                    </div>
                </div>
                : null
            }
               {
                nameQuestion =='boursiCode' && question!=null?
                <div>
                    <h2>کد بورسی خود را انتخاب کنید </h2>
                    <div>
                        {
                            question.boursiCode.map(i=>{
                                return(
                                    <button onClick={()=>handleAnswer('boursiCode',i,'numId')}>{i}</button>
                                )
                            })
                        }
                    </div>
                </div>
                : null
            }

{
                nameQuestion =='numId' && question!=null?
                <div>
                    <h2>شماره شناسنامه/شماره ثبت خود را وارد کنید</h2>
                    <div>
                        {
                            question.numId.map(i=>{
                                return(
                                    <button onClick={()=>handleAnswer('numId',i,'fromm')}>{i}</button>
                                )
                            })
                        }
                    </div>
                </div>
                : null
            }
               {
                nameQuestion =='fromm' && question!=null?
                <div>
                    <h2>محل صدور/محل ثبت</h2>
                    <div>
                        {
                            question.fromm.map(i=>{
                                return(
                                    <button onClick={()=>handleAnswer('fromm',i,'serial')}>{i}</button>
                                )
                            })
                        }
                    </div>
                </div>
                : null
            }
            

        </div>
    )
}

export default Register