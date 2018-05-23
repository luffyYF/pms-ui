import Vue from 'vue'
Vue.directive('power',function(el,binding){
  var login_obj = JSON.parse(window.localStorage.getItem('LOFIN_USER_INFO'));
  if (login_obj.isAdmin === 'Y') {
    return true;
  }
  var powerList = [];
  if(login_obj.permissions == null || login_obj.permissions == '' || login_obj.permissions == undefined) {
    powerList = [];
  } else {
    powerList = login_obj.permissions.split(',');
  }
  for (var i = 0; i < powerList.length; i++) {
    if( binding.value  == powerList[i]) {
      return true;
    }
  }
  el.remove();
})