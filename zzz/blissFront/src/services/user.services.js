import env from "react-dotenv";
import axios from 'axios';

const API_BASE_ADDRESS = env.API_URL;

export default class UserServices {
    static getUsers() {
        /*return fetch(uri, {method: 'GET'});*/
        return axios.get(API_BASE_ADDRESS + "?action=users");
    }
}