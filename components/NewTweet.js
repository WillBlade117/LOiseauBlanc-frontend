import styles from '../styles/NewTweet.module.css';
import { useState } from "react";
import { useSelector } from "react-redux";

function NewTweet({ setTweets }) {
  const token = useSelector((state) => state.user.value.token);
  const [newContent, setNewContent] = useState("");

  const handleTweet = () => {
    fetch("http://localhost:3000/tweets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token: token,
        content: newContent,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          setNewContent("");
          setTweets((prevTweets) => [data.content, ...prevTweets]);
        }
      });
  };

  return (
    <div className={styles.content}>
      <h2 className={styles.title}>Home</h2>
      <input
        className={styles.input}
        type="text"
        maxLength={280}
        onChange={(e) => setNewContent(e.target.value)}
        value={newContent}
        placeholder="What's UP ??"
      />
      <div className={styles.buttonbox}>
        <div>{newContent.length}/280</div>
        <button onClick={handleTweet} className={styles.button}>Tweet</button>
      </div>
    </div>
  );
}

export default NewTweet;
