import styles from "../styles/Login.module.css";
import Image from "next/image";
import Modalsignup from "./Modalsignup";
import Modalsignin from "./Modalsignin";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useRouter } from 'next/router';

function Login() {
    const token = useSelector((state) => state.user.value.token);
    const router = useRouter();
    const [isModalUpOpen, setIsModalUpOpen] = useState(false);
    const [isModalInOpen, setIsModalInOpen] = useState(false);

    useEffect(() => {
        if (token) {
            router.push('/');
        }
    }, [token, router]);

    const handleCancelup = () => {
        setIsModalUpOpen(false);
    };
    const handleCancelin = () => {
        setIsModalInOpen(false);
    };

    return (
        <div className={styles.login}>
            <div className={styles.graphart}>
                <Image
                    className={styles.logo}
                    src="/logo-twitter-blanc-png.png"
                    alt="Logo"
                    width={380}
                    height={380}
                />
            </div>
            <div className={styles.connect}>
                <div>
                    <Image
                        className={styles.logo}
                        src="/logo-twitter-blanc-png.png"
                        alt="Logo"
                        width={60}
                        height={60}
                    />
                </div>
                <div>
                    <h1 className={styles.h1}>See what's happening</h1>
                    <h2>Join Hackatweet today.</h2>
                    <button className={styles.buttsingup} onClick={() => setIsModalUpOpen(true)} >Sign up</button>
                    <h3 className={styles.h3}>Already have on account?</h3>
                    <button className={styles.buttsingin} onClick={() => setIsModalInOpen(true)}>Sign in</button>
                    <Modalsignup isModalUpOpen={isModalUpOpen} handleCancelup={handleCancelup} />
                    <Modalsignin isModalInOpen={isModalInOpen} handleCancelin={handleCancelin} />

                </div>
            </div>
        </div>
    );
}

export default Login;