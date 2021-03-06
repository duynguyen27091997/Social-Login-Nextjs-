/* This example requires Tailwind CSS v2.0+ */
import {Fragment, useContext, useRef} from 'react'
import {Dialog, Transition} from '@headlessui/react'
import {GrFacebook, GrGoogle} from "react-icons/gr";
import {MdNearMe} from "react-icons/md";
import AccountServices from "../../services";
import LoadingContext from "../../contexts/LoadingContext";
import {sleep} from "../../utils/helpers";


export default function LoginModal({open, setOpen}) {

    const cancelButtonRef = useRef(null)
    const {setLoading} = useContext(LoadingContext)

    async function handleLogin(serviceName) {
        await AccountServices.login(serviceName)
        sleep(500).then(()=> setLoading(false))
        setOpen(false)
    }

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog
                as="div"
                static
                className="fixed z-10 inset-0 overflow-y-auto"
                initialFocus={cancelButtonRef}
                open={open}
                onClose={setOpen}
            >
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"/>
                    </Transition.Child>

                    {/* This element is to trick the browser into centering the modal contents. */}
                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
            &#8203;
          </span>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                        <div
                            className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <h2 className="font-medium text-4xl text-gray-700 uppercase text-center mb-8">Login</h2>
                                <button
                                    onClick={() => handleLogin('facebook')}
                                    type="button"
                                    className="mt-3 flex items-center justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 bg-blue-700"
                                >
                                    <GrFacebook size={22} style={{marginRight: 15}}/>
                                    Facebook
                                </button>

                                <button
                                    onClick={() => handleLogin('google')}
                                    type="button"
                                    className="g-signin2 mt-3 flex items-center justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 bg-red-700"
                                >
                                    <GrGoogle size={22} style={{marginRight: 15}}/>
                                    Google
                                </button>

                                <button
                                    onClick={() => handleLogin('zalo')}
                                    type="button"
                                    className="mt-3 flex items-center justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 bg-blue-400"
                                >
                                    <MdNearMe color={'#ffffff'} size={22} style={{marginRight: 15}}/>
                                    Zalo
                                </button>

                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    )
}
