import { useRouter } from 'next/router';
import react, { useEffect, useState } from 'react';
import Head from 'next/head';

import Image from 'next/image';
//socials
import Twit from '../../public/socials/twitter';
import Youtube from '../../public/socials/youtube';
import Pat from '../../public/socials/patreon';

type mongodb = {
    alias: string;
    imageKeys: string[];
};

export async function getServerSideProps(context: any) {
    const { id } = context.query;
    const response = await fetch('http://localhost:3000/api/data/user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
    });
    const data: mongodb = await response.json();
    return {
        props: {
            data,
        },
    };
    
}
export default function User({ data }: { data: mongodb }) {
    const router = useRouter();
    const { id } = router.query;

    // user data

    //mongo keys
    const bucketName = 'voidbox';
    const region = 'us-east-1';

    // const chunkArray = (array: string[], size: number) => {
    //     const chunckedArray = [];
    //     for (let i = 0; i < array.length; i += size) {
    //         chunckedArray.push(array.slice(i, i + size));
    //     }
    //     return chunckedArray;
    // }

    return (
        <>
        <Head>
            <meta property="og:title" content="voidbox/user" />
            <meta property="og:description" content="test" />
            <meta property="og:image" content="https://cdn.discordapp.com/attachments/1059715887806021662/1264028882084958269/Even_Student_Council_Gif.gif?ex=66b4c5e2&is=66b37462&hm=6d8fc1b3ddaf5a712af9ef2809ed42b6a7f63e53263a2680cdbe44a0e90d5ff8&" />
        </Head>
        <div className="p-2 flex justify-center">
            { /* Header: banner */ }
            <div className="flex justify-center flex-col ">
                <div className="w-[1000px] h-[200px] ">
                <Image src="https://cdn.discordapp.com/attachments/1059715887806021662/1264028882084958269/Even_Student_Council_Gif.gif?ex=66b4c5e2&is=66b37462&hm=6d8fc1b3ddaf5a712af9ef2809ed42b6a7f63e53263a2680cdbe44a0e90d5ff8&" alt="Banner" width={1000} height={200} className="object-cover w-full h-full"/>
                </div>
                { /* Body: user details */ }
                <div className="mt-5 flex gap-2 bg-black p-3 rounded-md border border-white/20">
                   <Image src="https://placehold.co/200" alt="User" width={100} height={100} className="rounded-md"/>
                   <h1 className="text-2xl font-bold">{ data.alias }</h1>
                   <Image src="/sad.png" alt='dsa' width={100} height={100}></Image>
                </div>
                { /* Body: user details */ }
                <div className="flex gap-2 ">
                    <div className="mt-5 bg-black w-[40%] text-[#aaaaaa] p-2 rounded-md h-fit next-shadow border border-white/20">
                        <h1 className="font-bold">About</h1>
                        <p>Some details about the user</p>
                        <div className="mt-5">
                            <h1 className="font-bold">Platforms</h1>
                            <div className="flex gap-2 mt-2 p-1 bg-[#171717] w-fit rounded-md border border-white/20">
                                <Twit width={30} height={30}/>
                                <Youtube width={30} height={30}/>
                                <Pat width={30} height={30}/>
                            </div>
                        </div>
                    </div>

                    { /* Footer: user posts */ }

                    <div className="bg-black w-[60%] text-[#aaaaaa] p-2 mt-5 rounded-md h-[850px] overflow-scroll border border-white/20">
                        <h1 className="text-2xl font-bold">Posts</h1>
                        {/* <div className="flex flex-wrap gap-4">
                            {chunkArray(userData?.imageKeys || [], 4).map((chunk, index) => (
                                <div key={index} className="grid grid-cols-1 xl:grid-cols-2 gap-0.5 px-4 py-5  w-fit">
                                    {chunk.map((imageKey) => (
                                        <Image key={imageKey} src={`https://${bucketName}.s3.${region}.amazonaws.com/${imageKey}`} alt="User Post" width={100} height={100} className=" w-[100px] h-[100px] bg-gray-300 rounded-xl" />
                                    ))}
                                </div>

                            ))}

                        </div> */}
                         <div className="grid grid-cols-1 xl:grid-cols-2 gap-0.5 px-4 py-5  w-fit">
                            {data?.imageKeys.map((imageKey) => (
                                <Image key={imageKey} src={`https://${bucketName}.s3.${region}.amazonaws.com/${imageKey}`} alt="User Post" width={100} height={100} className=" w-[100px] h-[100px] bg-gray-300 rounded-xl" />
                            ))}
                        </div> 

                    </div>

                </div>
            </div>
        </div>
        </>
    );
}