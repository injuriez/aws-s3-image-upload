import { S3Client, ListObjectsCommand } from "@aws-sdk/client-s3";
import { MongoClient } from "mongodb";

export default async function handler(req, res) {
  if (!process.env.BUCKET_NAME || !process.env.AWS_REGION || !process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY || !process.env.MONGODB_URI) {
    console.error('One or more environment variables are not defined.');
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

    if (!Contents || Contents.length === 0) {
      return res.status(200).json({ images: [], image_Key: [] });
    }

    const keys = Contents.map((file) => file.Key);

    // MongoDB connection
    const mongoUri = process.env.MONGODB_URI;
    const client = new MongoClient(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      tls: true,
      tlsAllowInvalidCertificates: false, // Set to false for production
    });

    await client.connect();
    const database = client.db('voidbox');
    const usersCollection = database.collection('users');

    // Fetch user aliases based on image keys
    const imageData = await Promise.all(keys.map(async (key) => {
      const user = await usersCollection.findOne({ imageKeys: key });
      if (user) {
        return {
          imageUrl: `https://${process.env.BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`,
          alias: user.alias,
          imageKey: key,
        };
      }
      return null; // Return null for images without an associated alias
    }));

    await client.close();

    // Filter out images without associated aliases
    const filteredImageData = imageData.filter(item => item !== null);

    res.status(200).json(filteredImageData);
  } catch (error) {
    console.error('Error fetching images:', error);
    res.status(500).json({ message: 'Error fetching images' });
  }
}