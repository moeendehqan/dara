import {useNavigate , useParams} from "react-router-dom"
import { getCookie, setCookie } from "../Function/cookie"
import axios from "axios"
import { OnRun } from "../config/OnRun"
import { useEffect , useContext, useState } from "react"
import {TabulatorFull as Tabulator} from 'tabulator-tables'
import { ToastContainer, toast } from 'react-toastify';

const Trades = () =>{
    const symbol = useParams()
    const [dfBourse, setDfbourse] = useState(null)
    const [dfNoBourse, setDfNoBourse] = useState(null)
    const cookie = getCookie('phn')
    const navigate = useNavigate()
    

    if(dfBourse!=null){
        var table = new Tabulator("#data-table", {
            data:dfBourse,
            layout:"fitColumns",
            responsiveLayout:true,
            columnHeaderSortMulti:true,
            pagination:"local",
            paginationSize:50,
            paginationSizeSelector:[10, 20, 50, 100, 200,500],
            movableColumns:true,
            layoutColumnsOnNewData:false,
            textDirection:"rtl",
            autoResize:false,
            dataTree:true,
            dataTreeStartExpanded:false,
            columns:[
                {title:"تاریخ", field:"date", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:4,headerFilter:"input"},
                {title:"تعداد خرید", field:"تعداد خرید", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:8,headerFilter:"input"},
                {title:"تعداد فروش", field:"تعداد فروش", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:8,headerFilter:"input"},
                {title:"قیمت خرید", field:"avgBuy", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:5,headerFilter:"input"},
                {title:"قیمت خرید", field:"avgBuy", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:5,headerFilter:"input"},
                {title:"مانده ", field:"سهام کل", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:4,headerFilter:"input"}
            ],
        })
    }

    if(dfNoBourse!=null){
        var table = new Tabulator("#data-table", {
            data:dfNoBourse,
            layout:"fitColumns",
            responsiveLayout:true,
            columnHeaderSortMulti:true,
            pagination:"local",
            paginationSize:50,
            paginationSizeSelector:[10, 20, 50, 100, 200,500],
            movableColumns:true,
            layoutColumnsOnNewData:false,
            textDirection:"rtl",
            autoResize:false,
            dataTree:true,
            dataTreeStartExpanded:false,
            columns:[
                {title:"تاریخ", field:"date", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:4,headerFilter:"input"},
                {title:"حجم", field:"volume", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:8,headerFilter:"input"},
                {title:"ارزش", field:"value", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:8,headerFilter:"input"},
                {title:"قیمت", field:"price", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:5,headerFilter:"input"},
            ],
        })
    }

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

    const getTrades = () =>{
        axios.post(OnRun + '/dara/gettrade', {cookie:cookie, symbol:symbol})
            .then(response =>{
                if (response.data.replay){
                    if (response.data.type=='Bourse') {
                        setDfbourse(response.data.df)
                    }else{
                        setDfNoBourse(response.data.df)
                        console.log(response.data.df)
                    }
                }
                else{
                    toast.error(response.data.msg,{position: toast.POSITION.BOTTOM_RIGHT});
                }
        })
    }
    useEffect(checkcookie, [])
    useEffect(getTrades, [])
    

    return(
        <div>
            <ToastContainer autoClose={3000} />

            <div id="data-table"></div>
        </div>
    )
}
export default Trades