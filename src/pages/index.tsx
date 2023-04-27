import styles from "@/styles/Home.module.css";
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
import { InputTodo } from "./InputTodo";
import { Data, Todolist } from "./Todolist";
import { TodoDetails } from "./TodoDetails";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [show, setShow] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [editingTodo, setEditingTodo] = useState<Data | null>(null);
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
          <Todolist setIsEditing={setIsEditing} setEditingTodo={setEditingTodo} />
          {isEditing ? <TodoDetails isEditing={isEditing} setIsEditing={setIsEditing} /> : <></>}

          {show ? <InputTodo show={show} setShow={setShow} /> : <></>}
        </div>
      </div>
      {/* <div>{loading ? "loading" : "ERROR!"}</div>  */}
    </>
  );
}
