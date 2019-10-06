import React, { Component } from 'react';
import ListContacts from './ListContacts';
import CreateContact from './CreateContact';
import * as ContactsAPI from './utils/ContactsAPI';

class App extends Component {
  state = {
    contacts: [],
    screen: 'create'
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
    }));

    ContactsAPI.remove(contact);
  }

  render() {
    return (
      <div>
        {this.state.screen === 'list' && (
          <ListContacts contacts={this.state.contacts} 
            removeContact={this.removeContact}/>
        )}
        {this.state.screen === 'create' && (
          <CreateContact />
        )}
      </div>
    );
  }
}

export default App;
