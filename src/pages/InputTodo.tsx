import React, { Dispatch, SetStateAction } from "react";
import { useState } from "react";
import styles from "@/styles/input_todo.module.css";
import useFetch from "use-http";
import { API_URI } from "./index";

type Data = {
  title: string;
  description: string;
  difficulty: number;
};

export const InputTodo: React.FC<{
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
  setRequireUpdate: Dispatch<SetStateAction<boolean>>;
}> = ({ show, setShow, setRequireUpdate }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [difficulty, setDifficulty] = useState("0");

  const { post } = useFetch(API_URI);

  async function addTodo() {
    const todo: Data = {
      title: title,
      description: description,
      difficulty: parseInt(difficulty),
    };
    console.log(todo);
    await post("/task", todo);
    setShow(false);
  }

  return (
    <div hidden={!show}>
      <div className={styles.overlay}>
        <div className={styles.module_content}>
          <label className={styles.title_text}>Title</label>
          <input
            className={styles.input_title}
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />

          <div className={styles.input_checkbox}>
            <div>
              <label>1</label>
              <input
                className={styles.input_difficult}
                type="checkbox"
                value={"1"}
                onChange={(event) => setDifficulty(event.target.value)}
              />
            </div>

            <div>
              <label>2</label>
              <input
                className={styles.input_difficult2}
                type="checkbox"
                value={"2"}
                onChange={(event) => setDifficulty(event.target.value)}
              />
            </div>

            <div>
              <label>3</label>
              <input
                className={styles.input_difficult3}
                type="checkbox"
                value={"3"}
                onChange={(event) => setDifficulty(event.target.value)}
              />
            </div>
          </div>

          <div>
            <label className={styles.description}>Description</label>
            <textarea
              className={styles.input_text}
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
          </div>

          <div className={styles.button}>
            <button
            className={styles.close}
             onClick={() => setShow(false)}>close</button>
            <button
            className={styles.submit}
              onClick={() => {
                setRequireUpdate(true);
                addTodo().catch((e) => {
                  console.log(e);
                });
              }}
            >
              submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
