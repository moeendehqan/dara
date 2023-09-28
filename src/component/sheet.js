import {useNavigate , useParams} from "react-router-dom"
import { getCookie, setCookie } from "../Function/cookie"
import axios from "axios"
import { OnRun } from "../config/OnRun"
import { useEffect , useContext, useState } from "react"

import { ToastContainer, toast } from 'react-toastify';

const Sheet = () =>{
    const symbol = useParams()
    const [sheetDic, setSheetDic] = useState(null)
    const cookie = getCookie('phn')
    const navigate = useNavigate()
    

    const checkcookie = () => {
        if (cookie){
            axios({method:'POST', url: OnRun + '/dara/checkcookie', data:{cookie:cookie}
        }).then(response =>{
            if(response.data.replay){
            }
            else{
                setCookie('phn', '', 0)
            }
        })
        }
        else{
            navigate('/')
        }
    }

    const getSheetpng = () => {
        if (symbol['symbol']=='visa') {
            toast.warning('دریافت برگه سهام برای این سهم امکان پذیر نیست')
        }else{
            axios.post(OnRun + '/dara/getSheetpng', { cookie: cookie, symbol: symbol }, { responseType: 'arraybuffer' })
              .then(response => {
                const blob = new Blob([response.data], { type: 'image/png' });
                const url = window.URL.createObjectURL(blob);
          
                // ایجاد یک لینک برای دانلود تصویر
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'sheet1.png');
          
                // اضافه کردن لینک به صفحه و کلیک بر روی آن
                document.body.appendChild(link);
                link.click();
          
                // حذف لینک بعد از دانلود
                document.body.removeChild(link);
              })
              .catch(error => {
                console.error('Error fetching image:', error);
              });
        }
      };
    useEffect(checkcookie, [])

    return(
        <div className="sub">
            <div className="tools">
                <h1>
                    برگ سهم
                </h1>
                <div>
                    
                </div>
                
            </div>
            <ToastContainer autoClose={3000} />
            <button onClick={getSheetpng} className="BtnDownload">دریافت تصویر سهام</button>


        </div>
    )
}
export default Sheet