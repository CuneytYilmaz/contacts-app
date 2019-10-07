import React, { Component } from 'react';
import ListContacts from './ListContacts';
import CreateContact from './CreateContact';
import { Route } from 'react-router-dom'
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
    }));

    ContactsAPI.remove(contact);
  }

  onCreateContact = (contact) => {
    ContactsAPI.create(contact)
      .then((contact) => {
        this.setState((currState) => ({
          contacts: [...currState.contacts,contact]
        }));
      });
  }

  render() {
    return (
      <div>
        <Route exact path='/' render={() => (
          <ListContacts contacts={this.state.contacts} 
            removeContact={this.removeContact} />
        )} />
        <Route path='/create' render={({history}) => (
          <CreateContact onCreateContact={(contact) => {
            this.onCreateContact(contact);
            history.push('/');
          }}/>
        )} />
      </div>
    );
  }
}

export default App;
