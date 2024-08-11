import { MongoClient } from "mongodb";
import { userInfo } from "os";



export default async function handler(req, res) {
    const { id } = req.body;
    const uri = 'mongodb+srv://youcantgetmeloser:1KKMR8aOm58tg3AK@data.qkt9hfx.mongodb.net/?retryWrites=true&w=majority&appName=DATA';
    const client = new MongoClient(uri);

    try {
        console.log('Fetching user with id:', id);
        await client.connect();

        // Get database
        const database = client.db('voidbox');
        const collection = database.collection('users');
        //-------------------
        

        // Find user
        const user = await collection.findOne({ alias: id });
        if (!user) {
            res.status(404).json({ error: 'User not found' });
            return;
        }
        //-------------------

        // Return user
        res.status(200).json(user);
        //-------------------

    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ message: 'Error fetching user' });
    } finally {
        await client.close();
    }

}