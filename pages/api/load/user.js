import { MongoClient } from 'mongodb';

export default async function handler(req, res) {
    const { token } = req.body;
    const uri =
        'mongodb+srv://youcantgetmeloser:1KKMR8aOm58tg3AK@data.qkt9hfx.mongodb.net/?retryWrites=true&w=majority&appName=DATA';

    const client = new MongoClient(uri); // Increased timeout to 10 seconds

    try {
        await client.connect();

        const database = client.db('voidbox');
        const collection = database.collection('users');

        const find_token = await collection.findOne({ token: token });

        if (!find_token) {
            return res.status(400).json({ error: 'Token not found' });
        }

        res.status(200).json({ user: find_token });

    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ message: 'Error fetching user' });
    } finally {
        await client.close(); // Ensure the client is closed after the operation
    }
}