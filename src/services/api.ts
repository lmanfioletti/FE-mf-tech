import axios from "axios";

export const api = axios.create({
    baseURL: "https://mftech-test-default-rtdb.firebaseio.com"
});