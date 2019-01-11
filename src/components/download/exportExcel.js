import axios from 'axios'
import Cookies from 'js-cookie'

export default function(url){
  //当前选择的公司主键
  let companyPk = Cookies.get('select_company_pk');
  let shiftPk = Cookies.get('select_shift_pk');
  axios({
    method:'get',
    url:process.env.API_ROOT+url,
    responseType:'blob',
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('pms_token'),
      'CompanyPk': companyPk==null?'':companyPk,
      'ShiftPk': shiftPk==null?'':shiftPk
    },
  }).then(data => {
    let name = decodeURI(data.headers['content-disposition'].split('=')[1]);
    let url = window.URL.createObjectURL(data.data)
    let link = document.createElement('a')
    link.style.display = 'none'
    link.href = url
    link.setAttribute('download', name)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
  })
}
