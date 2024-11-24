import styles from '../styles/Home.module.css';
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import withAuth from '../components/withAuth';


function Home() {
  const token = useSelector((state) => state.user.value.token);
  const router = useRouter();

  return (
    <div className={styles.home}>

    </div>
  );
}

export default withAuth(Home);
