import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burger-84e6a.firebaseio.com/'
});

export default instance;