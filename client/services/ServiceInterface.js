import accountSubject from "./account.service";
import cookieCutter from 'cookie-cutter';

class ServiceInterface{
    static account = accountSubject;
    static typeAccount = 'services-login';
    constructor() {
        this.cookieKey = ''
    }

    login(){
        // login
        this.setCookieAccount()
    }
    setCookieAccount(){
        if (this.cookieKey){
            let expiryDate = new Date();
            expiryDate.setMonth(expiryDate.getMonth() + 2);
            cookieCutter.set(ServiceInterface.typeAccount,this.cookieKey,{ expires: expiryDate, path:'/' })
        }
        else
            console.error('cookieKey was not set ')
    }
    removeCookieAccount(){
        cookieCutter.set(ServiceInterface.typeAccount,'',{ expires: new Date(0), path:'/'  })
    }
    logout(){
        // logout
        ServiceInterface.account.next(null);
        this.removeCookieAccount()
    }
}

export default ServiceInterface