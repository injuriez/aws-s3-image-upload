// pages/api/get-images.js
import { S3Client, ListObjectsCommand } from "@aws-sdk/client-s3";

export default async function handler(req, res) {
  // Ensure the BUCKET_NAME is defined
  if (!process.env.BUCKET_NAME) {
    console.error('BUCKET_NAME environment variable is not defined.');
    return res.status(500).json({ message: 'Server configuration error.' });
  }

  const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
  });

  try {
    const command = new ListObjectsCommand({ Bucket: process.env.BUCKET_NAME });
    const { Contents } = await s3.send(command);
    const imageUrls = Contents.map((file) =>
      `https://${process.env.BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${file.Key}`
    );
    res.status(200).json(imageUrls);
  } catch (error) {
    console.error('Error fetching images:', error);
    res.status(500).json({ message: 'Error fetching images' });
  }
}