import AccountServices from '../services';

const facebookAppId = process.env.NEXT_PUBLIC_FACEBOOK_APP_ID;

export function initSdkLogin() {
    return new Promise(resolve => {
        // wait for facebook sdk to initialize before starting the react app
        window.fbAsyncInit = function () {
            window.FB.init({
                appId: facebookAppId,
                cookie: true,
                xfbml: true,
                version: 'v11.0'
            });

            // auto authenticate with the api if already logged in with facebook

            window.FB.getLoginStatus(({authResponse}) => {
                if (authResponse) {
                    if (AccountServices.isCurrent('facebook'))
                        AccountServices.setCurrent('facebook').apiAuthenticate(authResponse.accessToken).then(resolve);
                } else {
                    resolve();
                }
            });
        };

        const loadScript = function (d, s, id, src, attr = {}) {
            let js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) {
                return;
            }
            js = d.createElement(s);
            js.id = id;
            js.src = src;
            Object.keys(attr).map(key => {
                js.setAttribute(key, attr[key])
            })
            fjs.parentNode.insertBefore(js, fjs);
        };

        // load facebook sdk script
        loadScript(document, 'script', 'facebook-jssdk', "https://connect.facebook.net/en_US/sdk.js");

        // load google platform library
        loadScript(document, 'script', 'google-platlib', "https://apis.google.com/js/platform.js?onload=init", {
            'defer': '',
            onload: "window.gapiLoaded()"
        });
        window.gapiLoaded = () => {

            gapi.load('auth2', function () {
                gapi.auth2.init({
                    client_id: `${process.env.NEXT_PUBLIC_GOOGLE_KEY}`
                })
                if (AccountServices.isCurrent('google')) {
                    let authInstance = gapi.auth2.getAuthInstance();
                    authInstance.then(function () {  // onInit
                        if (authInstance.isSignedIn.get())
                            AccountServices.setCurrent('google').signInCallback(authInstance.currentUser.get()).then(resolve);
                    }, function () {  // onError
                    });
                }
            });
        }
        if (AccountServices.isCurrent('zalo')){
            AccountServices.setCurrent('zalo').checkLogin()
        }
    });
}