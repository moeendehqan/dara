import { useLocation } from "react-router-dom"
import axios from "axios";
import { OnRun } from "../../config/OnRun";
import { useEffect, useState } from "react";
import { setCookie, getCookie } from "../../Function/cookie";
import { useNavigate } from "react-router-dom";

const Register = () =>{
    const { state } = useLocation();
    const [question, setQuestion] = useState(null);
    const [nameQuestion, setNameQuestion] = useState('family');
    const navigate = useNavigate()
    const [phone, setPhone] = useState('')
    const [code, setCode] = useState('')
    const [answer, setAnswer] = useState({'family':''})
    const QuestionArray = ['family', 'boursiCode', 'fromm', 'serial', 'fatherName']
    const QuestionTexArray = ['نام خانوادگی خود را انتخاب کنید',
                                'کد بورسی خود را انتخاب کنید', 
                                'محل صدور/ثبت خود را انتخاب کنید',
                                'سریال شناسنامه خود را انتخاب کنید',
                                'نام پدر خود را انتخاب کنید']


    const getquestion = () =>{
        axios({method:'POST', url:OnRun+'/dara/questionauth',data:{nationalCode:state['nationalCode']}
        }).then(response=>{
            setQuestion(response.data.qustion)
        })
    }


    const handleAnswer = (current,inp) =>{
        setAnswer({...answer,[current]:inp})

    }


    const ApplyAnswer =()=>{
        axios({method: 'POST', url: OnRun+'/dara/answerauth', data: {answer:answer,nationalcod:state['nationalCode']}
        }).then(response=>{
            if(response.data.reply){
                setNameQuestion('getphone')
            }else{
                alert(response.data.msg)
            }
        })
    }

    const handleNext=(inp)=>{
        if (answer[nameQuestion]){
            setNameQuestion(inp)
        }else{
            alert('لطفا یک گزینه را انتخاب کنید')

        }
        
    }

    const handleCode = () =>{
        if(code.length != 5){
            alert('کد وارد شده صحیح نمی باشد')
        }
        else{
            axios({method: 'POST', url: OnRun+'/dara/coderegister', data:{code:code, phone:phone, nationalCode:state['nationalCode']}
        }).then(
            response=>{
                if(response.data.replay){
                    setCookie('phn', response.data.cookie, 1)
                    navigate('/desk')
            
                }
                else{
                    alert(response.data.msg)
                }
            }
        )
        }
    }

    const handleRegister = ()=>{
        if (phone.length != 11){
            alert('شماره موبایل خود را صحیح وارد کنید')
        }
        else{
        axios({method:'POST', url: OnRun+'/dara/register', data:{phone:phone}
    }).then(response=>{
        if (response.data.replay){
            setNameQuestion('CodePhone')
        }
    })
    }
}


    useEffect(getquestion,[])

    return(
        <div className="register">

            {
                question==null?null:
                Object.keys(QuestionArray).map(j=>{
                    var keyJ = parseInt(j)
                    
                    var privious = QuestionArray[keyJ-1]
                    var current = QuestionArray[j]
                    var next = QuestionArray[keyJ+1]

                    
                    return(
                        <>
                        {
                            current==nameQuestion?
                                <div className="QuestionBox" key={j}>
                                    <h2>{
                                        QuestionTexArray[j]
                                        }
                                    </h2>
                                    <div className="AnswerBox">
                                    {
                                        question[current].map(i=>{
                
                                            return(
                                                <button className={answer[current]==i?'selcted':'notSelect'} key={i} onClick={()=>handleAnswer(current,i)}>{i}</button>
                                                )
                                            })
                                        }
                                        </div>
                                        <div className="nextbutton">
                                        {
                                            privious?
                                            <button onClick={()=>setNameQuestion(privious)}> قبلی</button>
                                            :null
                                        }
                                         {
                                            next?
                                            <button onClick={()=>handleNext(next)}> بعدی</button>
                                            :<button onClick={ApplyAnswer}>ثبت</button>
                                        }
                                        </div>
                                    </div>
                                :null
                            }
                            </>
                    )    
                })
            }
            {
                nameQuestion == 'getphone'?
                <div className="QuestionBox">
                    <h2>
                        لطفا شماره موبایل خود را وارد کنید
                    </h2>
                    <input value={phone} onChange={(e)=>setPhone(e.target.value)}/>
                    <button onClick={handleRegister} >ثبت نام</button>
            

                </div>:null
            }

            {
                nameQuestion == 'CodePhone'?
                <div className="QuestionBox">
                    <h2> لطفا کد تایید ارسال شده را وارد کنید </h2>
                    <input value={code} onChange={(e)=>setCode(e.target.value)}/>
                    <button onClick={handleCode} >ثبت نام</button>
            

                </div>:null
            }
    
        </div>
    )
}

export default Register