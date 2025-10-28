export default async function handler(req, res) {
    const apiKey = process.env.API_KEY;

    if (!apiKey) {
        return res.status(500).json({ error: 'API key is not set in environment variables.' });
    }

    // Example of processing the request
    if (req.method === 'GET') {
        // Handle GET request
        res.status(200).json({ message: 'Hello from the serverless function!', apiKey });
    } else {
        // Handle other request methods
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}