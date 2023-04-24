import React, { useEffect, useState } from "react";
import useFetch, { UseFetch } from "use-http";
import styles from "@/styles/input_todo.module.css";

interface Data {
  id: string;
  title: string;
  description: string;
  difficulty: number;
}

export const tryGetTask = async (useFetch: UseFetch<any>): Promise<Data[]> =>
  await useFetch.get("/task");

export const Todolist: React.FC = () => {
  const fetch = useFetch("http://localhost:8003");
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
      <div className={styles.todo}>
        {fetch.response.ok ? (
          todoList.map((data) => (
            <div key={data.id}>
              <p>{data.title}</p>
              <p>{data.description}</p>
            </div>
          ))
        ) : (
          <></>
        )}
      </div>
    </>
  );
};
