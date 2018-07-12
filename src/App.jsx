import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: {name: 'Kathy'},
      messages: [],
      clients: ''
    };
  }

  // send message data to websocket
  // update current user
  addMessage(data) {
    this.socket.send(JSON.stringify(data));
    if (data.type === 'postNotification') {
      const newUser = data.username;
      this.setState({
        currentUser: {
          name: newUser
        }
      });
    }
  }

  componentDidMount() {
    let socket = new WebSocket('ws://localhost:3001/');
    this.socket = socket;

    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      switch(data.type) {
        case 'incomingMessage':
          const newMessage = data;
          const oldMessages = this.state.messages;
          const newMessages = [...oldMessages, newMessage];
          this.setState({
            messages: newMessages
          });
          break;
        case 'incomingNotification':
          const newNotification = data;
          const oldNotifications = this.state.messages;
          const newNotifications = [...oldNotifications, newNotification];
          this.setState({
            messages: newNotifications
          });
          break;
        case 'incomingClients':
          const totalClients = data.content;
          this.setState({
            clients: `${totalClients} users online`
          })
          break;
        default:
          throw new Error("Unknown event type " + data.type);
      }

    }


  }

  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">
            <div className="brand">
              Chatty Kathy
            </div>
            <div className="clients">
              {this.state.clients}
            </div>
          </a>
        </nav>
        <MessageList messages={this.state.messages} content={this.state.content}/>
        <ChatBar addMessage={this.addMessage.bind(this)} name={this.state.currentUser.name}/>
      </div>
    );
  }
}
export default App;
