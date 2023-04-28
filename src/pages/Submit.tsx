import React from "react";
import styles from "@/styles/Submit.module.css";
import useFetch from "use-http";
import { API_URI } from "./index";
import { trySignup } from "../lib/account";
import { useState } from "react";

export interface AccountInfo {
  user: string;
  password: string;
}

const COOKIE_TOKEN_KEY = "token";
const SLUG_SIGNUP = "/account/signup";

export default function Submit() {
  const [result, setResult] = useState("logging in...");
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  const accountInfo: AccountInfo = {
    user: "username",
    password: "*********",
  };

  const fetch = useFetch(API_URI);

  const onClickSubmit = () => {
    trySignup(accountInfo, fetch)
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
        <p className={styles.login}>Submit</p>
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
          <button
          className={styles.login_button}
          onClick={() => {
            onClickSubmit;
          }}
        >
          submit!
        </button>
        </div>
      </div>
    </>
  );
}
