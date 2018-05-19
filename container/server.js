module.exports = {
  getRecommend: (cont) => {
    let url = `/recommend/${cont}`
    return new Promise((resolve, reject) => {
      fetch(url)
      .then(response => response.json())
      .then(res => {
        resolve(res.data)
      })
      .catch(() => {
        reject('error')
      })
    })
  },
  miaopai: (cont) => {
    // 需要解析URL
    let reg = /show\/(\S+).htm/
    let video = reg.exec(cont)[1] || null
    if (!video) return
    let url = `/miaopai?video=${video}`

    return new Promise((resolve, reject) => {
      fetch(url)
      .then(response => response.json())
      .then(res => {
        resolve(res.data)
      })
      .catch(() => {
        reject('error')
      })
    })
  },
  // 解析歌词
  lyric: (music) => {
    let url = `/getLyric?music=${music}`

    return new Promise((resolve, reject) => {
      fetch(url)
      .then(response => response.json())
      .then(res => {
        resolve(res.data)
      })
      .catch(() => {
        reject('error')
      })
    })
  }
}
