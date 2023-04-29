import styles from "@/styles/Home.module.css";
import { Inter } from "next/font/google";
import { useState } from "react";
import { InputTodo } from "./InputTodo";
import { Data, Todolist } from "./Todolist";
import { TodoDetails } from "./TodoDetails";
import dynamic from "next/dynamic";
import { SkillBar } from 'react-skillbars';

const inter = Inter({ subsets: ["latin"] });

export const API_URI = process.env.NODE_ENV === "development" ? "http://localhost:8003" : "https://greenback.doudemoether.net";

const DynamicTodoList = dynamic(async () => Todolist, {
  loading: () => <p>Loading...</p>,
  ssr: false,
});

const DynamicTodoDetails = dynamic(async () => TodoDetails, {
  loading: () => <p>Loading...</p>,
  ssr: false,
});

const DynamicInputTodo = dynamic(async () => InputTodo, {
  loading: () => <p>Loading...</p>,
  ssr: false,
});

const Experience_point: number = 100;
const skills = [
  {
    type: 'level',
    level: Experience_point,
    color: {
      title: { text: '#fff', background: '#FEB894' }

    }
  }
];

export default function Home() {
  const [show, setShow] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [editingTodo, setEditingTodo] = useState<Data | null>(null);
  const [requireUpdate, setRequireUpdate] = useState(false);
  return (
    <>
      <p className={styles.test}>Just To Do It !!!!!</p>
      <div className={styles.menu}>
        <div className={styles.menu_edge}>
          <button className={styles.toSubmit} onClick={() => setShow(true)}>
            ＋
          </button>
        </div>
        <div className={styles.menu_back}>
          <DynamicTodoList
            setIsEditing={setIsEditing}
            setEditingTodo={setEditingTodo}
            setRequireUpdate={setRequireUpdate}
            requireUpdate={requireUpdate}
          />
          {isEditing ? (
            <DynamicTodoDetails
              isEditing={isEditing}
              setIsEditing={setIsEditing}
              currentData={editingTodo}
            />
          ) : (
            <></>
          )}

          {show ? (
            <DynamicInputTodo show={show} setShow={setShow} setRequireUpdate={setRequireUpdate} />
          ) : (
            <></>
          )}
        </div>
        <SkillBar skills={skills}/>
      </div>
      {/* <div>{loading ? "loading" : "ERROR!"}</div>  */}
    </>
  );
}
