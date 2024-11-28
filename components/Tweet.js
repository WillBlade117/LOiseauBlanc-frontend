import styles from "../styles/Tweet.module.css";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faTrashCan } from "@fortawesome/free-solid-svg-icons";

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

function TweetCard(props) {

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
                    <div className={styles.text} >
                        {props.username}
                    </div>

                    <div className={styles.pseudoDate}>
                        @{props.firstname} - {timeAgo(props.date)}
                    </div>
                </div>
            </div>
            <div className={styles.line}>{props.content}</div>
            <div>
                <FontAwesomeIcon className={styles.icon1} icon={faHeart} /><span className={styles.iconCounter}>{0}</span>
                <FontAwesomeIcon className={styles.icon2} icon={faTrashCan} />
            </div>
        </div>
    );
}

export default TweetCard;