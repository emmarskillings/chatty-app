import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
// import { library } from '@fortawesome/fontawesome-svg-core';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faComments } from '@fortawesome/free-solid-svg-icons';
//
// library.add(faComments)

class App extends Component {
  constructor(props) {
    super(props);
    // this is the *only* time you should assign directly to state:

    this.state = {
      currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [
        {
          id: 1,
          username: "Bob",
          content: "Has anyone seen my marbles?",
        },
        {
          id: 2,
          username: "Anonymous",
          content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
        }
      ]
    };
  }

  addMessage(newMessage) {
    const oldMessages = this.state.messages;
    const newMessages = [...oldMessages, newMessage];
    this.setState({
      messages: newMessages
    });
  }

  componentDidMount() {
    console.log("componentDidMount <App />");
    // 
    // let socket = new WebSocket('ws://localhost:3001/');
    // this.state.socket = socket;

    // socket.addEventListener('message', (event) => {
    //   console.log('Connected to server', event)
    // })


    setTimeout(() => {
      console.log("Simulating incoming message");
      // Add a new message to the list of messages in the data store
      const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
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
        <MessageList messages={this.state.messages}/>
        <ChatBar addMessage={this.addMessage.bind(this)} name={this.state.currentUser.name}/>
      </div>
    );
  }
}
export default App;
