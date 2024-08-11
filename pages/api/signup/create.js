import { randomBytes } from 'crypto';
import { MongoClient } from 'mongodb';

export default async function handler(req, res) {
    const uri = 'mongodb+srv://youcantgetmeloser:1KKMR8aOm58tg3AK@data.qkt9hfx.mongodb.net/?retryWrites=true&w=majority&appName=DATA';
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    const { username, password } = req.body;

    try {
        await client.connect();

        // Database connect
        const db = client.db('voidbox');
        const collection = db.collection('users');

        let token;
        let find_token;

        // Generate a unique token
        do {
            token = randomBytes(64).toString('hex');
            find_token = await collection.findOne({ token });
        } while (find_token);

        const result = await collection.insertOne({
            alias: username,
            key: password,
            token: token,
            profile_picture: null,
            nsfw: false
        });

        console.log(`New listing created with the following id: ${result.insertedId}`);
        res.status(200).json({ token: token });
    } catch (err) {
        console.error('Error connecting to MongoDB or inserting document:', err);
        res.status(500).json({ message: 'Error connecting to MongoDB or inserting document' });
    } finally {
        await client.close();
    }
}