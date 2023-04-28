import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import useFetch, { UseFetch } from "use-http";
import styles from "@/styles/Todolist.module.css";
import { API_URI } from "@/pages/index";
import { getAuthHeader, getToken } from "@/lib/account";

export interface Data {
  id: string;
  title: string;
  description: string;
  difficulty: number;
}

export const tryGetTask = async (useFetch: UseFetch<any>): Promise<Data[]> =>
  await useFetch.get("/task");

export const Todolist: React.FC<{
  setIsEditing: Dispatch<SetStateAction<boolean>>;
  setEditingTodo: Dispatch<SetStateAction<Data | null>>;
  requireUpdate: boolean;
  setRequireUpdate: Dispatch<SetStateAction<boolean>>;
}> = ({ setIsEditing, setEditingTodo, requireUpdate, setRequireUpdate }) => {
  const token = getToken();
  if (token === undefined) {
    //TODO ログイン画面に戻す
  }
  const fetch = useFetch(API_URI, { headers: { ...getAuthHeader(token ?? "") } });
  const [todoList, setTodoList] = useState<Data[]>([]);

  useEffect(() => {
    tryGetTask(fetch)
      .then((data) => setTodoList(data))
      .catch((e) => {
        console.error(e);
      });
    setRequireUpdate(false);
  }, [requireUpdate]);
  // const test: Data[] = Data
  // test[0].title = (undefined ? loading : false;)

  return (
    <>
      {fetch.response.ok ? (
        todoList.map((data) => (
          <div
            key={data.id}
            className={styles.todo}
            onClick={() => {
              setEditingTodo(data);
              setIsEditing(true);
            }}
          >
            <div className={styles.todo} role="button">
              <p className={styles.word}>・{data.title}</p>
            </div>
          </div>
        ))
      ) : (
        <div className={styles.todo} role="button" onClick={() => setIsEditing(true)}>
          <p className={styles.word}>・test</p>
        </div>
      )}
    </>
  );
};
