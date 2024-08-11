
import react, { useState, useEffect } from 'react';

//ANIMATIONS

import Image from "next/image";
import { motion } from "framer-motion";
import User from '../pages/user/[id]';
import { BooleanLiteral } from 'typescript';


type UserNav = {
  alias: string;
  pfp: string;
  nsfw: boolean;
};

export default function Navbar() {
  const [dropdown, setDropdown] = useState(false);

  //User login vars
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);

  //sets token
  const [token, setToken] = useState(null);

  // search box
  const [inbox, Setinbox] = useState(false);

  //search 
  const [search, setSearch] = useState<UserNav[]>([]);

  useEffect(() => {
    // Fetch user data
    const get_token = localStorage.getItem("token");
    setToken(get_token);

    if (get_token) {
        fetch("/api/load/user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                token: get_token,
            }),
        })
        .then((res) => res.json())
        .then((data) => {
            setUser(data.user.alias);
           
        });
    }
}, []);

const inputFunction = (e: string) => {
  Setinbox(true);
  console.log(e);
  fetch(`/api/fetch/all?search=${encodeURIComponent(e)}`, {
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      const users: UserNav[] = data.map((user: any) => ({
        alias: user.alias,
        pfp: user.pfp,
        nsfw: user.nsfw,
      }));
      setSearch(users);
      console.log("found", users);
    })
    .catch((error) => {
      console.error('Error fetching users:', error);
    });
};






  return (
    <>
      <div className="flex p-2 items-center justify-between bg-[#0e0e0e] bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-50 px-10 sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <Image src="/cube.png" width={50} height={50} alt=""/>
          <h1 className="text-2xl text-white font-bold gg">voidbox</h1>
        </div>
        <div className="w-[30%]">
          <div className="relative flex items-center h-full">
          <form className="absolute inset-y-0 left-0 flex items-center pl-2 border-r border-r-white/60">
            <select  className="bg-transparent border-none text-gray-500 focus:outline-none">
              <option>users</option>
              <option>posts</option>
            </select>
          </form>

          <div className="w-full">
            <input className="w-full h-[40px] pl-[75px] rounded-md px-2 bg-[#27272a] text-white focus:outline-none focus:border" placeholder="search..." onChange={(e) => inputFunction(e.target.value)}></input>
            {inbox ? (<>
            <div className="absolute w-full bg-black border p-1 rounded-md">
              {/* Header */}
              <h1 className="gg font-bold">Users </h1>
              <div>
                <div>
                {search.map((user, index) => {
                  return (
                    <div key={index} className="border-b border-dashed p-1  ">
                      <div className="flex items-center gap-2 hover:bg-white/45  p-2 rounded-md justify-between">
                        <div className="flex items-center gap-2">
                        <Image src={user.pfp} width={50} height={50} className="rounded-full w-[30px] h-[30px] lg:w-[40px] lg:h-[40px]" alt="" />
                        <span className="lg:text-[15px] md:text-[10px]">{user.alias}</span>
                        </div>
                        {/*Badges*/}
                        <div className="flex items-center gap-2">
                        {user.nsfw ? <div className="italic  border-pink-600 border rounded-md p-1 text-[3px] lg:text-[10px] md:text-[7px] text-pink-600">NSFW</div> : null}
                        {user.nsfw ? <div className="italic border-blue-600 border rounded-md p-1 text-[3px] lg:text-[10px] md:text-[7px] text-blue-600"> VERIFIED</div> : null}
                        </div>
                      </div>
                    </div>
                  );
                })}
                </div>
                {/* just a dupelicate */}
                
              </div>

            </div>
                     </>) : null}
          </div>
          </div>
        </div>
        <div className="gap-5 flex karla text-[16px]">
          <button>home</button>
          <button>upload</button>
          <div onClick={() => setDropdown(prevState => !prevState)}>
            <div className="relative">
              <img src="https://placehold.co/40" className='rounded-full' />
              <div className={dropdown ? "absolute z-50 p-2 gg next-shadow bg-[#161616] right-0 w-[200px]" : "hidden"}>
                <div>
                  <div className="flex items-center gap-2 border-b pb-2">
                    <Image width={40} height={40} src="https://placehold.co/40" className='rounded-full' alt='' />                              
                    <span>{user}</span>
                  </div>
                  <div className="pt-2 gap-1">
                    <div className="hover:bg-white/25 p-1 rounded-md w-full">
                      <button className="px-1 karla">profile</button>
                    </div>
                    <div className="hover:bg-white/25 p-1 rounded-md w-full">
                      <button className="px-1 karla">settings</button>
                    </div>
                    <div className="hover:bg-white/25 p-1 rounded-md w-full mb-[5px]">
                      <button className="px-1 karla">logout</button>
                    </div>
                    <div className="border-t">       
                      <div className="hover:bg-white/25 p-1 w-full rounded-md mt-[5px]">
                        <button className="px-1 karla">updates</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
