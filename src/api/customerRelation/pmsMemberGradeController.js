import request from '@/utils/requestJson'

/**
 * 会员等级
 * @param params
 * @returns {AxiosPromise<any>}
 */
export const listGrade = params => {
   return request.get('/back/grade/list', {params: params})
}


