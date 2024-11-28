import styles from '../styles/Home.module.css';
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import withAuth from '../components/withAuth';
import Profil from './Profil';
import NewTweet from './NewTweet';
import Tweet from './Tweet';


function Home() {
  const token = useSelector((state) => state.user.value.token);
  const [ render, setRender ] = useState(true);
  const [tweets, setTweets] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetch("http://localhost:3000/tweets")
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          setTweets(data.content);
        }
      });
  }, [render]);

  const tweet = tweets.map((data, i) => {
    return <Tweet key={i} {...data} render={render} setRender={setRender}/>;
  });

  return (
    <div className={styles.home}>
      <div className={styles.profil}><Profil/></div>
      <div className={styles.write}><NewTweet setRender={setRender}/></div>
      <div className={styles.tweet}>{tweet}</div>
      <div className={styles.hashtag}>hashtag</div>
    </div>
  );
}

export default withAuth(Home);
