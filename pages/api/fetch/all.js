import { MongoClient } from 'mongodb';

export default async function handler(req, res) {
    const uri = 'mongodb+srv://youcantgetmeloser:1KKMR8aOm58tg3AK@data.qkt9hfx.mongodb.net/?retryWrites=true&w=majority&appName=DATA';
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const database = client.db('voidbox');
        const collection = database.collection('users');

        const { search } = req.query;
        const filter = search ? { alias: { $regex: search, $options: 'i' } } : {};

        const users = await collection.find(filter).toArray();

        if (users.length > 0) {
            res.status(200).json(users.map(user => ({ alias: user.alias, pfp: user.pfp, nsfw: user.nsfw })));
        } else {
            res.status(404).json({ message: 'No users found' });
        }
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ message: 'Error fetching user' });
    } finally {
        await client.close();
    }
}