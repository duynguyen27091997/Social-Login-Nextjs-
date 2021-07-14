import axios from "axios";

export default async function handler(req, res) {
    if (req.method === 'POST') {
        // Process a POST request
        const response = await axios.post(process.env.NEXT_PUBLIC_BACKEND_URL+'/accounts/authenticate',req.body)
        res.status(200).json(response.data)
    } else {
        // Handle any other HTTP method
    }
}