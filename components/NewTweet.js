import styles from '../styles/NewTweet.module.css';
import { useState } from "react";
import { useSelector } from "react-redux";

function NewTweet() {
    const user = useSelector((state) => state.user.value.username);
    const firstname = useSelector((state) => state.user.value.firstname);
    const [newContent, setNewContent] = useState("");

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
                <button className={styles.button}>Tweet</button>
            </div>
        </div>
    )
};

export default NewTweet;