import React from 'react'; 
import styles from '@/styles/Todolist.module.css'
import { InputTodo } from './InputTodo';
import { useState } from 'react';



export const Todolist: React.FC = () => {
    const [show, setShow] = useState(false);
    
return (
<>
  <button onClick={() => setShow(true)}>Click</button>
  
      {show ? <InputTodo show={show} setShow={setShow}/> : <></>}
</>
)
}


