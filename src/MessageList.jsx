import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  render() {
    const messages = this.props.messages;

    const messageList = messages.map((message) =>
      <Message username={message.username} content={message.content} />
    )
    return (
      <main className="messages">
        {messageList}
        <div className="message system">
          Anonymous1 changed their name to nomnom.
        </div>
      </main>
    );
  }
}
export default MessageList;
