import 'tailwindcss/tailwind.css'
import '../styles/globals.css'
import Header from "../layouts/Header";
import {errorInterceptor, initSdkLogin, jwtInterceptor} from "../helpers";
import {useEffect, useState} from "react";
import PageLoading from "../components/loading/PageLoading";
import LoadingContext from "../contexts/LoadingContext";


function MyApp({Component, pageProps}) {
    const [init,setInit] = useState(false);
    const [loading,setLoading] = useState(false)
    useEffect( ()=>{
        // enable interceptors for http requests
        jwtInterceptor();
        errorInterceptor();
        // init external scripts
        async function init(){
            await initSdkLogin();
        }
        init().then(r =>setInit(true))
    },[])
    if (init){
        return (
            <LoadingContext.Provider value={{loading,setLoading}}>
                <Header/>
                <Component {...pageProps} />
                <PageLoading/>
            </LoadingContext.Provider>
        )
    }else{
        return <div className="fixed w-full h-full bg-indigo-600"/>
    }
}

export default MyApp
