import React from 'react'
import Button from '../components/Button'
import { useHistory } from 'react-router-dom'
import socketIOClient from 'socket.io-client'
import classNames from 'classnames'
import moment from 'moment'

import './Match.css'

export default function Match() {
    const history = useHistory()
    const [clientId, setClientId] = React.useState(null)
    const [socket, setSocket] = React.useState(null)
    const [message, setMessage] = React.useState('')
    const [messages, setMessages] = React.useState([])

    // set up chat client
    React.useEffect(() => {
        const _socket = socketIOClient(process.env.REACT_APP_API_BASE_URL)
        _socket.on('setup', ({ clientId, messages }) => {
            setClientId(clientId)
            setMessages(messages)
        })

        _socket.on('update', ({ messages }) => {
            setMessages(messages)
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

    return (
        <div id="wrapper">
            <h1>Match</h1>

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
