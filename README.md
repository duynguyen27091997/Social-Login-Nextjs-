<!-- PROJECT LOGO -->
<br />
<div align="center">

<h3 align="center">Social Login</h3>

  <p align="center">
    <a href="https://github.com/duynguyen27091997/Social-Login-Nextjs-"><strong>Explore the demo code »</strong></a>
    <br />
    <br />
  </p>

</div>

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Services List</summary>
  <ol>
    <li><a href="#facebook">Facebook</a></li>
    <li><a href="#google">Google</a></li>
    <li><a href="#zalo">Zalo</a></li>
  </ol>
</details>

##### * This documentation may not absolutely correct with the lasted version of these services. Please check online documentation of each service if you got something wrong.
[comment]: <> (facebook)
### Facebook
> More information please access this page https://developers.facebook.com/docs/graph-api/overview
#### 1. Configuration

- Create new application from [here](https://developers.facebook.com/apps/2906936386188178/fb-login/quickstart/) and get your `app-id`
- Add your domain url so Facebook can check the authentication of your app
- Add script config to your webpage and replace with your `app-id` which your received when creating your app

```js
<script>
window.fbAsyncInit = function() {
FB.init({
    appId      : '{your-app-id}',
    cookie     : true,
    xfbml      : true,
    version    : '{api-version}'
});

FB.AppEvents.logPageView();

};

    (function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
</script>
```

#### 2. Login

- Call login function  
  You will receive `accessToken` from `response.authResponse`, use this token to send back your server to check user profile or do something else

```js
await window.FB.login(async (response) => {
            // handle the response
            const {authResponse} = response;
            if (!authResponse) return;

            await this.apiAuthenticate(authResponse.accessToken);
        }, {scope: 'email'})
```

- From your server (with `token` is sent from client )
```sh
curl -i -X GET \ "https://graph.facebook.com/v11.0/me?access_token={token}&fields=id,name,birthday,email,picture.width(64).height(64)"
```
Validate or create profile for user (if not exists) and send back user info to client

#### 3. Save login
- Facebook is automotive of set 'cookie' for save login
- When page load , get accessToken and send to server to check user profile (**step 2**)
```js
 window.FB.getLoginStatus(({authResponse}) => {
                if (authResponse) {
                    return authResponse.accessToken
                } else {
                    resolve();
                }
            });
```

#### 4. Logout

```js
window.FB.logout()
```
### Google
> More information please access this page https://developers.google.com/identity/sign-in/web/sign-in
#### 1. Configuration

- Create credentials page from https://console.cloud.google.com/home/dashboard
- Add your domain url so Google can check the authentication of your app
- Add script
```html
<script src="https://apis.google.com/js/platform.js" async defer></script>
```
- You will get `google-signin-client_id` from new page you just created
- Add meta tags
```html
<meta name="google-signin-client_id" content="YOUR_CLIENT_ID.apps.googleusercontent.com">
```

#### 2. Login
- Add button login (1)
```html
<div class="g-signin2" data-onsuccess="onSignIn"></div>

<script>
    function onSignIn(googleUser) {
        var profile = googleUser.getBasicProfile();
        console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
    }
</script>
```
- Or you can create your own login (2)

    1. Create function login and send `token` to your server
    ```js
    let authInstance = window.gapi.auth2.getAuthInstance()
    let token = authInstance.signIn({scope: 'profile email'}).then(()=> googleUser.getAuthResponse().id_token)
    //send token to server
    ```

    2. From your server (with `token` is sent from client )
    ```sh
    curl -i -X GET \ "https://oauth2.googleapis.com/tokeninfo?id_token={token}"
    ```
  Validate or create profile for user (if not exists) and send back user info to client

#### 3. Save login

- Google is automotive of set 'cookie' for save login
- When page load , get accessToken and send to server to check user profile (**step 2**)
```js
authInstance.then(function () {  // onInit
    if (authInstance.isSignedIn.get()) {
        let googleUser = authInstance.currentUser.get();
        let token = googleUser.getAuthResponse().id_token;
        // You get a access token
    }
})
```
#### 4. Logout

```js
authInstance.signOut().then( () => {
    console.log('User signed out.');
});
```


### Zalo
> More information please access this page https://developers.zalo.me/docs/api/social-api/tham-khao/user-access-token-post-4316
#### 1. Configuration
- Create new application from https://developers.zalo.me/createapp
- Add your domain url so Zalo can check the authentication of your app
- You will get `app_id` and `app_secret` from new application you just created

#### 2. Login

- Login and request access

```sh
curl -i -X GET \ "https://oauth.zaloapp.com/v3/permission?app_id={1}&redirect_uri={2}&state={3}"
 
```

| Tham số |	Ý nghĩa |
| ----------- | ----------- |
| app_id |	ID được cấp cho ứng dụng |
| redirect_uri |	Callback URL đăng kí ở phần quản lý ứng dụng. |
| state |	Là 1 chuỗi string được truyền từ phía ứng dụng ,được giữ nguyên và gửi trả trong callback URL |

You will receive `code` from response (save this `code` to local for reuse)

- User `code` to get accessToken ( Require to this from server to protect your `app_secret` )

```shell
curl -i -X get \ "https://oauth.zaloapp.com/v3/access_token?app_id={1}&app_secret={2}&code={3}"
```

- Get user info
```shell
curl -i -X get \ "https://graph.zalo.me/v2.0/me?access_token=<User_Access_Token>&fields=id,birthday,name,gender,picture"
```

#### 3. Save login
- Check `cookie` you have been set and send 'code' to get accessToken

####4. Logout
- Remove `cookie` you have been set

