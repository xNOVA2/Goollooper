import { Api } from "./Middleware";
import { SiginFields } from "@/types/type";

// auth

export const onLogin = function (body: SiginFields) {
  return Api.post("/auth/login", body);
};

export const getStats = function () {
  return Api.get("/stats");
};

export const getUsers = function (
  page: number = 1,
  limit: number = 10,
  email?: string
) {
  return Api.get(`/user?page=${page}&limit=${limit}&email=${email || ""}`);
};

export const getSubadmin = function (
  page: number = 1,
  limit: number = 10,
  email?: string
) {
  return Api.get(`/sub-admin?page=${page}&limit=${limit}&email=${email}`);
};

export const onAddSubAdmin = function (body: any) {
  return Api.post("/sub-admin/create", body);
};

export const getGuidline = function (type: number) {
  return Api.get(`/guideline?type=${type}`);
};

export const addGuidline = function (body: any) {
  return Api.post("/guideline/create", body);
};

export const updateGuidline = function (id: string, body: any) {
  return Api.patch(`/guideline/update/${id}`, body);
};

export const getNotification = function (page: number = 1, limit: number = 10) {
  return Api.get(`/notification?page=${page}&limit=${limit}`);
};

export const sendNotification = function (body: any) {
  return Api.post("/notification/send", body);
};
