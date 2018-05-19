// 封装一个serverd端发送请求的方法
const urllib = require('urllib')

module.exports = ({method = 'GET', url, data}) => {
  return new Promise((resolve, reject) => {
    urllib
    .request(url, {dataType: 'json', method})
    .then(function (result) {
      let {data} = result
      resolve(data)
    })
    .catch((err) => {
      console.log('err', err)
      reject(404)
    })
  })
}
