import React from "react";
import styles from "@/styles/site.module.css";
import todo from "@/img/todo.jpg";
import Image from "next/image";
import Link from "next/link";

export default function Site() {
  return (
    <>
      <div className={styles.back}>
        <p className={styles.login}>Login</p>
        <div className={styles.input_login}>
          <input className={styles.name} type="text"></input>
          <input className={styles.name} type="text"></input>
        </div>

          <Image className={styles.img} src={todo} alt="todo" width={300} height={300} />
        <Link className={styles.link}href="/">
          <p>click</p>
        </Link>
      </div>
    </>
  );
}
