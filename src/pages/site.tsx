import React from "react";
import styles from "@/styles/site.module.css";
import todo from "@/img/todo.jpg";
import Image from "next/image";
import useFetch from "use-http";
import { API_URI } from "./index";
import { tryLogin } from "../lib/account";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export interface AccountInfo {
  user: string;
  password: string;
}

const COOKIE_TOKEN_KEY = "token";

const SLUG_SIGNUP = "/account/signup";
const SLUG_LOGIN = "/account/login";

export default function Site() {
  const [result, setResult] = useState("logging in...");
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const accountInfo: AccountInfo = {
    user: "username",
    password: "*********",
  };
  const fetch = useFetch(API_URI);
  const router = useRouter();

  const onClickSubmit = () => {
    
    tryLogin(accountInfo, fetch)
      .then(() => {
        setResult("ok");
      })
      .catch((e) => {
        console.error(e);
        setResult(`failed. statusCode: ${fetch.response.status}`);
      });
      
  };

  return (
    <>
      <div className={styles.back}>
        <p className={styles.login}>Login</p>
        <div className={styles.input_login}>
          <div>
            <label className={styles.user_label}>user</label>
            <input
              className={styles.name}
              type="text"
              value={user}
              onChange={(event) => setUser(event.target.value)}
            />
          </div>

          <div>
            <label className={styles.user_password}>password</label>
            <input
              className={styles.name}
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>

          <div>
          <button className={styles.login_button} onClick={() => router.push("/")}>
            login
          </button>
          <button className={styles.login_button} onClick={() => router.push("/Submit")}>
            Create New Account!
          </button>
          </div>
        </div>
        <Image className={styles.img} src={todo} alt="todo" width={300} height={300} />
      </div>
    </>
  );
}
