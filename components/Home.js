import styles from '../styles/Home.module.css';
import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { useRouter } from 'next/router';
import withAuth from '../components/withAuth';
import Profil from './Profil';
import NewTweet from './NewTweet';
import Tweet from './Tweet';
import Hashtag from './Hashtag';

function Home() {
  const token = useSelector((state) => state.user.value.token);
  const [tweets, setTweets] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const tweetsContainerRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const fetchTweets = async () => {
      if (!hasMore) return; //Arrête le chargement s'il n'y a plus de tweets à charger
      setLoading(true); //Indique que le chargement est en cours
      try {
        const response = await fetch(`http://localhost:3000/tweets?page=${page}&token=${token}`);
        const data = await response.json();
        if (data.result) {
          setTweets((prevTweets) => {
            const newTweets = data.content.filter(tweet => !prevTweets.some(prevTweet => prevTweet.date === tweet.date));
            return [...prevTweets, ...newTweets];
          });
          if (data.content.length === 0) {
            setHasMore(false); //Indique qu'il n'y a plus de tweets à charger
          }
        }
      } finally {
        setLoading(false);
      }
    };

    fetchTweets();
  }, [page, hasMore, token]); //Requête de tweets à chaque changement de page ou hasMore

  const handleScroll = () => {
    const container = tweetsContainerRef.current;
    //Vérifie si les tweets sont à 50 pixels ou moins du bas
    const isBottom = container.scrollHeight - container.scrollTop - container.clientHeight < 50;
    if (!isBottom || loading) {
      return; //Ne fait rien si le bas n'est pas atteint/si le chargement est déjà en cours
    }

    setPage((prevPage) => prevPage + 1); //Incrémente la page pour charger les tweets suivants
  };

  useEffect(() => {
    const container = tweetsContainerRef.current;
    container.addEventListener("scroll", handleScroll); //Ajoute l'événement de défilement au conteneur des tweets
    return () => {
      container.removeEventListener("scroll", handleScroll); //Retire l'événement de défilement
    };
  }, [loading]);

  const tweetComponents = tweets.map((tweet) => (
    <Tweet
      key={tweet._id}
      username={tweet.username}
      date={tweet.date}
      content={tweet.content}
      firstname={tweet.firstname}
      setTweets={setTweets}
      hasLiked={tweet.hasLiked}
      isLiked={tweet.isLiked} // Passez l'état de like
    />
  ));

  return (
    <div className={styles.home}>
      <div className={styles.profil}><Profil /></div>
      <div className={styles.write}><NewTweet setTweets={setTweets} /></div>
      <div className={styles.tweet} ref={tweetsContainerRef}>
        {tweetComponents}
        {loading && <p className={styles.footer}>Loading...</p>}
        {!hasMore && <p className={styles.footer}>No more tweets to load.</p>}
      </div>
      <div className={styles.hashtag}><Hashtag/></div>
    </div>
  );
}

export default withAuth(Home);
