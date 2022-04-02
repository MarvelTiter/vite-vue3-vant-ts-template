import { ApiReturnValueStruct } from "@/models/ApiReturnValueStruct";
import { defaultHttp } from "@/utils/request";
import * as a from '../ports';
import { LoginResponse } from "./models/LoginReponse";

export async function login(data: any): Promise<ApiReturnValueStruct<LoginResponse>> {
  return await defaultHttp.post({
    // url: '/vue-element-admin/user/login',
    // url: '/InspectUser/InspectLogin/userLogin',
    url: `${a.LoginModule}/inspectConfig/startLogin/login`,
    data
  });
}

export function logout(token: string) {
  return defaultHttp.post({
    // url: '/vue-element-admin/user/logout',
    url: `${a.LoginModule}/inspectConfig/startLogin/logout`,
    data: token
  });
}

export function changePassword(data: any) {
  return defaultHttp.post({
    // url: '/vue-element-admin/user/logout',
    url: `${a.LoginModule}/inspectConfig/startLogin/changePassword`,
    data
  });
}

export function getUserList(data: any) {
  return defaultHttp.post({
    // url: '/vue-element-admin/user/logout',
    url: `${a.QUERY}/inspectConfig/userBase/getUserList`,
    data
  });
}

export function findByUserId(data: any) {
  return defaultHttp.post({
    // url: '/vue-element-admin/user/logout',
    url: `${a.QUERY}/inspectConfig/userBase/findByUserId`,
    data
  });
}

export function createUser(data: any) {
  return defaultHttp.post({
    // url: '/vue-element-admin/user/logout',
    url: `${a.QUERY}/inspectConfig/userBase/addUser`,
    data
  });
}

export function updateUser(data: any) {
  return defaultHttp.post({
    // url: '/vue-element-admin/user/logout',
    url: `${a.QUERY}/inspectConfig/userBase/updateUser`,
    data
  });
}

export function deleteUser(data: any) {
  return defaultHttp.post({
    // url: '/vue-element-admin/user/logout',
    url: `${a.QUERY}/inspectConfig/userBase/deleteUser`,
    data
  });
}
