import axios from 'axios';

export const login = (username, password) => {
    return axios
        .post(`http://localhost:4000/api/users/login`, {
            username,
            password,
        })
        .then((res) => {
            const user = Object.assign(new User(), res.data);
            localStorage.setItem('user', JSON.stringify(user));
            return user;
        });
};

export const register = (username, password, mail) => {
    return axios
        .post(`http://localhost:4000/api/users/register`, {
            username,
            password,
            mail,
        })
        .then((res) => {
            const user = Object.assign(new User(), res.data);
            localStorage.setItem('user', JSON.stringify(user));
            return user;
        });
};

export const getUserFromLocalStorage = () => {
    const rawUser = localStorage.getItem('user');
    if (!rawUser) return null;
    const user = Object.assign(new User(), JSON.parse(rawUser));
    console.log('logged in user', user);
    return user;
};

export class User {
    constructor(userId, username, mail) {
        this.username = username;
        this.mail = mail;
        this.userId = userId;
    }
}