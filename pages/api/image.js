import AWS from 'aws-sdk';

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
});

const s3 = new AWS.S3();

export default async function handler(req, res) {
    const { id } = req.body;
    const bucket_Name = "voidbox";
    console.log('id:', id);

    if (!id) {
        return res.status(400).json({ error: 'Image ID is required' });
    }




    // starts function to get image from s3
    try {
        const params = {
            Bucket: bucket_Name,
            Key: id,
        };
        const data = await s3.getObject(params).promise();

        //format the date to be more readable
        const lastModified = new Date(data.LastModified);
        const formate_date = data.LastModified = lastModified.toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
        }
    );


        res.status(200).json({ uploaded: formate_date});
    } catch (error) {
        console.error('Error fetching image:', error);
        res.status(500).json({ message: 'Error fetching image' });
    }
}