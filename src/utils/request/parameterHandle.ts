import { BoxedRequestApiParam } from "@/models/BoxedRequestApiParam"
import { BoxedResponseValue } from "@/models/BoxedResponseValue"
import { ApiReturnValueStruct } from '@/models/ApiReturnValueStruct'
import store from "@/store"
import AES from "@/utils/aes"
import { Notify } from 'vant';

function ConstructParam(param: any, type: number = 0): BoxedRequestApiParam {
  var keystr = store.state.app.keyStr
  var client = {
    // ipAddr: "0.0.0.0",
    // macAddr: "00-00-00-00-00-00",
    ipAddr: 'fe80::ac68:95c6:8a84:34d7%3',
    macAddr: 'F0-76-1C-4E-DE-BB',
    token: null
  }
  var clientStr = JSON.stringify(client)
  var paramStr = JSON.stringify(param)
  var p = {
    paramType: type,
    clientFlag: type == 1 ? AES.encrypt(clientStr, keystr) : clientStr,
    paramValue: type == 1 ? AES.encrypt(paramStr, keystr) : paramStr
  }
  return p
}

function ResoleData<T = any>(param: BoxedResponseValue, callback?: (d: T) => void): ApiReturnValueStruct<T> {
  let ret = Resole<T>(param)
  ret.success = ret.code != '$E' && ret.code != 0;
  if (ret.code == 0 || ret.code === '$E') {
    Notify({ type: 'warning', message: ret.message });
  }
  if (callback) {
    Notify({ type: 'success', message: ret.message });
    if (ret.data)
      callback(ret.data)
  }
  return ret
}

function Resole<T = any>(param: BoxedResponseValue): ApiReturnValueStruct<T> {
  var keystr = store.state.app.keyStr
  var ret = {}
  if (param.paramType == 1) {
    var value = AES.decrypt(param.resultValue, keystr)
    console.log('rawValue: ', value)
    ret = JSON.parse(value)
  } else {
    ret = JSON.parse(param.resultValue)
  }
  console.log('responseData: ', param)
  console.log('requestResult: ', ret)
  return ret as ApiReturnValueStruct<T>
}

export default {
  ConstructParam,
  Resole,
  ResoleData
}
