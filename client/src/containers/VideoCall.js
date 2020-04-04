import React from 'react'
import Button from '../components/Button'
import Peer from 'peerjs'

import './VideoCall.css'
import { useLocation, useHistory } from 'react-router-dom'

const VIDEO_DIMENSIONS = {
    width: 297,
    height: 528,
}

export default function VideoCall() {
    const [peer, setPeer] = React.useState(null)
    const history = useHistory()
    const location = useLocation()
    const [match, setMatch] = React.useState(null)

    const sendingVideo = React.useRef()
    const receivingVideo = React.useRef()
    const getUserMedia =
        navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia

    React.useEffect(() => {
        const { match, clientId } = location.state
        if (!match || !clientId) {
            history.push('/setup')
        }
        const peer = new Peer(clientId)
        setMatch(match)
        console.log(peer)

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
                const call = peer.call(match.clientId, stream)
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

    if (!match) {
        return <p>Loading</p>
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
            <Button text="Call" onClick={call} />
        </div>
    )
}
