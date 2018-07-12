import React from 'react';

const ChatBar = (props) => {

  const uuidv1 = require('uuid/v1');

  // create new message object from message input data
  const sendMessage = function(event) {
    if (event.key === 'Enter') {
      const newMessage = {
        type: 'postMessage',
        id: uuidv1(),
        username: document.getElementById('username').value,
        content: event.target.value
      }
      props.addMessage(newMessage);
      event.target.value = '';
    }
    else {
      return false;
    }
  }

  // create new notification object from user input info
  const sendNotification = function(event) {
    if (event.key === 'Enter') {
      const newNotification = {
        type: 'postNotification',
        id: uuidv1(),
        username: event.target.value,
        content: `${props.name} changed their name to ${event.target.value}`
      }
      props.addMessage(newNotification);
    }
    else {
      return false;
    }
  }

  return (
    <footer className="chatbar">
      <input onKeyDown={sendNotification} id='username' className="chatbar-username" placeholder="Your Name (Optional)" defaultValue={props.name} />
      <input onKeyDown={sendMessage} className="chatbar-message" placeholder="Type a message and hit ENTER" />
    </footer>
  );
}
export default ChatBar;
