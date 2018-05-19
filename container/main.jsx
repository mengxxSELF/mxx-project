import React, {Component} from 'react'
import { message, Alert } from 'antd'
import {Search, Tab, Dropdown, Collapse, Blank} from '../component'
const server = require('./server.js')
import Music from './Music'
import './index.scss'

export default class Main extends Component {
  //       数据     展示数据组件类型   搜索🔍的功能
  state = {data: [], type: null, ability: null}
  // 选择功能
  getMenu (value) {
    this.setState({ability: value})
  }
  // 开启搜索
  searchCont () {
    let {ability} = this.state
    // 判断是否选择功能
    if (!ability) {
     message.error('选择功能呀')
     return
    }
    let val = document.querySelector('.search input').value
    if (!val) {
      message.error('没有填写搜索内容呢')
      return
    }
    // 想server发送请求
    server[ability](val).then(data => {
      let type
      switch (true) {
        case ability === 'miaopai':
          type = 'tab'
          break;
        case ability === 'lyric':
          type = 'lyric'
          break;
      }
      this.setState({data, type})
    }).catch(() => {
      this.setState({data: []})
    })
  }
  render () {
    let {data, type} = this.state
    return (
      <div className='main'>
        <img src={require('./bg.jpg')} />
        <Dropdown handleChange={::this.getMenu} />
        <Blank />
        <Search handleClick={() => this.searchCont()} />
        <Blank />
        {
          type === 'tab'&& data && data.length > 0 && <Tab data={data} />
        }
        {
          type === 'lyric' && data && data.length > 0 && <Music data={data} />
        }
        {
          type && data && data.length < 1 && <Alert message="没有搜索结果呢" type="warn" />
        }
      </div>
    )
  }
}
