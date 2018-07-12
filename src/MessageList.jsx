import React, {Component} from 'react';
import Message from './Message.jsx';
import Notification from './Notification.jsx';

class MessageList extends Component {
  render() {
    const messages = this.props.messages;
    const user = this.props.currentUser;

    const messageList = messages.map((message) => {
      if (message.type === 'incomingMessage') {
        return <Message key={message.id} username={message.username} content={message.content} />
      } else if (message.type === 'incomingNotification') {
        return <Notification content={message.content} />
      }
    });


    return (
      <main className="messages">
        {messageList}
      </main>
    );
  }
}
export default MessageList;
