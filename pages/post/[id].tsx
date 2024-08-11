import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Image from 'next/image';

function Post() {
  const router = useRouter();
  const { id } = router.query;
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [date, setDate] = useState<string | null>(null);

  const bucketName = 'voidbox';
  const region = 'us-east-1';

  useEffect(() => {
    if (typeof id === 'string') {
      setImageSrc(id);
    } else {
      setImageSrc(null);
    }
  }, [id]);

  useEffect(() => {
    console.log('Bucket Name:', bucketName);
console.log('Region:', region);

    if (imageSrc) {
      fetch(`/api/image`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          setDate(data.uploaded);
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }
  }, [imageSrc]);

  const comments = Array.from({ length: 20 }, (_, i) => `Comment ${i + 1}`);

  return (
    <div className="flex justify-center p-[30px]">
      <div className="next-shadow p-5 w-[50%] rounded-md h-full">
        <div className="flex gap-2">
          {imageSrc ? (
            <img
              src={`https://${bucketName}.s3.${region}.amazonaws.com/${imageSrc}`}
              alt="image"
              className="w-[100%] rounded-md max-h-fit object-cover"
            />
          ) : (
            <p>No image available</p>
          )}
          <div className="flex flex-col justify-between p-2 w-full">
            {/* Top section */}
            <div className="flex flex-col gap-2">
              <h1 className="text-3xl font-bold karla">unknown title</h1>
              <div className="flex items-center gap-2">
                <Image src="https://placehold.co/40" width={40} height={40} className="rounded-full" alt="user" />
                <span>unknown user</span>
              </div>
            </div>

            {/* Bottom section */}
            <div className="">
              <h1 className="text-2xl font-bold karla">Comments</h1>
              <div className="next-shadow h-[250px] w-full p-2 min-h-[150px] overflow-y-scroll">
                {comments.map((comment, index) => (
                  <p key={index}>{comment}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
