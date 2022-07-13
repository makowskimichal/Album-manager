import axios from 'axios';

export const login = async (username, password) => {
  const res = await axios.post(`http://localhost:4000/api/users/login`, {
    username,
    password
  });
  const user = Object.assign(new User(), res.data);
  localStorage.setItem('user', JSON.stringify(user));
  return user;
};

export const register = async (username, password, mail) => {
  const res = await axios.post(`http://localhost:4000/api/users/register`, {
    username,
    password,
    mail
  });
  const user = Object.assign(new User(), res.data);
  localStorage.setItem('user', JSON.stringify(user));
  return user;
};

export const getUserFromLocalStorage = () => {
  const rawUser = localStorage.getItem('user');
  if (!rawUser) return null;
  const user = Object.assign(new User(), JSON.parse(rawUser));
  return user;
};

export class User {
  constructor(userId, username, mail) {
    this.username = username;
    this.mail = mail;
    this.userId = userId;
  }
}
