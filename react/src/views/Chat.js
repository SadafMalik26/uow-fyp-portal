import React, { useState, useRef } from 'react';
import { Container, Row, Col, Card, CardBody, FormGroup, Input, Button } from 'reactstrap';
import '../ChatLayout.css'; // Import the custom CSS file
import { useGroupChat, useSendMessage } from '../hooks/group';
import { useParams } from 'react-router-dom';
import { useAuth } from '../hooks/authentication';
import { arrayBufferToBase64 } from '../common/utils';


import EmojiPicker from 'emoji-picker-react';

export const Chat = () => {
  const bottomEl = useRef(null);
  const { id } = useParams();
  const { data: auth } = useAuth();
  const { data: chats } = useGroupChat(id);
  const send = useSendMessage();
  const [message, setMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  

  const sendMessage = async () => {
    const sendChat = await send.mutateAsync({ message, id });
    if (sendChat) {
      scrollToBottom();
      setMessage('');
    }
  };

  const scrollToBottom = () => {
    // Code to scroll to the bottom of the chat container
  };

  const handleEmojiClick = (emojiObject) => {
    const { emoji } = emojiObject;
    setMessage((prevMessage) => prevMessage + emoji);
  };

  const toggleEmojiPicker = () => {
    setShowEmojiPicker((prevShowEmojiPicker) => !prevShowEmojiPicker);
  };

  return (
    <Container className="chat-container">
      <Row>
        <Col>
          <Card className="chat-card">
            <CardBody>
              <div ref={bottomEl} className="message-bubble">
                {chats?.map((msg, index) => (
                  <div
                    key={index}
                    className={`message ${
                      msg.userType === 'Teacher' ? 'Teacher' : 'Student'
                    } ${msg.sender._id === auth.id ? 'right-align' : 'left-align'}`}
                  >
                    <img
                      className="rounded-circle m-1"
                      alt='#'
                      width="45"
                      height="45"
                      src={`data:image/jpeg;base64,${arrayBufferToBase64(
                        msg.sender?.cover?.data?.data
                      )}`}
                    />

                    <span className="sender">{msg.sender?.username}:</span>
                    <span className="text">{msg.message}</span>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
          <div className="message-form">
            {auth?.type !== 'Admin' && (
              <Row>
               <Col>
                <img
          className="emoji-icon" 
          alt='#'
         
          src="https://icons.getbootstrap.com/assets/icons/emoji-smile.svg"
          onClick={toggleEmojiPicker}
          /></Col>

                <Col xl={10}>
                  <FormGroup>
                
                    <Input
                      type="textarea"
                      name="message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Type your message..."
                      
                    />
                   
                  </FormGroup>
                </Col>
                <Col>
                  <Button onClick={() => sendMessage()} color="primary" type="submit">
                    Send
                  </Button>
                
                </Col>
              </Row>
            )}
          </div>
          {showEmojiPicker && (
          <EmojiPicker
          onEmojiClick={handleEmojiClick}
            />
        )}
        </Col>
      </Row>
    </Container>
  );
};
