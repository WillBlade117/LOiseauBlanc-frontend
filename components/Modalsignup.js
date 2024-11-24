import React, { useState } from "react";
import { Button, Modal } from "antd";
import { useDispatch } from "react-redux";
import { login } from "../reducers/user";
import styles from "../styles/Modales.module.css";

const Modalsignup = (props) => {
  const dispatch = useDispatch();

  const [signupFirstname, setSignupFirstname] = useState("");
  const [signupUsername, setSignupUsername] = useState("");
  const [signupPassword, setSignupPassword] = useState("");

  const handleOk = () => {
    fetch("http://localhost:3000/users/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstname: signupFirstname,
        username: signupUsername,
        password: signupPassword,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          dispatch(
            login({
              firstname: signupFirstname,
              username: signupUsername,
              token: data.user.token,
            })
          );
          setSignupFirstname("");
          setSignupUsername("");
          setSignupPassword("");
        }
      });
  };

  return (
    <>
      <Modal
        title="SIGN UP"
        open={props.isModalUpOpen}
        onOk={handleOk}
        onCancel={props.handleCancelup}
      >
        <div className={styles.bloc}>
          <input className={styles.input}
            type="text"
            placeholder="firstname"
            onChange={(e) => setSignupFirstname(e.target.value)}
            value={signupFirstname}
          />
          <input className={styles.input}
            type="text"
            placeholder="username"
            onChange={(e) => setSignupUsername(e.target.value)}
            value={signupUsername}
          />
          <input className={styles.input}
            type="password"
            placeholder="password"
            onChange={(e) => setSignupPassword(e.target.value)}
            value={signupPassword}
          />
        </div>
      </Modal>
    </>
  );
};

export default Modalsignup;
