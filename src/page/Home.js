import axios from 'axios'
import {useEffect, useState} from 'react'
import { setCookie, getCookie } from '../Function/cookie'
import { OnRun } from '../config/OnRun'
import { useNavigate  } from 'react-router-dom'

const Home = () =>{
    const [CaptchaCode, setCaptchaCode] = useState(null)
    const [Code, setCode] = useState('')
    const [CaptchaImg, setCaptchaImg] = useState(null)
    const [UserInput, setUserInput] = useState({'phone':'','captcha':'','code':'','nationalCode':''})
    const [errMsg, setErrMsg] = useState('')
    const [status,setStatus] = useState('getNationalcode')

    const Navigate = useNavigate()

    const CheckCookie = () =>{
        var cookie = getCookie('phn')
        if (cookie){
        axios({method:'POST', url:OnRun+'/dara/checkcookie', data:{cookie:cookie}
    }).then(response=>{
        if (response.data.replay){
            Navigate('/company')
        }
    })
}
    }

    const getCaptcha = () =>{
        axios({method:'POST',url:OnRun+'/captcha'
        }).then(response=>{
            setCaptchaCode(response.data.captcha)
            setCaptchaImg(response.data.img)
        })
    }

    const applyNationalCode = () =>{
        if(UserInput.captcha.length==0){
            setErrMsg('کد تصویر صحیح نیست')
        }else if(UserInput.nationalCode.length!=10){
            setErrMsg('مقدار کد ملی را به صورت صحیح وارد کنید')
        }else{
            axios({method:'POST',url:OnRun+'/dara/applynationalcode',data:{UserInput:UserInput,captchaCode:CaptchaCode}
            }).then(response=>{
                if(response.data.replay){
                    if (response.data.status=='NotFund') {
                        setErrMsg('متاسفانه کد ملی وارد شده یافت نشد')
                    }else if(response.data.status=='RegisterDara'){
                        Navigate('register', {state:{nationalCode:UserInput['nationalCode']}})
                    }
                    else {
                        setStatus(response.data.status)
                    }

                }else{
                    setErrMsg(response.data.msg)
                }
            })
        }
    }
    const applyCode = () =>{
        axios({method:'POST',url:OnRun+'/dara/applycode',data:{UserInput:UserInput}
        }).then(response=>{
            if(response.data.replay){
                setCookie('id',response.data.id,1)
                Navigate('/Authentication')
            }else{
                setErrMsg(response.data.msg)
            }
        })
    }

    const handleCode =()=>{
        if (Code.length != 5){
            setErrMsg('کد صحیح نیست')

        }
        else{
            axios({method:'POST', url: OnRun + '/dara/coderegistered',
             data:{nationalCode:UserInput['nationalCode'],Code:Code}
            }).then(response=>{
                if(response.data.replay){
                    setCookie('phn', response.data.cookie, 1)
                    Navigate('/company')

                }
                else{
                    setErrMsg(response.data.msg)
                }
            })
        }
    }


    const AccessCheck = () =>{
        const id = getCookie('id')
        if(id){axios({method:'POST',url:OnRun+'/dara/access',data:{id:id}
            }).then(response=>{
                if(response.data.replay){
                    Navigate('/Authentication')
                }
            })
        }
    }


    useEffect(getCaptcha,[])
    useEffect(AccessCheck,[])
    useEffect(CheckCookie,[])
    return(
        <div className='homePage'>
            <div className='login'>
                {  
                    status==='getNationalcode'?
                    <>
                        <input value={UserInput.nationalCode} onChange={(e)=>setUserInput({...UserInput,nationalCode:e.target.value})} placeholder='شماره/شناسه ملی' type='number'/>
                        <input value={UserInput.captcha} onChange={(e)=>setUserInput({...UserInput,captcha:e.target.value})} placeholder='کد تصویر' type='text'/>
                        <div className="captcha">
                            {CaptchaImg==null?null:<img onClick={getCaptcha} src={`data:image/png;base64,${CaptchaImg}`}></img>}
                        </div>
                        <button className='ent' onClick={applyNationalCode}>تایید</button>
                    </>:status==='Registered'?
                    <>
                       <h6>
                            لطفا کد تایید را وارد کنید
                        </h6>
                        <input value={Code} onChange={(e)=>{setCode(e.target.value)}} />
                        <button className='ent' onClick={handleCode}>ورود</button>
                    </>:
                    <>
                    </>
                }
                {errMsg.length==0?null:<p onClick={()=>setErrMsg('')} className='errMsg'>{errMsg}</p>}

            </div>
            <div className="brds">

            </div>
        </div>
    )
}


export default Home