import React from 'react';
import { Button, Grid, TextField } from '@material-ui/core/';

import './App.css';
import ContactList from './ContactList.js';
import ContactDialog from './ContactDialog.js';



var contacts= [
  {id: 0, name: "Peter", surname: "Smith", email: "peter@smithfamily.co.za", phone: "0768443453"},
  {id: 1, name: "Peter", surname: "van Riebeek", email: "peter@gmail.co.za", phone: "0768443453"},
  {id: 2, name: "Jan", surname: "van der Merwve", email: "vandermervwe@family.co.za", phone: "0768443453"},
  {id: 3, name: "Tom", surname: "Smith", email: "tompetersmith@gmail.co.za", phone: "0768443453"},
  {id: 4, name: "Peter", surname: "Smith", email: "peter@smithfamily.co.za", phone: "0768443453"},
  {id: 5, name: "Peter", surname: "Smith", email: "peter@smithfamily.co.za", phone: "0768443453"},
  {id: 6, name: "Peter", surname: "Smith", email: "peter@smithfamily.co.za", phone: "0768443453"},
  {id: 7, name: "Peter", surname: "Smith", email: "peter@smithfamily.co.za", phone: "0768443453"},
  {id: 8, name: "Peter", surname: "Smith", email: "peter@smithfamily.co.za", phone: "0768443453"},
  {id: 9, name: "Peter", surname: "Smith", email: "peter@smithfamily.co.za", phone: "0768443453"},
  {id: 10, name: "Peter", surname: "Smith", email: "peter@smithfamily.co.za", phone: "0768443453"},
  {id: 11, name: "Peter", surname: "Smith", email: "peter@smithfamily.co.za", phone: "0768443453"},
  {id: 12, name: "Peter", surname: "Smith", email: "peter@smithfamily.co.za", phone: "0768443453"},
  {id: 13, name: "Peter", surname: "Smith", email: "peter@smithfamily.co.za", phone: "0768443453"},
  {id: 14, name: "Peter", surname: "Smith", email: "peter@smithfamily.co.za", phone: "0768443453"},
  {id: 15, name: "Peter", surname: "Smith", email: "peter@smithfamily.co.za", phone: "0768443453"},
  {id: 16, name: "Fredrick", surname: "Smith", email: "fredrick@smithfamily.co.za", phone: "0768443453"},
  {id: 17, name: "Luke", surname: "Smith", email: "luke@smithfamily.co.za", phone: "0768443453"},
  {id: 18, name: "Thomas", surname: "Page", email: "thomaspage@hotmail.co.za", phone: "0768443453"},
  {id: 19, name: "Harry", surname: "de Haast", email: "harry@dehaastfamily.co.za", phone: "0768443453"}
]



class App extends React.Component {
  constructor() {
    super();
    this.state = {
      contacts:JSON.parse(localStorage.getItem('contacts')) || contacts.sort( this.compare ),
      openDialog:false,
      updateContact: "",
      search:"",
      searchContacts: []
    };
  }

  handleNew() {
  	this.setState({
      openDialog: true,
      updateContact: {
        id: Math.random(),
        name: "",
        surname: "",
        email: "",
        phone: "",
      }
    });

  }

  handleClose() {
    this.setState({
      openDialog: false,
    });
  }

   compare(a, b) {
    if (a.surname.toLowerCase() < b.surname.toLowerCase()) {
      return -1;
    }
    if (a.surname.toLowerCase() > b.surname.toLowerCase()) {
      return 1;
    }
    return 0;
  }

  handleEdit(contact) {
  	this.setState({
      openDialog: true,
      updateContact: contact,
    });
  }

  handleSubmit(updatedContact) {
    var newContacts = this.state.contacts;

    if(newContacts.findIndex(x => x.id === updatedContact.id) === -1 ) {
      newContacts.push(updatedContact);
    } else {
      newContacts[newContacts.findIndex(x => x.id === updatedContact.id)] = updatedContact;
    }
    newContacts.sort( this.compare );
    this.setState({contacts: newContacts, openDialog: false,}, this.handleSearch);
    localStorage.setItem('contacts', JSON.stringify(newContacts));

  }

handleDelete(deleteID) {
  var newContacts = this.state.contacts.filter(function(item) { return item.id !== deleteID; });
  newContacts.sort( this.compare );
  this.setState({contacts: newContacts}, this.handleSearch);
  localStorage.setItem('contacts',  JSON.stringify(newContacts));

}

handleChange(event) {
  this.setState({search: event.target.value}, this.handleSearch);

}

handleSearch() {
  const search = this.state.search;

  if(search !== ""){
    const searchContacts = this.state.contacts.filter(function(item) {
      return (
        item.name.toLowerCase().includes(search) ||
        item.surname.toLowerCase().includes(search) ||
        item.email.toLowerCase().includes(search) ||
        item.phone.toLowerCase().includes(search)
      );
    });
    this.setState({searchContacts: searchContacts});
  }
}



  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Grid
            container
            alignItems="center"
          >
            <Grid item xs>
              <TextField
                className="SearchBar"
                margin="dense"
                variant="filled"
                id="search"
                label="Search"
                type="text"
                onChange={(value) => this.handleChange(value)}
                value={this.state.search}
              />
            </Grid>
            <Grid item xs>
              <h2>
                Aruba phone Book
              </h2>
            </Grid>
            <Grid item xs>
              <Button
                aria-label="add"
                color="secondary"
                onClick={() => this.handleNew()}
              >
                Add contact
              </Button>
            </Grid>
          </Grid>
        </header>

        <ContactList
          handleEdit={(contact) => this.handleEdit(contact)}
          updateContact={this.state.updateContact}
          handleDelete={(deleteID) => this.handleDelete(deleteID)}
          contacts={this.state.search === "" ? this.state.contacts : this.state.searchContacts}

        />
        <ContactDialog
          openDialog ={this.state.openDialog}
          handleClose={() => this.handleClose()}
          handleSubmit={(updatedContact) => this.handleSubmit(updatedContact)}
          updateContact={this.state.updateContact}
        />
    </div>
  )
  }
}


export default App;
