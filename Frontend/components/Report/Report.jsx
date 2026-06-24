
import { useState } from 'react';
import { CirclePlus } from 'lucide-react';
import Button from '../../UiComponents/Button';
import Input from '../../UiComponents/Input';
 


const Expense = () => {
    const [expense, setExpense] = useState("")
    const [description, setDescription] = useState('')
    const [category, setCategory] = useState('Groceries')
    const [descriptionError, setDescriptionError] = useState('')
   

    const user = {
        Expense: Number(expense),
        Description: description,
        Category: category
    }

    const checkDescriptionError = (e) => {
        if (e.target.value == 1) {
            setDescriptionError('Error')
        } else {
            setDescription(e.target.value)
        }

    }


    const formData = (e) => {
        e.preventDefault();
        sendData(user);

    }

    async function sendData(data) {
        try {
            const response = await fetch("http://localhost:5000/expenseRoutes/add", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(data)
            })
            if (response.ok) {
                const result = await response.json();
                console.log(result.Category);

                console.log("this is the result--->", result);
            } else {
                console.log("http error ", response.status);
            }

        } catch (error) {
            console.error("network erorr", error.name);
            console.error("network message", error.message);

        }
    }



   

    return (
       
           
                <form onSubmit={formData}className='bg-gray-900 flex flex-col  h-[90%] w-[60%] rounded-xl  p-4' >
                     <div>
                <h4 className='text-[#FFFFFF] font-syne font-semibold text-[1.2rem]'>Add Expense:</h4>
                   </div>
                   <div className='mt-2'>
                    <Input id='Amount' type='number'value={expense} onChange={(e) => setExpense(e.target.value)}/>
                   </div>
                   <div className='mt-2'>
                    <Input id='Description' type='text'  value={description} onChange={checkDescriptionError}/>
                   </div>
                    
                    <label htmlFor="category" className=' text-[#8E8E93] text-[1.2rem] mt-2' > Category</label>
                    <select className='text-[#8E8E93]' id='category text-[1.2rem] border-2 border-[#8E8E93] rounded-xl' value={category} onChange={(e) => setCategory(e.target.value)}>
                        <option value="Groceries" >Groceries</option>
                        <option value="Travel">Travel</option>
                        <option value="Clothes">Clothes</option>

                    </select>

                    <p>{descriptionError}</p>
                     
                   <div className='mt-2 flex justify-center '>
                   <Button title = 'Add'/>
                    </div>
                </form>
    )


}

const Report = () => {
    const [isClicked,setIsClicked] = useState(false)
    return (
        <>
            <div className='h-screen w-screen  flex items-end justify-center gap-4'>

                <div className=' w-[50%] h-[70%]  flex flex-col justify-end items-center gap-3'>
                    {isClicked&& <Expense/>}
                   
                    <button onClick={()=>{setIsClicked(true)}} className='w-10 h-10 size-5'>
                         <CirclePlus className="w-6 h-6 size-7 text-white "/>
                    </button>
                   
                </div>
            </div>
 
        </>
    )
}

export default Report
