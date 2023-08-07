import { Modal } from "antd"
import TencentVideoPlayer from "@components/TencentVideoPlayer/TencentVideoPlayer"

function getVideoCover(video) {
  if(!video) return ''
  const videoDom = document.createElement('video')
  document.body.appendChild(videoDom)
  videoDom.id = "video-" + Math.random().toString(36).slice(2)
  const player = window.TCPlayer(videoDom.id, {
    fileID: video.fileId,
    appID: video.appId,
    psign: video.psign,
  })
  return new Promise((resolve, reject) => {
    player.on('loadstart', () => {
      resolve(player.poster())
      document.body.removeChild(player.el())
    })
  })
}

function previewVideo(video) {
  Modal.confirm({
    title: "基本介绍",
    icon: null,
    content: (
      <div style={{ width: 600, height: 400 }}>
        <TencentVideoPlayer video={video} />
      </div>
    ),
    width: 664,
  })
}

export {
  getVideoCover,
  previewVideo
}