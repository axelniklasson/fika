import React from 'react'
import Button from '../components/Button'
import { useHistory, useLocation } from 'react-router-dom'
import socketIOClient from 'socket.io-client'
import classNames from 'classnames'
import moment from 'moment'

import './Match.css'

export default function Match() {
    const history = useHistory()
    const location = useLocation()
    const [isLoading, setIsLoading] = React.useState(true)
    const [clientId, setClientId] = React.useState(null)
    const [socket, setSocket] = React.useState(null)
    const [message, setMessage] = React.useState('')
    const [messages, setMessages] = React.useState([])

    const [match, setMatch] = React.useState({ clientId: '', name: '' })

    // set up chat client
    React.useEffect(() => {
        const { name } = location.state || {}
        if (!name) {
            history.push('/setup')
        }
        const _socket = socketIOClient(process.env.REACT_APP_API_BASE_URL)
        _socket.on('assigned_id', ({ clientId, messages }) => {
            setClientId(clientId)
            _socket.emit('identification', { clientId, name })
        })

        _socket.on('update', ({ messages }) => {
            setMessages(messages)
        })

        _socket.on('match_successful', ({ receiverClientId, name }) => {
            setIsLoading(false)
            setMatch({ clientId: receiverClientId, name })
        })

        setSocket(_socket)
    }, [])

    const onInputChange = (evt) => {
        setMessage(evt.target.value)
    }

    const sendMessage = () => {
        socket.emit('message', { message, clientId })
        setMessage('')
    }

    if (isLoading) {
        return <p>Waiting for a match</p>
    }

    return (
        <div id="wrapper">
            <h1>Match</h1>
            <p>Connected to {match.name}</p>

            <div id="messages">
                {messages.map((msg) => (
                    <div
                        key={msg.timestamp}
                        className={classNames({
                            messageWrapper: true,
                            sent: msg.clientId === clientId,
                            received: msg.clientId !== clientId,
                        })}
                    >
                        <span className="message">{msg.message}</span>
                        <span className="timestamp">
                            {moment(msg.timestamp).fromNow()}
                        </span>
                    </div>
                ))}
            </div>

            <div id="inputWrapper">
                <input
                    placeholder="what do you wanna say?"
                    onChange={onInputChange}
                    value={message}
                ></input>
                <Button text=">" onClick={sendMessage} />
            </div>
            <Button
                text="Get started"
                onClick={() => history.push('/video-call')}
            />
        </div>
    )
}
