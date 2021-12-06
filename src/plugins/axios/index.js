import service from './axios'

const Qs = require('qs')
function setParam(type, param) {
    const data = {
            header: '',
            params: null,
        }
    if (type === 'contentType') {
        data.header = 'application/x-www-form-urlencoded'
        data.params = Qs.stringify(param)
    } else {
        data.header = 'application/json'
        data.params = param
    }
    return data
}

/**

 * @author yang
 * @date 2019/10/10 你好
 * @param { string} method 
 * @param { string } api 
 * @param { string } paramType  
 * @param { Object } params 
 * * */
function reqMethod(method, api, paramType, params = {}) {
    const reqParams = setParam(paramType, params)
    return service({
        method,
        url: api,
        headers: {
            'Content-Type': reqParams.header,
        },
        data: reqParams.params,
    })
}

/**
 * axios mode
 * @author yang
 * @date 2019/4/8
 * @param url request api
 */
export default {
    // get
    get(api, params = {}) {
        return service({
            method: 'get',
            url: api,
            params,
        })
    },
    // post
    post(api, params = {}, paramType) {
        return reqMethod('post', api, paramType, params)
    },
    // put
    put(api, params = {}, paramType) {
        return reqMethod('put', api, paramType, params)
    },
    // delete
    del(api, params = {}, paramType) {
        return reqMethod('delete', api, paramType, params)
    },
}