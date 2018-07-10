import React, {Component} from 'react';

const ChatBar = (props) => {

  const generateUniqueKey = function(){
    const uniqueKey = Math.random().toString(36).replace('0.','').split('').slice(0,6).join('');
    return uniqueKey;
  }

  const sendMessage = function(event) {
    if (event.key === 'Enter') {
      // event.preventDefault();
      const newMessage = {
        id: generateUniqueKey(),
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

  return (
    <footer className="chatbar">
      <input id='username' className="chatbar-username" placeholder="Your Name (Optional)" defaultValue={props.name} />
      <input onKeyDown={sendMessage} className="chatbar-message" placeholder="Type a message and hit ENTER" />
    </footer>
  );
}
export default ChatBar;
