import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../styles/Hashtag.module.css'; // Assurez-vous d'avoir un fichier CSS pour les styles

const Hashtag = () => {
    const [hashtags, setHashtags] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchHashtags = async () => {
            try {
                const response = await axios.get('http://localhost:3000/trends');
                if (response.data.result) {
                    setHashtags(response.data.trends.slice(0, 5)); // Limitez à 5 hashtags
                } else {
                    setError(response.data.message);
                }
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchHashtags();
    }, []);

    if (loading) {
        return <div className={styles.loading}>Loading hashtags...</div>;
    }

    if (error) {
        return <div className={styles.error}>Error loading hashtags: {error}</div>;
    }

    const trends = hashtags.map((hashtag, i) => (
        <div className={styles.content}>
            <div className={styles.hashtagTerm}>#{hashtag.term}</div>
            <div className={styles.hashtagCount}>{hashtag.count} tweet(s)</div>
        </div>
    ));

    return (
        <div>
            <h2 className={styles.title}>Trends</h2>
            <div className={styles.hashtagsList}>
            {trends}
            </div>
        </div>
    );
};

export default Hashtag;
