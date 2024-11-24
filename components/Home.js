import styles from '../styles/Home.module.css';
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import withAuth from '../components/withAuth';
import Profil from './Profil';


function Home() {
  const token = useSelector((state) => state.user.value.token);
  const router = useRouter();

  return (
    <div className={styles.home}>
      <div className={styles.profil}><Profil/></div>
      <div className={styles.write}>write</div>
      <div className={styles.tweet}>tweet</div>
      <div className={styles.hashtag}>hashtag</div>

    </div>
  );
}

export default withAuth(Home);
