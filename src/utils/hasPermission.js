import router from '@/router'

export function hasPermission(permission) {
  let userinfo = localStorage.getItem('pms_userinfo')
  if(userinfo){
    let obj = JSON.parse(userinfo)
    if(obj.adminFlag===1){
      //是超级管理员
      return true;
    }else{
      let myPermissions = obj.permissionValues
      return myPermissions.indexOf(permission) > -1;
    }
  }else{
    return false;
  }
}