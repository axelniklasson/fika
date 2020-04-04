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

        _socket.on(
            'match_successful',
            ({ receiverClientId, name, isLeader }) => {
                setIsLoading(false)
                setMatch({ clientId: receiverClientId, name, isLeader })
            }
        )

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
        <div className="wrapper" id="match">
            {isLoading && <p>Finding your fika partner...</p>}

            {!isLoading && (
                <>
                    <div className="content">
                        <h1 className="heading">
                            You will have a fika with {match.name}
                        </h1>
                        <p>
                            Get to know each other in the chat below or start
                            you virtual fika!
                        </p>
                    </div>
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
                        text="Start virtual fika"
                        onClick={() =>
                            history.push('/video-call', {
                                match,
                                clientId: clientId,
                            })
                        }
                    />
                </>
            )}
        </div>
    )
}
