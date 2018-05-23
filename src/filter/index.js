import Vue from 'vue'
import './ImgUrlFilter'

Vue.filter('arrayFilter', function (items, attr) {
  if (typeof items === 'object' && attr) {
    let array = []
    let index = 0
    for (let i = 0; i < items.length; i++) {
      if (items[i][attr] && items[i][attr] !== '') {
        array[index++] = items[i][attr]
      }
    }
    return array
  }
  return []
})

/** 分页过滤开始 */
Vue.filter('pagingFilter', function (items, pagination) {
  if (typeof pagination !== 'object') {
    throw new Error('分页必须是对象')
  }
  let {current, size} = pagination
  pagination.total = items.length
  let offset = (current - 1) * size
  return items.slice(offset, offset + size)
})
/** 分页过滤结束 */

/** table全局搜索开始 */
Vue.filter('globalFilter', function (items, filterText) {
  let backItems = []
  if (filterText === '') {
    return items
  } else {
    for (let i = 0; i < items.length; i++) {
      let str = JSON.stringify(items[i])
      if (!(str.indexOf(filterText) === -1)) {
        backItems.push(items[i])
      }
    }
    return backItems
  }
})
/** table全局搜索结束 */

/** 订单类型搜索开始 */
Vue.filter('orderStatusFilter', function (items, filterText) {
  let backItems = []
  if (filterText === '') {
    return items
  } else {
    for (let i = 0; i < items.length; i++) {
      if (items[i].orderStatus === filterText) {
        backItems.push(items[i])
      }
    }
    return backItems
  }
})
/** 订单类型搜索结束 */