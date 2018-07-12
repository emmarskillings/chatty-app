import React, {Component} from 'react';

const ChatBar = (props) => {

  const uuidv1 = require('uuid/v1');

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
