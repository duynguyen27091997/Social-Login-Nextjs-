import ServiceInterface from "./ServiceInterface";
import axios from "axios";

class Google extends ServiceInterface{
    constructor() {
        super();
        this.cookie = 'google'
    }
    login(){
        let auth2 = window.gapi.auth2.getAuthInstance()
        auth2.signIn({scope: 'profile email'}).then(this.signInCallback.bind(this))
        super.login()
    }

    async signInCallback(googleUser){
        let id_token = googleUser.getAuthResponse().id_token;
        let data = {service:'google',token :id_token};
        const response = await axios.post(`/api/authenticate`, data);
        try {
            if (response.data) {
                const account = response.data;
                ServiceInterface.account.next(account);
            }else{
                return new Error('Authenticate error')
            }
        } catch (e) {

        }
    }
    logout() {
        super.logout();
        let auth2 = window.gapi.auth2.getAuthInstance();
        auth2.signOut().then( () => {
            console.log('User signed out.');
        });
    }

}

export default new Google()