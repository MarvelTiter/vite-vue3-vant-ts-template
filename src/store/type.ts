/**
 * root层state类型定义
 */
 export interface IRootStateType {
     test:string
  }

  /**
 * 模块state类型引入
 */
import { TypeModuleApp } from "./modules/app";
import { TypeModuleUser } from "./modules/user";

/**
 * vuex所有state类型定义集成
 */
export interface TypeAllState extends IRootStateType {
  app: TypeModuleApp
  user:TypeModuleUser
}

export type IStoreType = IRootStateType & TypeAllState
