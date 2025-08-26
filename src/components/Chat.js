import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import io from 'socket.io-client';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const Chat = () => {
  const { user, token } = useAuth();
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [currentRoom, setCurrentRoom] = useState('general');
  const [rooms, setRooms] = useState(['general']);
  const [typingUsers, setTypingUsers] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  const loadMessages = useCallback(async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/messages/room/${currentRoom}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      // Giới hạn chỉ hiển thị 50 tin nhắn gần nhất
      const recentMessages = response.data.slice(-50);
      setMessages(recentMessages);
    } catch (error) {
      console.error('Error loading messages:', error);
    }
  }, [currentRoom, token]);

  useEffect(() => {
    if (token && user) {
      const newSocket = io('http://localhost:5000', {
        auth: { token }
      });

      newSocket.on('connect', () => {
        console.log('Connected to chat server');
        newSocket.emit('join_room', currentRoom);
      });

      newSocket.on('new_message', (message) => {
        setMessages(prev => {
          const newMessages = [...prev, message];
          // Giới hạn chỉ giữ 50 tin nhắn gần nhất
          return newMessages.slice(-50);
        });
      });

      newSocket.on('user_joined', (data) => {
        setMessages(prev => [...prev, {
          content: `${data.username} joined the room`,
          sender: { username: 'System' },
          timestamp: new Date(),
          isSystem: true
        }]);
      });

      newSocket.on('user_left', (data) => {
        setMessages(prev => [...prev, {
          content: `${data.username} left the room`,
          sender: { username: 'System' },
          timestamp: new Date(),
          isSystem: true
        }]);
      });

      newSocket.on('user_typing', (data) => {
        setTypingUsers(prev => [...prev.filter(u => u !== data.username), data.username]);
      });

      newSocket.on('user_stop_typing', (data) => {
        setTypingUsers(prev => prev.filter(u => u !== data.username));
      });

      setSocket(newSocket);

      return () => {
        newSocket.disconnect();
      };
    }
  }, [token, user]);

  useEffect(() => {
    if (currentRoom) {
      loadMessages();
      if (socket) {
        socket.emit('join_room', currentRoom);
      }
    }
  }, [currentRoom, loadMessages, socket]);

  useEffect(() => {
    // Auto scroll to bottom when new messages arrive
    const timeoutId = setTimeout(() => {
      scrollToBottom();
    }, 100);
    return () => clearTimeout(timeoutId);
  }, [messages]);

  const loadRooms = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/messages/rooms`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setRooms(response.data);
    } catch (error) {
      console.error('Error loading rooms:', error);
    }
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() && socket) {
      socket.emit('send_message', {
        content: newMessage,
        room: currentRoom
      });
      setNewMessage('');
      setIsTyping(false);
      socket.emit('stop_typing', { room: currentRoom });
    }
  };

  const handleTyping = (e) => {
    setNewMessage(e.target.value);
    if (!isTyping) {
      setIsTyping(true);
      socket.emit('typing', { room: currentRoom });
    }
    
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    
    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false);
      socket.emit('stop_typing', { room: currentRoom });
    }, 1000);
  };

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (!user) {
    return <div>Please login to access chat</div>;
  }

  return (
    <div style={{
      maxWidth: '800px',
      margin: '0 auto',
      padding: '20px',
      backgroundColor: 'white',
      height: '90vh',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Chat Room</h1>
      
      {/* Room Selection */}
      <div style={{ marginBottom: '20px' }}>
        <label style={{ marginRight: '10px' }}>Room:</label>
        <select 
          value={currentRoom} 
          onChange={(e) => setCurrentRoom(e.target.value)}
          style={{
            padding: '5px',
            border: '1px solid black',
            backgroundColor: 'white'
          }}
        >
          {rooms.map(room => (
            <option key={room} value={room}>{room}</option>
          ))}
        </select>
        <button 
          onClick={loadRooms}
          style={{
            marginLeft: '10px',
            padding: '5px 10px',
            border: '1px solid black',
            backgroundColor: 'white',
            cursor: 'pointer'
          }}
        >
          Refresh Rooms
        </button>
      </div>

                           {/* Messages */}
        <div style={{
          flex: 1,
          border: '1px solid black',
          padding: '10px',
          marginBottom: '20px',
          minHeight: '400px',
          maxHeight: '60vh',
          overflowY: 'auto',
          backgroundColor: '#f9f9f9'
        }}>
                  {messages.length === 0 ? (
            <div style={{ 
              textAlign: 'center', 
              color: '#666', 
              marginTop: '20px',
              fontStyle: 'italic'
            }}>
              No messages yet. Start the conversation!
            </div>
          ) : (
            messages.map((message, index) => (
              <div key={index} style={{
                marginBottom: '10px',
                padding: '8px',
                backgroundColor: message.isSystem ? '#e0e0e0' : 'white',
                border: '1px solid #ddd',
                borderRadius: '4px'
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '5px'
                }}>
                  <strong style={{ color: message.isSystem ? '#666' : 'black' }}>
                    {message.isSystem ? 'System' : 
                     (message.sender?.username || message.sender?.sender?.username || 'Unknown')}
                  </strong>
                  <span style={{ fontSize: '12px', color: '#666' }}>
                    {formatTime(message.timestamp)}
                  </span>
                </div>
                <div>{message.content}</div>
              </div>
            ))
          )}
        {typingUsers.length > 0 && (
          <div style={{ fontStyle: 'italic', color: '#666', marginTop: '10px' }}>
            {typingUsers.join(', ')} {typingUsers.length === 1 ? 'is' : 'are'} typing...
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <form onSubmit={sendMessage} style={{ display: 'flex', gap: '10px' }}>
        <input
          type="text"
          value={newMessage}
          onChange={handleTyping}
          placeholder="Type your message..."
          style={{
            flex: 1,
            padding: '10px',
            border: '1px solid black',
            backgroundColor: 'white'
          }}
        />
        <button 
          type="submit"
          disabled={!newMessage.trim()}
          style={{
            padding: '10px 20px',
            border: '1px solid black',
            backgroundColor: 'white',
            cursor: newMessage.trim() ? 'pointer' : 'not-allowed',
            opacity: newMessage.trim() ? 1 : 0.5
          }}
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default Chat;
