import request from '@/utils/requestJson'

/**
 * 处理系统会员设置
 * @param params
 * @returns {AxiosPromise<any>}
 */
export const listMemberLog = params => {
   return request.get('/pmsMemberLog/list', {params: params})
}

