import { createPresignedPost } from '@aws-sdk/s3-presigned-post'
import { S3Client } from '@aws-sdk/client-s3'
import { v4 as uuidv4 } from 'uuid'

export async function POST(request: Request) {
  const { contentType, filename, user } = await request.json()

  try {
    const client = new S3Client({ region: process.env.AWS_REGION })
    const key = `${filename}-${uuidv4()}`
    const { url, fields } = await createPresignedPost(client, {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: key,
      Conditions: [
        ['content-length-range', 0, 10485760], // up to 10 MB
        ['starts-with', '$Content-Type', contentType],
      ],
      Fields: {
        acl: 'public-read',
        'Content-Type': contentType,
      },
      Expires: 600, // Seconds before the presigned post expires
    })

    console.log('Generated presigned URL:', url)
    const publicUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`
    await sendDiscordNotification(publicUrl)

    return new Response(JSON.stringify({ url, fields }), {
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: (error instanceof Error) ? error.message : "An unknown error occurred" }), {
      headers: { 'Content-Type': 'application/json' },
    })
  }
}

async function sendDiscordNotification(publicUrl: string) {
  const embed = {
    title: 'Uploaded Image',
    color: 0xff0000,
    description: `[View Image](${publicUrl})`, // Embed the URL properly
    author: {
      name: 'Unknown User',
      icon_url: "https://placehold.co/40", // Placeholder or use selectedImage if needed
    },
    timestamp: new Date().toISOString(),
    thumbnail: {
      url: publicUrl,
    }
  }

  const webhook = "https://discord.com/api/webhooks/1266606271818236037/M3YPhf2Kg5wK27iQOD-TWCyQkJc922Jqby4RBhDRNtNRKe26VhBxfCMYEwi4_AQYgBgv"

  try {
    const response = await fetch(webhook, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        embeds: [embed],
      }),
    })

    if (!response.ok) {
      console.error('Error sending notification to Discord:', response.statusText)
    }
  } catch (error) {
    console.error('Failed to send notification to Discord:', error)
  }
}
