import React from 'react'
import { Select } from 'antd'
const Option = Select.Option

export default ({handleChange}) => {
  return (
    <Select size="large" defaultValue="选择功能" style={{ width: 200 }} onChange={handleChange}>
      <Option value="miaopai"> 解析秒拍视频地址 </Option>
      <Option value="lyric"> 解析歌词信息 </Option>
    </Select>
  )
}
