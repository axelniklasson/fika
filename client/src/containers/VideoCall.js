import React from 'react'
import Peer from 'peerjs'
import { useLocation, useHistory } from 'react-router-dom'
import { isMobile } from '../utils'
import './VideoCall.css'

const isDesktop = !isMobile()
const VIDEO_CAPTURE_DIMENSIONS = isDesktop
    ? {
          width: { min: 270, max: 270 },
          height: { min: 480, max: 480 },
      }
    : true

export default function VideoCall() {
    const [peer, setPeer] = React.useState(null)
    const history = useHistory()
    const location = useLocation()
    const [match, setMatch] = React.useState(null)
    const [isLoading, setIsLoading] = React.useState(true)

    const sendingVideo = React.useRef()
    const receivingVideo = React.useRef()
    const getUserMedia = navigator.mediaDevices?.getUserMedia

    React.useEffect(() => {
        if (!peer || !match?.isLeader) {
            return
        }
        getUserMedia({
            video: VIDEO_CAPTURE_DIMENSIONS,
            audio: true,
        })
            .then((stream) => {
                const call = peer.call(match.clientId, stream)
                sendingVideo.current.srcObject = stream

                call.on('stream', (remoteStream) => {
                    receivingVideo.current.srcObject = remoteStream
                })
            })
            .catch((err) => console.log(err))
    }, [peer])

    React.useEffect(() => {
        const { match, clientId, isLeader } = location.state || {}
        if (!match || !clientId) {
            history.push('/setup')
        }
        const peer = new Peer(clientId)
        setMatch(match)

        peer.on('call', (call) => {
            getUserMedia({
                video: VIDEO_CAPTURE_DIMENSIONS,
                audio: true,
            })
                .then((stream) => {
                    setIsLoading(false)
                    call.answer(stream)
                    sendingVideo.current.srcObject = stream

                    call.on('stream', (remoteStream) => {
                        receivingVideo.current.srcObject = remoteStream
                    })
                })
                .catch((err) => console.log(err))
        })

        setPeer(peer)
    }, [])

    if (!getUserMedia) {
        alert('Unsupported browser')
        return null
    }

    if (!match) {
        return <p>Loading</p>
    }

    return (
        <div id="wrapper">
            {isLoading && <Loader text="Finding your fika partner..." />}
            {!isLoading && (
                <>
                    <div id="videos-wrapper">
                        <video
                            ref={sendingVideo}
                            autoPlay
                            playsInline
                            id="sendingVideo"
                        ></video>
                        <video
                            ref={receivingVideo}
                            autoPlay
                            playsInline
                            id="receivingVideo"
                        ></video>
                    </div>
                    <div
                        id="closeWrapper"
                        onClick={() => console.log('end fika')}
                    >
                        <span>End fika</span>
                    </div>
                </>
            )}
        </div>
    )
}
