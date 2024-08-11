import { createPresignedPost } from '@aws-sdk/s3-presigned-post';
import { S3Client } from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';
import { MongoClient, UpdateFilter, Document } from 'mongodb';

export async function POST(request: Request) {

  try {
    const { contentType, filename, token } = await request.json();

    // AWS S3 Client
    const client = new S3Client({ region: process.env.AWS_REGION });
    const key = `${filename}-${uuidv4()}`;
    const { url, fields } = await createPresignedPost(client, {
      Bucket: process.env.AWS_BUCKET_NAME!,
      Key: key,
      Conditions: [
        ['content-length-range', 0, 10485760], // up to 10 MB
        ['starts-with', '$Content-Type', contentType],
      ],
      Fields: {
        acl: 'public-read',
        'Content-Type': contentType,
      },
      Expires: 30, // Seconds before the presigned post expires
    });

    console.log('Generated presigned URL:', url);
    const publicUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
    await sendDiscordNotification(publicUrl);
    
    // Saves key to MongoDB
    await saveImageKeyToDatabase(token, key);

    return new Response(JSON.stringify({ url, fields }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: (error instanceof Error) ? error.message : "An unknown error occurred" }), {
      
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

async function sendDiscordNotification(publicUrl: string) {
  const embed = {
    title: 'Uploaded Image',
    color: 0xff0000,
    description: `[View Image](${publicUrl})`,
    author: {
      name: 'Unknown User',
      icon_url: "https://placehold.co/40",
    },
    timestamp: new Date().toISOString(),
    thumbnail: {
      url: publicUrl,
    }
  };

  const webhook = 'https://discord.com/api/webhooks/1266606271818236037/M3YPhf2Kg5wK27iQOD-TWCyQkJc922Jqby4RBhDRNtNRKe26VhBxfCMYEwi4_AQYgBgv';

  if (!webhook) {
    console.error('Discord webhook URL is not defined');
    return;
  }

  try {
    const response = await fetch(webhook, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ embeds: [embed] }),
    });

    if (!response.ok) {
      console.error('Error sending notification to Discord:', response.statusText);
    }
  } catch (error) {
    console.error('Failed to send notification to Discord:', error);
  }
}

interface UserDocument {
  token: string;
  imageKeys: string[];
}

async function saveImageKeyToDatabase(token: string, key: string) {
  const uri = 'mongodb+srv://youcantgetmeloser:1KKMR8aOm58tg3AK@data.qkt9hfx.mongodb.net/?retryWrites=true&w=majority&appName=DATA';
  if (!uri) {
    console.error('Database connection URI is not defined');
    return;
  }

  const client = new MongoClient(uri);

  try {
    await client.connect();
    const database = client.db('voidbox');
    const collection = database.collection<UserDocument>('users');
    const filter = { token: token };
    const update: UpdateFilter<UserDocument> = {
      $push: { imageKeys: key }
    };
    const options = { upsert: true };

    const result = await collection.updateOne(filter, update, options);

    if (result.modifiedCount > 0 || result.upsertedCount > 0) {
      console.log('Image key added successfully');
    } else {
      console.log('No document was modified or created');
    }
  } catch (error) {
    console.error('Error saving image key to database:');
  } finally {
    await client.close();
  }
}
