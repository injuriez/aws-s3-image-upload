import React, { useRef } from 'react';
import Image from 'next/image';

// image components
import File from '../public/file.jsx';
export default function Upload() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDivClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="p-5 flex justify-center">
      <div className="p-3 border">
        { /* Upload form */ }
        <form>
          <input
            type="file"
            name="file"
            id="file"
            className="hidden"
            ref={fileInputRef}
          />
          <div className="w-[400px] h-[400px] border border-dashed flex items-center justify-center cursor-pointer  flex-col" onClick={handleDivClick}>
            <File/>
            <h1>Press here to upload</h1>
          </div>
        </form>
        <div>
         
            <div className="flex flex-col gap-1 my-5">
              <span className="gg font-bold">Title</span>
              <input placeholder="coolsandwhich"></input>
            </div>

            <div className="flex flex-col gap-1 mt-5">
              <span className="gg font-bold">Tags</span>
              <input placeholder="coolsandwhich"></input>
            </div>

            <div className="flex flex-col gap-1 mt-5">
              <span className="gg font-bold">Comments</span>
              
              <select className="text-black">
                <option >on</option>
                <option>off</option>
              </select>
            </div>

   
        </div>
      </div>
    </div>
  );
}