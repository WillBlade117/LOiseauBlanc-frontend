import styles from "../styles/Tweet.module.css";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

function timeAgo(input) {
  const date = (input instanceof Date) ? input : new Date(input);
  const formatter = new Intl.RelativeTimeFormat('en');
  const ranges = {
    years: 3600 * 24 * 365,
    months: 3600 * 24 * 30,
    weeks: 3600 * 24 * 7,
    days: 3600 * 24,
    hours: 3600,
    minutes: 60,
    seconds: 1
  };
  const secondsElapsed = (date.getTime() - Date.now()) / 1000;
  for (let key in ranges) {
    if (ranges[key] < Math.abs(secondsElapsed)) {
      const delta = secondsElapsed / ranges[key];
      return formatter.format(Math.round(delta), key);
    }
  };
};

function TweetCard({ username, date, content, firstname, setTweets }) {
  const user = useSelector((state) => state.user.value.username);
  const [trash, setTrash] = useState(false);

  useEffect(() => {
    if (user === username) {
      setTrash(true);
    }
  }, [user, username]);

  const deleteTweet = () => {
    fetch(`http://localhost:3000/tweets/${date}`, {
      method: 'DELETE',
    })
    .then(response => response.json())
    .then(data => {
      if(data.result){
        setTweets((prevTweets) => prevTweets.filter(tweet => tweet.date !== date));
      }
    });
  };

  return (
    <div className={styles.card}>
      <div className={styles.line}>
        <Image
          className={styles.egg}
          src="/profile.PNG"
          alt="Logo"
          width={40}
          height={40}
        />
        <div className={styles.identifiant}>
          <div className={styles.text}>{username}</div>
          <div className={styles.pseudoDate}>
            @{firstname} - {timeAgo(date)}
          </div>
        </div>
      </div>
      <div className={styles.line}>{content}</div>
      <div>
        <FontAwesomeIcon className={styles.icon1} icon={faHeart} /><span className={styles.iconCounter}>{0}</span>
        {trash && <FontAwesomeIcon onClick={deleteTweet} className={styles.icon2} icon={faTrashCan} />}
      </div>
    </div>
  );
}

export default TweetCard;
