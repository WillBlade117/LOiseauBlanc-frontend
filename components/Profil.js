import styles from '../styles/Profil.module.css';
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../reducers/user";

function Profil() {
    const dispatch = useDispatch();
    const username = useSelector((state) => state.user.value.username);
    const name = useSelector((state) => state.user.value.firstname);

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <div className={styles.content}>
            <div className={styles.logo}>
                <Image
                    src="/logo-twitter-blanc-png.png"
                    alt="Logo"
                    width={60}
                    height={60}
                />
            </div>
            <div>
                <div className={styles.user}>
                    <Image
                        className={styles.profilphoto}
                        src="/profile.webp"
                        alt="profil"
                        width={45}
                        height={40}
                    />
                    <div className={styles.pseudo}>
                        <div className={styles.textbolder}>{name}</div>
                        <div className={styles.textpseudo}>@{username}</div>
                    </div>
                </div>
                <div>
                    <button className={styles.logoutbtn} onClick={() => handleLogout()}>
                        Logout
                    </button>
                </div>
            </div>
        </div>
    )
};

export default Profil;