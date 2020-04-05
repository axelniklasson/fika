import React from 'react';
import Button from '../components/Button';
import Input from '../components/Input';
import Loader from '../components/Loader';
import { useHistory, useLocation } from 'react-router-dom';
import socketIOClient from 'socket.io-client';
import classNames from 'classnames';
import moment from 'moment';
import './Match.css';

const ChatInput = ({ value, onChange, onSend }) => (
  <div id="chatInput">
    <input
      onChange={onChange}
      value={value}
      placeholder="Write something here"
      onKeyPress={(e) => {
        if (e.key === 'Enter') {
          onSend();
        }
      }}
    />
    <div onClick={onSend}>></div>
  </div>
);

export default function Match() {
  const history = useHistory();
  const location = useLocation();
  const [isLoading, setIsLoading] = React.useState(true);
  const [clientId, setClientId] = React.useState(null);
  const [socket, setSocket] = React.useState(null);
  const [message, setMessage] = React.useState('');
  const [messages, setMessages] = React.useState([]);

  const [match, setMatch] = React.useState({ clientId: '', name: '' });
  const chat = React.useRef();

  // set up chat client
  React.useEffect(() => {
    const { name } = location.state || {};
    if (!name) {
      history.push('/setup');
    }
    const _socket = socketIOClient(process.env.REACT_APP_API_BASE_URL);
    _socket.on('assigned_id', ({ clientId, messages }) => {
      setClientId(clientId);
      _socket.emit('identification', { clientId, name });
    });

    _socket.on('update', ({ messages }) => {
      setMessages(messages);
      if (chat.current) {
        // chat.current.scrollIntoView({ behavior: 'smooth' })
        chat.current.scrollTop = chat.current.scrollHeight;
      }
    });

    _socket.on('match_successful', ({ receiverClientId, name, isLeader }) => {
      setIsLoading(false);
      setMatch({ clientId: receiverClientId, name, isLeader });
    });

    setSocket(_socket);
  }, []);

  const onInputChange = (evt) => {
    setMessage(evt.target.value);
  };

  const sendMessage = () => {
    if (!!message) {
      socket.emit('message', { message, clientId });
      setMessage('');
    }
  };

  return (
    <div className="wrapper" id="match">
      {isLoading && <Loader text="Finding your fika partner..." />}

      {!isLoading && (
        <>
          <div className="content">
            <h1 className="heading">You will have a fika with {match.name}</h1>
            <p>
              Get to know each other in the chat below or start you virtual
              fika!
            </p>
          </div>
          <div id="chat" ref={chat}>
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
                  <span className="name">{msg.name}</span>
                  <span className="message">{msg.message}</span>
                  <span className="timestamp">
                    {moment(msg.timestamp).fromNow()}
                  </span>
                </div>
              ))}
            </div>
            <ChatInput
              onChange={onInputChange}
              value={message}
              onSend={sendMessage}
            />
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
  );
}
