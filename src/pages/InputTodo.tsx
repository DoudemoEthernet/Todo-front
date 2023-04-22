import React, { Dispatch, SetStateAction } from 'react'; 
import { useState, useEffect } from 'react';
import styles from '@/styles/input_todo.module.css';
import useFetch from 'use-http';
import { DEV_MIDDLEWARE_MANIFEST } from 'next/dist/shared/lib/constants';

type Data = {
    title: string;
  };


export const InputTodo: React.FC<{show: boolean; setShow: Dispatch<SetStateAction<boolean>>;}> = ({show, setShow}) => {


    const [title,setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [difficulty, setDifficulty] = useState("0");

    const json = {
        title: title,
        description: description,
        difficulty: difficulty
    };
    const obj = JSON.stringify(json);

    const { get, post, response, loading, error } = useFetch('http://localhost:8002');

    async function addTodo() {
        const newTodo = await post('/task', json);
        if (response.ok) console.log("ok");
      }
    addTodo();

    useEffect(() => {console.log(show)}, [show])
    
    return(
        <div hidden={!show}>
            <div className={styles.overlay}>
                <div className={styles.module_content}>
                    <input type="text" value={title}
                    onChange={(event) => setTitle(event.target.value)}/>

                    <input type="text" value="description"
                    onChange={(event) => setDescription(event.target.value)}/>

                    <div>
                    <input  name="difficult" type="checkbox" value="difficulty"
                    onChange={(event) => setDifficulty(event.target.value)}/>
                    <label>1</label>
                    </div>

                    <div>
                    <input  name="difficult" type="checkbox" value="difficulty"
                    onChange={(event) => setDifficulty(event.target.value)}/>
                    <label>2</label>
                    </div>

                    <div>
                    <input name="difficult" type="checkbox" value="difficulty"
                    onChange={(event) => setDifficulty(event.target.value)}/>
                    <label>3</label> 
                    </div>

                    
                <button onClick={() => setShow(false)}>close</button>
            </div>
        </div>

        </div>
    )
}


