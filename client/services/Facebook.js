import axios from "axios";
import ServiceInterface from "./ServiceInterface";

class Facebook extends ServiceInterface{
    constructor() {
        super();
        this.cookieKey = 'facebook'
    }
    async login() {
        // login with facebook then authenticate with the API to get a JWT auth token

        await window.FB.login(async (response) => {
            // handle the response
            const {authResponse} = response;
            if (!authResponse) return;

            await this.apiAuthenticate(authResponse.accessToken);
        }, {scope: 'email'})

        super.login()
        // get return url from location state or default to home page
        // const {from} = history.location.state || {from: {pathname: "/"}};

    }

    async apiAuthenticate(accessToken) {
        // authenticate with the api using a facebook access token,
        // on success the api returns an account object with a JWT auth token
        let data = {service:'facebook',token :accessToken};
        const response = await axios.post(`/api/authenticate`, data);
        try {
            if (response.data) {
                const account = response.data;
                ServiceInterface.account.next(account);
            }
        } catch (e) {
        }
    }

    logout() {
        // revoke app permissions to logout completely because FB.logout() doesn't remove FB cookie
        super.logout()
        window.FB.logout()
        //window.FB.api('/me/permissions', 'delete', null, () => window.FB.logout());
        //history.push('/login');
    }

}

export default new Facebook()