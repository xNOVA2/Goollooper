import axios from "axios";

import { SiginFields } from "@/types/type";

const development = "http://localhost:5000";
const dev = "http://goollooper.yameenyousuf.com/api";
const production = "http://44.202.123.121/api";

const BASE_URL = `${dev}/admin`;


// auth

export const onLogin = function (body: SiginFields) {
    return axios.post(BASE_URL + "/auth/login", body);
};