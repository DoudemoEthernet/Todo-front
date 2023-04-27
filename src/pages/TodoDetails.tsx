import React, { Dispatch, SetStateAction } from "react";
import { useState, useEffect } from "react";
import styles from "@/styles/TodoDetails.module.css";
import useFetch from "use-http";
import { Data } from "@/pages/Todolist";
import { API_URI } from "@/pages/index";

export const TodoDetails: React.FC<{
  isEditing: boolean;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
  currentData: Data | null;
}> = ({ isEditing, setIsEditing, currentData }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [difficulty, setDifficulty] = useState("0");

  useEffect(() => {
    if (currentData !== null) {
      setTitle(currentData.title);
      setDescription(currentData.description);
      setDifficulty(`${currentData.difficulty}`);
    }
  }, [currentData]);

  const fetch = useFetch(API_URI);

  async function updateTodo() {
    if (currentData === null) {
      console.error("currentData is null!!");
      return;
    }
    const data: Data = {
      id: currentData.id,
      title: title,
      description: description,
      difficulty: parseInt(difficulty),
    };
    await fetch.patch("/task", data);
    setIsEditing(false);
  }

  async function deleteTodo() {
    if (currentData === null) {
      console.error("currentData is null!!");
      return;
    }
    await fetch.delete(`/task/${currentData.id}`);
    setIsEditing(false);
  }

  return (
    <div hidden={!isEditing}>
      <div className={styles.overlay}>
        <div className={styles.module_content}>
          <label>Title</label>
          <input
            className={styles.input_title}
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />

          <div className={styles.input_checkbox}>
            <div>
              <label form="input_difficult1">1</label>
              <input
                className={styles.input_difficult}
                id="difficulty1"
                type="checkbox"
                value="difficulty1"
                onChange={(event) => setDifficulty(event.target.value)}
              />
            </div>

            <div>
              <label form="input_difficult2">2</label>
              <input
                className={styles.input_difficult2}
                id="difficulty2"
                type="checkbox"
                value="difficulty2"
                onChange={(event) => setDifficulty(event.target.value)}
              />
            </div>

            <div>
              <label form="input_difficult3">3</label>
              <input
                className={styles.input_difficult3}
                id="difficulty3"
                type="checkbox"
                value="difficulty3"
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
            <button onClick={() => setIsEditing(false)}>close</button>
            <button
              onClick={() =>
                updateTodo().catch((e) => {
                  console.error(e);
                })
              }
            >
              complete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
