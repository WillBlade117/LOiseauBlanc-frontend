import React, { useState } from "react";
import { Button, Modal } from "antd";
import { useDispatch } from "react-redux";
import { login } from "../reducers/user";
import styles from "../styles/Modales.module.css";

const Modalsignin = (props) => {
  const dispatch = useDispatch();

  const [signupUsername, setSignupUsername] = useState("");
  const [signupPassword, setSignupPassword] = useState("");

  const handleOk = () => {
    fetch("http://localhost:3000/users/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: signupUsername,
        password: signupPassword,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          dispatch(
            login({
              username: signupUsername,
              firstname: data.user.firstname,
              token: data.user.token,
            })
          );
          setSignupUsername("");
          setSignupPassword("");
        }
      });
  };

  return (
    <>
      <Modal
        title="SIGN IN"
        open={props.isModalInOpen}
        onOk={handleOk}
        onCancel={props.handleCancelin}
      >
        <div className={styles.bloc}>
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

export default Modalsignin;