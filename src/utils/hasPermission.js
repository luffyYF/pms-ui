import router from '@/router'

export function hasPermission(permission) {
  let userinfo = localStorage.getItem('pms_userinfo')
  if(userinfo){
    let obj = JSON.parse(userinfo)
    if(obj.adminFlag===1){
      //是超级管理员
      return true;
    }else{
      let myPermissions = obj.perms
      return myPermissions.indexOf(permission) > -1;
    }
  }else{
    return false;
  }
}

export function getCertificateType() {
  let list = []
  var typeList = JSON.parse(localStorage.getItem("pms_type"))
  typeList.forEach(item=> {
    if(item.typeMaster == "CERTIFICATE_TYPE"){
      list.push({
        name:item.typeName,
        id:item.typeCode
      });
    }
  })
  return list 
}