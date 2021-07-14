import React, {useEffect} from 'react';
import {useRouter} from "next/router";
import AccountServices from '../../services'
import cookieCutter from 'cookie-cutter';

const Zalo = () => {
    const router = useRouter()
    const {code} = router.query;

    useEffect(() => {
        if (code !== cookieCutter.get('zalo')) {
            AccountServices.setCurrent('zalo').authenticate(code)
        }
        router.push('/')
    }, [])
    return (
        <div>

        </div>
    );
};

export default Zalo;