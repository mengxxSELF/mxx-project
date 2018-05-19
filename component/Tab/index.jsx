import React , {Component} from 'react'
import { Tabs, Icon, Button } from 'antd'
const TabPane = Tabs.TabPane
import ZeroClipboard from 'ZeroClipboard'

export default class Tab extends Component{
  copyUrl () {
    // let target = document.querySelector('#button')
    let target = this.videoUrl
    // let client = new ZeroClipboard(target)
    // console.log(client)
    // client.on( "ready", function( readyEvent ) {
    //   console.log( "ZeroClipboard SWF is ready!" )
    //   client.on( "aftercopy", function( event ) {
    //     event.target.style.display = "none";
    //     alert("Copied text to clipboard: " + event.data["text/plain"] );
    //   })
    // })
    // target.select()
    if (document.execCommand('copy', false, null)) {
      document.execCommand("copy", true)
    } else {
    }
  }
  render () {
    let {data} = this.props
    return (
      <Tabs defaultActiveKey='1'>
      {
        data.map(({name, video}, index) => {
          return (
            <TabPane tab={<span><Icon type="video-camera" /> {name} </span>} key={index}>
              <input id='input' style={{display: 'none'}} ref={ node => this.videoUrl = node } defaultValue={video} />
              <p> 视频真实地址 <span> {video} </span> </p>
              <a href={video} target='_blank'> 链接地址 </a>
              {
                false && <Button id="button" data-clipboard-target='input' type="primary" data-url={video} onClick={::this.copyUrl}>一键copy 视频地址</Button>
              }
            </TabPane>
          )
        })
      }
      </Tabs>
    )
  }
}
