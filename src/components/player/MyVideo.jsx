/**
 *
 * @ 简洁、美观、功能强大的视频播放器
 *
 *
 *
 */
import React, { Component } from 'react';
// react-player播放器插件引入
import ReactPlayer from 'react-player';
import PlayerStyle from '../../css/player.less';

class MyVideo extends Component {
	render() {
		return (
			<div className={PlayerStyle.player_wrapper}>
				<ReactPlayer
					className={PlayerStyle.react_player}
					// 测试：youtube地址的视频，访问时没有跨域限制
					url="https://www.youtube.com/watch?v=rMVAqU8fmio" // 网络资源url地址
					// url={['video/fans.mp4']} // 网络资源url地址
					// width="100%"
					// height="100%"
					playing={false} // 进入页面是否立即播放
					controls // 是否显示播放器底部控制按钮显示出来
				/>
			</div>
		);
	}
}

export default MyVideo;
