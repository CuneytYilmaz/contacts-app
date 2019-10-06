import React, { Component } from 'react';
import ListContacts from './ListContacts';
import * as ContactsAPI from './utils/ContactsAPI';

class App extends Component {
  state = {
    contacts: []
  }

  componentDidMount(){
    ContactsAPI.getAll()
      .then((contacts) => {
        this.setState({
          contacts
        });
      });
  }

  removeContact = (contact) => {
    this.setState((currenctState) => ({
      contacts: currenctState.contacts.filter(c => 
        c.id !== contact.id
      )
    }))
  }

  render() {
    return (
      <div>
        <ListContacts contacts={this.state.contacts} 
          removeContact={this.removeContact}/>
      </div>
    );
  }
}

export default App;
