import { allTypeList } from '@/api/utils/pmsTypeController'

export function refreshPmsType(){
    allTypeList().then(res=>{
      if(res.code == 1){
        localStorage.setItem("pms_type",JSON.stringify(res.data));
      }
    })
}