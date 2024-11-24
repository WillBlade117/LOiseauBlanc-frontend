import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

const withAuth = (WrappedComponent) => {
    return (props) => {
        const token = useSelector((state) => state.user.value.token);
        const router = useRouter();

        useEffect(() => {
            if (!token) {
                router.push('/login');
            }
        }, [token, router]);
        
        return token ? <WrappedComponent {...props} /> : null;
    };
};

export default withAuth;