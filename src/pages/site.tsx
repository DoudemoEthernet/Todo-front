import React from "react";
import styles from "@/styles/site.module.css";
import todo from "@/img/todo.jpg";
import Image from "next/image";
import Link from "next/link";
import useFetch from "use-http";
import { API_URI } from "./index";
import { tryLogin } from "../lib/account";
import {useEffect, useState} from 'react';
import { useRouter } from 'next/router'
import { userInfo } from "os";

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
        .then(() => {setResult("ok");
                    router.push('/hoge');})
        .catch((e) => {
          console.error(e);
          setResult(`failed. statusCode: ${fetch.response.status}`);
        });
  }

  return (
    <>
      <div className={styles.back}>
        <p className={styles.login}>Login</p>
        <div className={styles.input_login}>
          <input className={styles.name} type="text" value={user}
          onChange={(event) => setUser(event.target.value)} />
          <input className={styles.name} type="text" value={password}
          onChange={(event) => setPassword(event.target.value)}
           />
        </div>

        <button 
                onClick={() => onClickSubmit}>login</button>
        <Image className={styles.img} src={todo} alt="todo" width={300} height={300} />
       
      </div>
    </>
  );
}
