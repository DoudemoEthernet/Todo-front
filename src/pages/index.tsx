import styles from "@/styles/Home.module.css";
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
import { InputTodo } from "./InputTodo";
import { Data, Todolist } from "./Todolist";
import { TodoDetails } from "./TodoDetails";
import ReactSkillbar, { SkillBar } from 'react-skillbars';

const inter = Inter({ subsets: ["latin"] });

export const API_URI = "http://localhost:8003";

const Experience_point: number = 50;
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
      <p className={styles.test}>To do List</p>
      <div className={styles.menu}>
        <div className={styles.menu_edge}>
          <button className={styles.toSubmit} onClick={() => setShow(true)}>
            ＋
          </button>
        </div>
        <div className={styles.menu_back}>
          <Todolist
            setIsEditing={setIsEditing}
            setEditingTodo={setEditingTodo}
            setRequireUpdate={setRequireUpdate}
            requireUpdate={requireUpdate}
          />
          {isEditing ? (
            <TodoDetails
              isEditing={isEditing}
              setIsEditing={setIsEditing}
              currentData={editingTodo}
            />
          ) : (
            <></>
          )}

          {show ? (
            <InputTodo show={show} setShow={setShow} setRequireUpdate={setRequireUpdate} />
          ) : (
            <></>
          )}
        </div>
        <SkillBar skills={skills} height={15}/>
      </div>
      {/* <div>{loading ? "loading" : "ERROR!"}</div>  */}
    </>
  );
}
