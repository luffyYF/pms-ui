import axios from 'axios'
import {Message} from 'element-ui'

export default function(url){
  //当前选择的公司主键
  let companyPk = localStorage.getItem('select_company_pk');
  let shiftPk = localStorage.getItem('select_shift_pk');
  axios({
    method:'get',
    url:process.env.API_ROOT+url,
    responseType:'arraybuffer',
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('token'),
      'CompanyPk': companyPk==null?'':companyPk,
      'ShiftPk': shiftPk==null?'':shiftPk
    },
  }).then(data => {
    console.log(data)
    if (data.headers['content-disposition']) {
      let name = decodeURI(data.headers['content-disposition'].split('=')[1]);
      let blob = new Blob([data.data], { type: 'application/excel' }) // 假设文件为pdf
      let url = window.URL.createObjectURL(blob)
      let link = document.createElement('a')
      link.style.display = 'none'
      link.href = url
      link.setAttribute('download', name)
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
    } else {
      var enc = new TextDecoder('utf-8') 
      var res = JSON.parse(enc.decode(new Uint8Array(data.data))) //转化成json对象
      Message({message: res.sub_msg, type: 'error', duration: 5 * 1000})
    }
  })
}
