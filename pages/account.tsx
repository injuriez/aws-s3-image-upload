import React, {useState, useEffect} from 'react'



export default function Account() {

    const [password, SetPassword] = useState('')
    const [username, SetUsername] = useState('')
    //token 

    const [token, setToken] = useState('')
    //for styling
    const [usernameClass, setUsernameClass] = useState('w-full rounded-md h-[40px] text-white px-2 focus:outline-none bg-[#27272a] transition-colors duration-500 ease-in-out');
    const [passwordClass, SetpasswordClass] = useState('w-full rounded-md h-[40px] text-white px-2 focus:outline-none bg-[#27272a] transition-colors duration-500 ease-in-out');


    // Show password text: checks if password is valid...
    const checkPassword = (e: string) => {
        if (e.length < 8) {
            SetpasswordClass('w-full rounded-md h-[40px] text-white px-2 focus:outline-none border border-red-500 bg-[#27272a] transition-colors duration-500 ease-in-out');

        } else {
            SetpasswordClass('w-full rounded-md h-[40px] text-white px-2 focus:outline-none border border-green-500 bg-[#27272a] transition-colors duration-500 ease-in-out');
            SetPassword(e)

        }

    }

    const checkUsername = (e: string) => {
        if (e.length < 8) {
            setUsernameClass('w-full rounded-md h-[40px] text-white px-2 focus:outline-none border border-red-500 bg-[#27272a] transition-colors duration-500 ease-in-out');
        } else {
            setUsernameClass('w-full rounded-md h-[40px] text-white px-2 focus:outline-none border border-green-500 bg-[#27272a] transition-colors duration-500 ease-in-out');
            SetUsername(e)
        }
    };


    const Mongodb_login = () => {

        fetch('/api/signup/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        })
        .then((res) => res.json())
        .then((data) => {
            setToken(data.token)
            localStorage.setItem('token', data.token)
        })


    }
    return (
        <>
        <div className="flex min-h-screen bg-[#161616] flex-col">
            <div className="h-fit w-full p-2 flex items-center gap-2">
                <img src="/cube.png" width={50} height={50}></img>
                <h1 className="text-2xl text-white font-bold gg">voidbox</h1>

            </div>
            <div className=" flex flex-col items-center px-5 pt-16 pb-8 w-full">
                <div className="h-[500px]">
                    <div className="mb-7">
                        <h1 className="gg text-3xl mb-1">Welcome</h1>
                        <span className="text-white/35 gg">Sign in to your account or create a account</span>
                    </div>
                    <div className="mb-5 flex flex-col gap-4">
                        <button className="w-full py-3 bg-[#3e3e45] text-white rounded-lg  border-white/35 gg">Continue with Discord</button>
                        <button className="w-full py-3 bg-[#3e3e45] text-white rounded-lg  border-white/35 gg">Continue with Twitter</button>
                    </div>
                    <div id="divider">
                        or
                    </div>
                    {/* form */}
                    <div className="w-full flex flex-col gap-2">
                        <div className="flex flex-col gap-2">
                            <span>username</span>
                            <input id="user_box" placeholder="coolman132" className={usernameClass} onChange={e => checkUsername(e.target.value)}></input>

                        </div>

                        <div className="flex flex-col gap-2">
                            <span>password</span>
                            <input placeholder="********" className={passwordClass} onChange={e => checkPassword(e.target.value)}></input>

                        </div>
                    </div>

                    { /* Sign in: button */ }
                    <div className="mt-2">
                    <button className="w-full py-3 bg-[#3e3e45] text-white rounded-lg  border-white/35 gg" onClick={() => Mongodb_login()}>create account</button>

                    </div>

                </div>

            </div>
            

        </div>
        </>
    )
}