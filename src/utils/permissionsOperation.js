export function powerJudge(powerId) {
  var login_obj = JSON.parse(window.localStorage.getItem('LOFIN_USER_INFO'));
  var powerList = [];
  if (login_obj.isAdmin === 'Y') {
    return true;
  }
  if (login_obj.permissions == null || login_obj.permissions == '' || login_obj.permissions == undefined) {
    powerList = [];
  } else {
    powerList = login_obj.permissions.split(',');
  }
  for (var i = 0; i < powerList.length; i++) {
    if (powerId == powerList[i]) {
      return true;
    }
  }
  return false;
}
