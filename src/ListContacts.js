import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

class ListContacts extends Component {
    static propTypes = {
        contacts: PropTypes.array.isRequired,
        removeContact: PropTypes.func.isRequired,
    }

    state = {
        query: ''
    }

    updateQuery = (query) => {
        this.setState({
            query: query.trim()
        });
    }

    clearQuery = () => {
        this.updateQuery('');
    }

    render(){
        const { query } = this.state;
        const { contacts,removeContact } = this.props;
        const showingContacts = query === '' 
            ? contacts
            : contacts.filter(c => c.name.toLowerCase().includes(query.toLowerCase()));

        return(
            <div className='list-contacts'>
                <div className='list-contacts-top'>
                    <input 
                        type='input'
                        className='search-contacts'
                        placeholder='Search Contacts'
                        value={query}
                        onChange={(event) => this.updateQuery(event.target.value)}
                    />
                    <Link to='/create'
                    className='add-contact'>Add Contact</Link>
                </div>
                {showingContacts.length !== contacts.length &&
                    <div className='showing-contacts'>
                        <span>Now showing {showingContacts.length} of {contacts.length}</span>
                        <button onClick={() => this.clearQuery()}>Show all</button>
                    </div>
                }
                <ol className='contact-list'>
                    {showingContacts.map((contact) => (
                        <li key={contact.id} className='contact-list-item'>
                            <div className='contact-avatar'
                            style={{
                                backgroundImage: `url(${contact.avatarURL})`
                            }}>
                            </div>
                            <div className='contact-details'>
                                <p>{contact.name}</p>
                                <p>{contact.handle}</p>
                            </div>
                            <button className='contact-remove'
                                onClick={() => removeContact(contact)}>
                                Remove
                            </button>
                        </li>
                    ))}
                </ol>
            </div>
        );
    }
}

export default ListContacts;