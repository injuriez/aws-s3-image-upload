
import react, { useState, useEffect } from 'react';

//ANIMATIONS

import Image from "next/image";
import { motion } from "framer-motion";

export default function Navbar() {
  const [dropdown, setDropdown] = useState(false);

  return (
    <>
      <div className="flex p-2 items-center justify-between border-b bg-[#161616] px-10 sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <Image src="/cube.png" width={50} height={50} alt=""/>
          <h1 className="text-2xl text-white font-bold gg">voidbox</h1>
        </div>
        <div className="w-[30%]">
          <input className="w-[100%] h-[40px] rounded-md px-2 bg-[#27272a] focus:outline-none focus:border" placeholder="search..."></input>
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
                    <span>unknown user</span>
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
