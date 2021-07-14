import React, {Fragment, useContext} from 'react';
import {Transition} from "@headlessui/react";
import LoadingContext from "../../contexts/LoadingContext";

const PageLoading = () => {
    let circleCommonClasses = 'h-5 w-5 border-4 border-solid border-black rounded-full';

    const { loading } = useContext(LoadingContext)

    return (
        <Transition
            as={Fragment}
            show={loading}
            enter="transition-opacity duration-0"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-0"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
        >
            <div className="z-10 fixed w-full top-0 h-full bg-white grid place-items-center">
                <div className='flex'>
                    <div className={`${circleCommonClasses} mr-1 animate-bounce`}/>
                    <div className={`${circleCommonClasses} mr-1 animate-bounce200`}/>
                    <div className={`${circleCommonClasses} animate-bounce400`}/>
                </div>
            </div>
        </Transition>
    );
};

export default PageLoading;