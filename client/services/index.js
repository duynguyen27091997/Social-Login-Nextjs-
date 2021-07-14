import accountSubject from "./account.service";
import cookieCutter from 'cookie-cutter';
import Facebook from "./Facebook";
import Google from "./Google";
import Zalo from "./Zalo";
import ServiceInterface from "./ServiceInterface";

class AccountServices {
    constructor() {
        this.account = accountSubject.asObservable();
        this.current = null
    }
    login(serviceName){
        this.setCurrent(serviceName);
        this.current.login()
    }
    setCurrent(serviceName){
        switch (serviceName){
            case 'facebook':
                this.current = Facebook
                break;
            case 'google':
                this.current = Google
                break;
            case 'zalo':
                this.current = Zalo
                break;
            default:
                throw new Error('Service not found !')
        }
        return this.current
    }
    isCurrent(serviceName){
        return serviceName === this.getCookie();
    }
    getCookie(){
        return cookieCutter.get(ServiceInterface.typeAccount)
    }
    logout(){
        this.current.logout()
        this.current = null
    }

    get accountValue(){
        return accountSubject.value
    }

}

export default new AccountServices()