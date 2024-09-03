import axios from "axios";

import { Api, BASE_URL } from "./Middleware";
import {
  ForgetFields,
  SiginFields,
  ResetPassword as ResetPasswordType,
} from "@/types/type";

// auth

export const onLogin = function (body: SiginFields) {
  return Api.post("/admin/auth/login", body);
};

export const logout = function (body: {
  refreshToken: string;
  fcmToken?: string;
}) {
  return Api.post("/admin/auth/logout", body);
};

export const forgetPassword = function (body: ForgetFields) {
  return Api.post("/admin/auth/forget-password", body);
};

export const resetPassword = function (
  body: ResetPasswordType,
  token: string | null
) {
  return axios.post(BASE_URL + "/admin/auth/reset-password", body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const changePassword = function (body: ResetPasswordType) {
  return Api.post("/admin/auth/reset-password", body);
};

export const getStats = function () {
  return Api.get("/admin/stats");
};

export const getUsers = function (
  page: number = 1,
  limit: number = 10,
  email?: string
) {
  return Api.get(`/admin/user?page=${page}&limit=${limit}&email=${email || ""}`);
};

export const getSubadmin = function (
  page: number = 1,
  limit: number = 10,
  email?: string
) {
  return Api.get(`/admin/sub-admin?page=${page}&limit=${limit}&email=${email}`);
};

export const onAddSubAdmin = function (body: any) {
  return Api.post("/admin/sub-admin/create", body);
};

export const getGuidline = function (type: number) {
  return Api.get(`/admin/guideline?type=${type}`);
};

export const addGuidline = function (body: any) {
  return Api.post("/admin/guideline/create", body);
};

export const updateGuidline = function (id: string, body: any) {
  return Api.patch(`/admin/guideline/update/${id}`, body);
};

export const getNotification = function (page: number = 1, limit: number = 10) {
  return Api.get(`/admin/notification?page=${page}&limit=${limit}`);
};

export const sendNotification = function (body: any) {
  return Api.post("/admin/notification/send", body);
};

export const sendMedia = async (media: any) => {
  let formData = new FormData();
  formData.append("media", media);
  return Api.post("/admin/media/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getServices = function (
  page: number = 1,
  limit: number = 10,
  type?: string
) {
  return Api.get(`/admin/service?page=${page}&limit=${limit}&type=${type}`);
};

export const getService = function (id: string) {
  return Api.get(`/admin/service/show/${id}`);
};

export const addService = function (body: any) {
  return Api.post("/admin/service/create", body);
};

export const deleteService = function (id: string) {
  return Api.delete(`/admin/service/delete/${id}`);
};
