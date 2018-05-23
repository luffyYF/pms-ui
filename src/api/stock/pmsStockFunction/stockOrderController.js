import request from '@/utils/requestJson'

/**
 * 库存功能接口
 * @param params
 * @returns {AxiosPromise<any>}
 */
// 查找商品仓库
export const listGoodsDepot = params => {
    return request.get('/goods/depot/list', params)
} 
// 查找商品供应商
export const listGoodsSupplier = params => {   
    return request.get('/goods/supplier/list', {params: params})
}
// 根据商品编号查找商品信息
export const getGoodsByGoodsCode = params => {  
    return request.get('/goods/info/getByGoodsCode', {params: params})
}
// 查找商品信息列表
export const listGoods = params => {  
    return request.get('/goods/info/list')
}
// 查找商品类型
export const listGoodsType = params => { 
    return request.get('/goods/type/list', {params: params})
}
// 保存商品货物单及详单(直拨、采购、入库、出库、部门退货、退库)
export const saveGoodsStockOrder = params => { 
    return request.post('/back/goodsStockOrder/add', params)
}
//查找商品货物单及详单(库存统计列表、库存盘点列表、部门库存盘点列表)
export const listGoodsStockOrder = params => { 
    return request.get('/back/goodsStockOrder/list', {params: params})
}
//预审
export const stockInquiryGoodsStockOrder = params => { 
    return request.post('/back/goodsStockOrder/stockInquiry', params)
}
//获取仓管员列表
export const storekeeperGoodsStockOrder = params => { 
    return request.get('/back/goodsStockOrder/listStorekeeper', {params: params})
}