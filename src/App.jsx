import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments } from '@fortawesome/free-solid-svg-icons';

library.add(faComments)

class App extends Component {
  constructor(props) {
    super(props);
    // this is the *only* time you should assign directly to state:

    this.state = {
      currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: []
    };
  }

  addMessage(newMessage) {
    this.socket.send(JSON.stringify(newMessage));
  }

  addUser(newUser) {
    this.socket.send(JSON.stringify(newUser));

  }

  componentDidMount() {
    console.log("componentDidMount <App />");
    let socket = new WebSocket('ws://localhost:3001/');
    this.socket = socket;

    this.socket.onopen = (event) => {
      console.log("Connected to server");
    };

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
          const newUser = data;
          const oldUser = this.state.currentUser;
          this.setState({
            currentUser: newUser,
            messages: newNotifications
          });
          break;
        default:
          throw new Error("Unknown event type " + data.type);
      }

    }

    setTimeout(() => {
      console.log("Simulating incoming message");
      // Add a new message to the list of messages in the data store
      const newMessage = {type: 'incomingMessage', id: 3, username: "Michelle", content: "Hello there!"};
      const messages = this.state.messages.concat(newMessage)
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({messages: messages})
    }, 3000);
  }

  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand"><FontAwesomeIcon icon="comments" /> Chatty</a>
        </nav>
        <MessageList messages={this.state.messages} content={this.state.content}/>
        <ChatBar addMessage={this.addMessage.bind(this)} addUser={this.addUser.bind(this)} name={this.state.currentUser.name}/>
      </div>
    );
  }
}
export default App;
