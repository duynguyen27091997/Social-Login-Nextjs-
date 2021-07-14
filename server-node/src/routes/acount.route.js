import { Router } from 'express';
import axios from "axios";
const authRouter = Router();

authRouter.post('/authenticate',function (req,res){
    const { service,token } = req.body;
    switch (service){
        case 'facebook':
            return axios.get(`${process.env.FB_AUTH_URL + token+'&fields=id,name,birthday,email,picture.width(64).height(64)'}`)
                .then(response => {
                    // check exists in profile database or do something
                    response.data.picture = response.data.picture.data.url
                    res.json(response.data)
                })
                .catch(err =>{
                    return res.status(401)
                })
        case 'google':
            return axios.get(`${process.env.GG_AUTH_URL+token}`)
                .then(response => {
                    // check exists in profile database or do something
                    res.json(response.data)
                }).catch(err =>{
                    return res.status(401)
                })
        case 'zalo':
            return axios.get(`${process.env.ZALO_AUTH_URL+token}&fields=id,birthday,name,gender,picture`)
                .then(response => {
                    // check exists in profile database or do something
                    response.data.picture = response.data.picture.data.url
                    res.json(response.data)
                }).catch(err =>{
                    return res.status(401)
                })
        default:
            return res.status(401)

    }
})

export default authRouter