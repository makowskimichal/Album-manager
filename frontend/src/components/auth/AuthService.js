import axios from 'axios';

export const login = (email, password) => {
    return axios
        .post(`http://localhost:4000/api/users/login`, {
            email,
            password,
        })
        .then((res) => {
            const user = Object.assign(new User(), res.data);
            localStorage.setItem('user', JSON.stringify(user));
            return user;
        });
};

export const register = (username, password, email) => {
    return axios
        .post(`http://localhost:4000/api/users/register`, {
            username,
            password,
            email,
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
    constructor(userId, username, email) {
        this.username = username;
        this.email = email;
        this.userId = userId;
    }
}