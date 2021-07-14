import ServiceInterface from "./ServiceInterface";
import axios from "axios";
import cookieCutter from 'cookie-cutter';

class Zalo extends ServiceInterface {
    constructor() {
        super();
        this.cookieKey= 'zalo'
    }

    login() {
        window.location.href = `${process.env.NEXT_PUBLIC_ZALO_URL}/permission?app_id=${process.env.NEXT_PUBLIC_ZALO_APPID}&redirect_uri=https://myapp.io/auth/zalo`
    }

    authenticate(code) {
        this.apiAuthenticate(code).then(()=>{
            let expiryDate = new Date();
            expiryDate.setMonth(expiryDate.getMonth() + 2);
            cookieCutter.set(this.cookieKey,code,{ expires: expiryDate, path:'/' })
            super.login()
        })

    }

    async checkLogin(){
        let code = cookieCutter.get(this.cookieKey);
        if (code)
            await this.apiAuthenticate(code)
    }

    async apiAuthenticate(code) {
        return axios.get(`/api/zalo-token?code=${code}`)
            .then(response => {
                return response.data.access_token
            })
            .then(async token => {
                let data = {service: 'zalo', token};
                const response = await axios.post(`/api/authenticate`, data);
                try {
                    if (response.data) {
                        const account = response.data;
                        ServiceInterface.account.next(account);
                    } else {
                        return new Error('Authenticate error')
                    }
                } catch (e) {

                }
            })
    }

    logout() {
        cookieCutter.set(this.cookieKey,'',{ expires: new Date(0), path:'/'  })
        super.logout()
    }
}

export default new Zalo()