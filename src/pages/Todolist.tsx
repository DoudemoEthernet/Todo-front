import React, { useEffect, useState } from "react";
import useFetch, { UseFetch } from "use-http";
import styles from "@/styles/Todolist.module.css"
import { render } from "react-dom";

interface Data {
  id: string;
  title: string;
  description: string;
  difficulty: number;
}

export const tryGetTask = async (useFetch: UseFetch<any>): Promise<Data[]> =>
  await useFetch.get("/task");

export const Todolist: React.FC = (props) => {
  const fetch = useFetch("http://localhost:8003");
  const [isEditing, setIsEditing] = useState(false);
  const [todoList, setTodoList] = useState<Data[]>([]);
  

  useEffect(() => {
    tryGetTask(fetch)
      .then((data) => setTodoList(data))
      .catch((e) => {
        console.error(e);
      });
  }, []);
  // const test: Data[] = Data
  // test[0].title = (undefined ? loading : false;)

  return (
    <>
    <div className={styles.todo} 
         role="button"
         onClick={() => setIsEditing(true)}>
      <p className={styles.word}>・test</p>
    </div>
        {fetch.response.ok ? (
          todoList.map((data) => (
            <div key={data.id}>
              <div />
              <p>{data.title}</p>
              <p>{data.description}</p>
            </div>
          ))
        ) : (
          <></>
        )}
      
    </>
  );
};
