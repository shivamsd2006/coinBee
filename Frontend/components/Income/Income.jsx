
import { useState } from 'react'
import IncomeForm from '../IncomeForm/IncomeForm'
import { CirclePlus } from 'lucide-react';
import Button from '../../UiComponents/Button';
import IncomeTypeSwitcher from '../../UiComponents/IncomeTypeSwitcher';

const arr = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,,7,18,19,20,21,22,23,24,25,26,27,28];
const item = arr.map((i)=>{
   return(<div key={i} className='bg-white w-full h-[15%] mb-2 shrink-0 flex justify-center items-center'>{i}</div>) 

})

const Income = () => {
    const [isClicked, setIsClicked] = useState(false)

    return (
        <>
            <div  className='h-[80%] w-full  flex flex-col items-center justify-center gap-4 relative'>
                 <div className='absolute right-5 top-8 '>
                    <IncomeTypeSwitcher/>
                 </div>
                 <div className='flex flex-col w-[80%] h-[60vh] overflow-scroll [&::-webkit-scrollbar]:hidden items-center bg-linear-to-br from-green-400 to-slate-50'>
                      {item}
                 </div>
                {isClicked && <div className='w-[352px] h-[450px] bg-linear-to-br from-green-400 to-slate-50 flex flex-col justify-end items-center mb-15  absolute bottom-0 rounded-xl'>
                    <IncomeForm />
                </div>}
                <div className='flex justify-center items-center  h-[10%] w-[10%] absolute bottom-0'>
                    <Button title='Income' onClick={() => { setIsClicked(!isClicked) }} />

                </div>

            </div>
        </>
    )



}
export default Income
