import router from '@/router'

export function hasPermission(permission) {
  // let myPermissions = store.getters.permissions;
  let pms_userinfo = localStorage.getItem('pms_userinfo')
  if(pms_userinfo){
    let myPermissions = JSON.parse(pms_userinfo).permissionValues
    return myPermissions.indexOf(permission) > -1;
  }else{
    return false;
  }
}
export function getRPath(parentPath,level){
  let myPermissions = JSON.parse(localStorage.getItem('pms_userinfo')).permissionValues
  let item1 = router.options.routes;
  for(let i=0;i<item1.length;i++) {
    if(item1[i].path==='/'){
      let item2 = item1[i].children
      if(level===0){
        for(let j=0;j<item2.length;j++){//遍历目录
          if(myPermissions.indexOf(item2[j].perm) > -1){
            let item3 = item2[j].children
            if(item3){
              for(let k=0;k<item3.length;k++){//遍历菜单
                if(item3[k].perm && myPermissions.indexOf(item3[k].perm) > -1){
                  // console.log('end')
                  return item3[k].path
                }
              }
            }
          }
        }
      }else if(level===1){
        for(let j=0;j<item2.length;j++){//遍历目录
          if(item2[j].path===parentPath && myPermissions.indexOf(item2[j].perm) > -1){
            let item3 = item2[j].children
            if(item3){
              for(let k=0;k<item3.length;k++){//遍历菜单
                if(item3[k].perm && myPermissions.indexOf(item3[k].perm) > -1){
                  // console.log('end')
                  return item3[k].path
                }
              }
            }
          }
        }
      }
    } 
  };
  console.log('hasPermission:/404:权限不足')
  return '/404';
}