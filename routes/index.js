const router = require('koa-router')()
const {miaopai, lyric} = require('../utils/api.js')
const req = require('../utils/req.js')

router.get('/', function * (next) {
  console.log('kkkkkkkkkk')
  yield this.render('index', {
    title: '金木'
  });
});

// 解析秒拍视频真实地址
router.get('/miaopai', function * () {
  let {video} = this.query
  let url = `${miaopai}${video}.json`
  let code
  let data
  try {
    code = 200
    let {result} = yield req({url}).then(res => res) || {}
    data = result.map(({host, name, path, scheme}) => {
      return {
        name,
        video: `${scheme}${host}${path}`
      }
    })
  } catch (e) {
    code = 500
    data = []
  } finally {
    this.body = {
      code,
      data
    }
  }
})

// 歌词解析
router.get('/getLyric', function * () {
  let {music} = this.query
  let code
  let data
  try {
    // 这个API接口 汉字需要编码
    music = encodeURIComponent(music)
    // 需要首先拿到歌曲ID
    let url = `${lyric}method=baidu.ting.search.catalogSug&query=${music}`
    let result = yield req({url}).then(res => res) || {}
    let {song = [], album = [], artist = []} = result

    let songs = [].concat(song, album, artist)

    data = yield songs.map(function * ({songid, artistid, albumid, artistname, artistpic}) {
      if (songid || artistid || albumid) {
        let id = songid || artistid || albumid
        // 获取歌词
        let lyricUrl = `${lyric}method=baidu.ting.song.lry&songid=${id}`
        let {lrcContent} = yield req({url: lyricUrl}).then(res => res) || {}
        // 需要将歌词中的字符去除掉
        let playUrl = `${lyric}method=baidu.ting.song.playAAC&songid=${songid}`
        let {bitrate, songinfo} = yield req({url: playUrl}).then(res => res) || {}
        let {file_link} = bitrate || {}
        let {pic_big} = songinfo || {}

        return {
          singer: artistname,
          id: songid,
          lyric: lrcContent || '暂无查看权限',
          play: file_link,
          cover: pic_big || artistpic
        }
      }
    })
    // 去除掉null的值
    data = data.filter(item => item)
    code = 200
  } catch (e) {
    console.log(e)
    code = 500
    data = []
  } finally {
    this.body = {
      code,
      data
    }
  }
})

module.exports = router;
