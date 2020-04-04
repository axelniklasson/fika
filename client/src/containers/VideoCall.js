import React from 'react'
import Button from '../components/Button'
import Peer from 'peerjs'

import './VideoCall.css'

const VIDEO_DIMENSIONS = {
    width: 297,
    height: 528,
}

export default function VideoCall() {
    const [peer, setPeer] = React.useState(null)
    const [peerId, setPeerId] = React.useState('')

    const sendingVideo = React.useRef()
    const receivingVideo = React.useRef()
    const getUserMedia =
        navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia

    React.useEffect(() => {
        const peer = new Peer()

        peer.on('call', (call) => {
            getUserMedia(
                {
                    video: {
                        width: { min: 270, max: 270 },
                        height: { min: 480, max: 480 },
                    },
                    audio: true,
                },
                (stream) => {
                    call.answer(stream)
                    sendingVideo.current.srcObject = stream

                    call.on('stream', (remoteStream) => {
                        receivingVideo.current.srcObject = remoteStream
                    })
                },
                (err) => {
                    console.log(err)
                }
            )
        })

        console.log(peer)
        setPeer(peer)
    }, [])

    const call = () => {
        getUserMedia(
            {
                video: {
                    width: { min: 270, max: 270 },
                    height: { min: 480, max: 480 },
                },
                audio: true,
            },
            (stream) => {
                const call = peer.call(peerId, stream)
                sendingVideo.current.srcObject = stream

                call.on('stream', (remoteStream) => {
                    receivingVideo.current.srcObject = remoteStream
                })
            },
            (err) => {
                console.log(err)
            }
        )
    }

    const onChange = (evt) => {
        setPeerId(evt.target.value)
    }

    return (
        <div id="wrapper">
            <h1>VideoCall</h1>

            <div id="videos-wrapper">
                <video ref={sendingVideo} autoPlay id="sendingVideo"></video>
                <video
                    ref={receivingVideo}
                    autoPlay
                    id="receivingVideo"
                ></video>
            </div>
            <input
                placeholder="peerId"
                onChange={onChange}
                value={peerId}
            ></input>
            <Button text="Call" onClick={call} />
        </div>
    )
}
