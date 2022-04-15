# HW03
comp333 hw3

software 333 hw3

## 1. Creating a Virtual Environment
Install the virtual environment, `django-react`, with:
```shell
python3 -m venv django-react
```

Activate your virtual environment with (leave out `.fish` if you are using the default shell):

```shell
source django-react/bin/activate.fish
```

## 2. Install Dependencies

### 2.1 Django
```shell
python3 -m pip install Django
python3 -m pip install djangorestframework
python3 -m pip install django-cors-headers
python3 -m pip install django-filter
python3 -m pip install django-rest-knox
```

### 2.2 React

```shell
npm install react-router-dom@6
npm install --save-dev @babel/preset-react
npm install bootstrap-icons
```

## 3. Run the app
Backend:
```shell
cd hw03-main/backend
python3 manage.py runserver
```
Frontend:
```shell
cd hw03-main/frontend
npm install
npm start
```

## 4. Using the Songrater main App

### Register or Login
In your broswer, go to <http://localhost:3000/>. If you have already created an account you can login in, otherwise click on the "Register Button". After you have registered, you should be redirected to the login page where you can login.

To check the song ratings dashboard, in your browser go to <http://localhost:3000/Dashboard>.

### create new song
If you want to add a new song, click "new song" and add information.

### update song information
Click the edit song info and change the artist or the song.

### update your rating
For songs that you have already rated, the button should say "Update". There you can update your song rating

### add your rating
If you want to add a rating of a song that someone has already rated, click "Rate" on the song. After, the button should change to "Update".

### delete song
To delete a song just click on the delete button

---------------------------------------------------------------------------------------------

If you want JUST WANT to test the backend, please check the following.

### Test APIs using Postman for user authentication
Download desktop client from Postman at <https://www.postman.com/downloads/>.

#### Registration:
To send a POST request to <http://127.0.0.1:8000/api/auth/register> via Postman, you can choose Content-Type as `key` and application/json as `value` in the `Headers`. Then in the `body`, select `raw` and include the following:
```shell
{
    "username": "jinerzheng",
    "password": "12345"
}
```
And then click on `send`. If successfully registered, you should be able to see a token generated.

#### Login:
To send a POST request to <http://127.0.0.1:8000/api/auth/login> via Postman, just do the same steps as above (put in the same username and password after you registered successfully). After you get a token, copy that for user authorization.

#### User Authorization:
Now, send a GET request to <http://127.0.0.1:8000/api/auth/user>, you need to choose Authorization as `key` and paste the token you get from log-in with 'Token ' in front of it as `Value` in the `Headers`. For example: "Token 78d2b3c0edc368eb416c0a76e55a6378df3ddb1721137ca5571d1cd69c3bcc06"

## Contributions
Tanya: Main CRUD Features (Django + React) + UI <br>
Tomoshi: Registration + helped user authentication <br>
Jiner: User Authentication
