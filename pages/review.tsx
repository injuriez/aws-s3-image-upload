import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { GetStaticProps } from 'next';
type ImageInfo = {
  imageUrl: string;
  alias: string;
  imageKey: string;
};


const ImageGallery = () => {
  const [imageInfo, setImageInfo] = useState<ImageInfo[]>([]);
  const [loading, setLoading] = useState(false);
  const [hoveredImage, setHoveredImage] = useState<string | null>(null);

  // Report section
  const [report, setReport] = useState(false);
  const [selectedReason, setSelectedReason] = useState<string | null>(null);

  // Selected image report
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const reportReasons = [
    { id: '1', label: 'Inappropriate Content' },
    { id: '2', label: 'Spam or Misleading' },
    { id: '3', label: 'Copyright Violation' },
    { id: '4', label: 'Other' },
  ];

  useEffect(() => {
    const fetchImages = async () => {
      try {
    
        const response = await fetch('/api/get-images');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data: ImageInfo[] = await response.json();
        setImageInfo(data);
        setLoading(true);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
  }, []);

  const handleMouseEnter = (url: string) => {
    setHoveredImage(url);
  };

  const handleMouseLeave = () => {
    setHoveredImage(null);
  };

  // Report function
  const handleReport = (url: string) => {
    console.log('Report:', url);
    setReport(true);
    setSelectedImage(url);
  }

  const Report = () => {
    setReport(false);

    const embed = {
      title: 'Reported Image',
      color: 0xff0000,
      description: selectedImage,
      author: {
        name: 'Unknown User',
        icon_url: "https://placehold.co/40",
      },
      fields: [
        {
          name: 'Reason',
          value: selectedReason,
        },
      ],
      image: {
        url: selectedImage,
      },
    };

    const button = {
      type: 2,
      style: 4,
      label: 'Delete',
      custom_id: 'delete_report',
    };

    fetch('https://discord.com/api/webhooks/1266606271818236037/M3YPhf2Kg5wK27iQOD-TWCyQkJc922Jqby4RBhDRNtNRKe26VhBxfCMYEwi4_AQYgBgv', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        embeds: [embed],
        components: [
          {
            type: 1,
            components: [button],
          },
        ],
      }),
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to send Discord webhook');
      }
    })
    .catch((error) => {
      console.error('Error sending Discord webhook:', error);
    });
  };

  return (
    <>
      {report && (
        <div className="fixed inset-0 flex items-center justify-center bg-[#161616] bg-opacity-50 z-50 next-shadow">
          <div className="bg-[#161616] p-6 rounded-lg shadow-lg w-80 text-white next-shadow">
            <h2 className="text-xl mb-4">Report Content</h2>
            <p className="mb-4">Select a violation</p>
            <div className="flex justify-center mb-2">
              <img src={selectedImage} width={100} height={100} alt="Selected" />
            </div>
            <div>
              {reportReasons.map((reason) => (
                <label key={reason.id} className="block mb-2">
                  <input
                    type="radio"
                    name="reason"
                    value={reason.label}
                    onChange={(e) => setSelectedReason(e.target.value)}
                  />
                  <span className="ml-2">{reason.label}</span>
                </label>
              ))}
            </div>
            <div>
              <button className="bg-red-500 text-white px-4 py-2 rounded mr-2" onClick={() => Report()}>Confirm</button>
              <button className="bg-gray-300 px-4 py-2 rounded" onClick={() => setReport(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
      <div className="p-5 columns-1 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-4">
        {imageInfo.map(({ imageUrl, alias, imageKey }) => (
          <div 
            key={imageKey} 
            className="mb-4 break-inside-avoid-column relative"
            onMouseEnter={() => handleMouseEnter(imageUrl)}
            onMouseLeave={handleMouseLeave}
          >
            <Link href={`/post/${encodeURIComponent(imageKey)}`}>
              <img
                src={imageUrl}
                alt="image"
                className={`w-full  rounded-md max-h-fit object-cover ${hoveredImage === imageUrl ? 'opacity-50' : ''}`}
                width={50}
                height={50}
                onLoad={(e) => e.currentTarget.classList.remove('skeleton')}
                onError={(e) => e.currentTarget.classList.add('skeleton')}
              />
            </Link>
            {loading ? null : <div className="bg-white absolute top-0 left-0 w-full h-full z-10 rounded-md skeleton"></div>}
            {hoveredImage === imageUrl && (
              <motion.div
                initial={{ y: -10 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute top-0 left-0 w-full z-20 bg-[#161616] p-2 flex items-center"
              >
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-2 hover:underline">
                    <img width={30} height={30} src="https://placehold.co/40" className='rounded-full' alt='User Avatar' />
                    <Link href={`/user/${alias}`}><button className="text-white karla">{alias || "Unknown User"}</button></Link>
                  </div>
                  <div className="flex gap-2">
                    <button className="text-white karla border rounded-md px-3">Save</button>
                    <button 
                      className="text-white karla border rounded-md px-3" 
                      onClick={() => handleReport(imageUrl)}
                    >
                      Report
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default ImageGallery;
