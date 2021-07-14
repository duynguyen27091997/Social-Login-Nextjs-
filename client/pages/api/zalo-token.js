import axios from "axios";

export default async function handler(req, res) {
    axios.get(`${process.env.NEXT_PUBLIC_ZALO_TOKEN_URL + req.query.code}`)
        .then(response => {
            res.json(response.data)
        }).catch(err => {
        res.status(401)
    })
}