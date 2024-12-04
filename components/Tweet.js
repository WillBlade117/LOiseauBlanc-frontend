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
  }
}

function Tweet({ username, date, content, firstname, setTweets, hasLiked }) {
  const user = useSelector((state) => state.user.value.username);
  const token = useSelector((state) => state.user.value.token);
  const [liked, setLiked] = useState(false);
  const [trash, setTrash] = useState(false);
  const [likeCount, setLikeCount] = useState(hasLiked.length); // Ajoutez un état pour le compteur de likes

  // useEffect(() => {
  //   if (user === username) {
  //     setTrash(true);
  //   }
    // Vérifie si le tweet est liké au chargement
  //   fetch(`http://localhost:3000/tweets/hasLike/${date}`, {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({ token }),
  //   })
  //   .then(response => response.json())
  //   .then(data => {
  //     if (data.result) {
  //       setLiked(data.liked);
  //     }
  //   });
  // }, [user, username, date, token]);

  const handleLike = () => {
    fetch(`http://localhost:3000/tweets/like/${date}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token }),
    })
    .then(response => response.json())
    .then(data => {
      if (data.result) {
        setLiked(true);
        setLikeCount(likeCount + 1); // Incrémentez le compteur de likes
        setTweets((prevTweets) =>
          prevTweets.map((tweet) =>
            tweet.date === date ? { ...tweet, hasLiked: [...tweet.hasLiked, user] } : tweet
          )
        );
      }
    });
  };

  const handleDislike = () => {
    fetch(`http://localhost:3000/tweets/unlike/${date}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token }),
    })
    .then(response => response.json())
    .then(data => {
      if (data.result) {
        setLiked(false);
        setLikeCount(likeCount - 1); // Décrémentez le compteur de likes
        setTweets((prevTweets) =>
          prevTweets.map((tweet) =>
            tweet.date === date ? { ...tweet, hasLiked: tweet.hasLiked.filter((username) => username !== user) } : tweet
          )
        );
      }
    });
  };

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
        <FontAwesomeIcon
          className={liked ? styles.iconLiked : styles.icon1}
          icon={faHeart}
          onClick={liked ? handleDislike : handleLike}
        />
        <span className={styles.iconCounter}>{likeCount}</span> {/* Affichez le compteur de likes */}
        {trash && <FontAwesomeIcon onClick={deleteTweet} className={styles.icon2} icon={faTrashCan} />}
      </div>
    </div>
  );
}

export default Tweet;
