import { Card, useDisclosure, CardHeader, User, Divider, CardBody, Chip } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiscord, faGithub, faTelegram, faInstagramSquare, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { useMediaQuery } from 'react-responsive';
import { motion } from "framer-motion";
import Image from 'next/image';
export default function DisplayProject({ date, title, description, image, link }: { date: number, title: string, description: string, image: string, link: string }) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div className="relative  w-fit rounded-md border-[#3c3c44]">
            <img 
                alt="image"
                className="rounded-[20px]  z-0" 
                src={image}
                height={300} 
                width={300}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            />
            <motion.div 
                initial={{ y: 0 }}
                animate={isHovered ? { y: 50 } : { y: 0 }}
                transition={{ duration: 0.1, stiffness: 80 }}
                className="absolute bottom-0 left-0 w-full"
            >
                <Card className="w-full h-[160px] rounded-b-md pt-0 bg-[#0F0F0F] border-[#3c3c44] border">
                    <CardHeader className="p-0">
                        <div className="flex items-center w-full justify-around p-0">
                            <h4 className="flex items-center border-[#3c3c44] border-b border-r w-1/2 karla">
                                <div className="flex flex-col ml-2">
                                    <h5 className="font-bold text-[13.28px]">name</h5>
                                    <p className="text-[16px]">{title}</p>
                                </div>
                            </h4>
                            <h4 className="flex items-center border-[#3c3c44] border-b w-1/2 karla">
                                <div className="flex flex-col ml-2">
                                    <h5 className="font-bold text-[13.28px]">date</h5>
                                    <p className="text-[16px] flex items-center gap-2">
                                        <span className="relative bg-[#23a05a] w-[8px] h-[8px] rounded-full z-10"></span>
                                        <span className="absolute animate-ping bg-[#23a05a] w-[8px] h-[8px] rounded-full z-10"></span>
                                        <span>{date}</span>
                                    
                                    </p>
                                </div>
                            </h4>
                        </div>
                    </CardHeader>
                    <CardBody className="flex h-full">
                        <div className="flex flex-col">
                            <h5 className="font-bold text-[13.28px] karla">description</h5>
                            <p className="text-[12px] karla">{description} {link}</p>
                        </div>
                    </CardBody>
                </Card>
            </motion.div>
        </div>
    );
}



