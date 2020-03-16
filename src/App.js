import React from 'react';
import { Button, Grid, TextField } from '@material-ui/core/';

import './App.css';
import ContactList from './ContactList/ContactList.js';
import ContactDialog from './ContactDialog/ContactDialog.js';

var contacts= [
  {id: 0, name: "Peter", surname: "Smith", email: "peter@smithfamily.co.za", phone: "0768443451"},
  {id: 1, name: "Peter", surname: "van Riebeek", email: "peter@gmail.co.za", phone: "0768443452"},
  {id: 2, name: "Jan", surname: "van der Merwve", email: "vandermervwe@family.co.za", phone: "0768443453"},
  {id: 3, name: "Tom", surname: "Smith", email: "tompetersmith@gmail.co.za", phone: "0768443454"},
  {id: 4, name: "Harry", surname: "Smith", email: "Harry@smithfamily.co.za", phone: "0768443455"},
  {id: 5, name: "Tommy", surname: "Smith", email: "Tommy@smithfamily.co.za", phone: "0768443456"},
  {id: 6, name: "Henry", surname: "Smith", email: "Henry@smithfamily.co.za", phone: "0768443457"},
  {id: 7, name: "Peter", surname: "Cook", email: "peter@cookfamily.co.za", phone: "0768443458"},
  {id: 8, name: "Peter", surname: "Zondagh", email: "peter@zondaghfamily.co.za", phone: "0768443459"},
  {id: 9, name: "Peter", surname: "Storey", email: "peter@storeyfamily.co.za", phone: "0768443410"},
  {id: 10, name: "ashleigh", surname: "Smith", email: "ashleigh@smithfamily.co.za", phone: "0768443411"},
  {id: 11, name: "Tal", surname: "Smith", email: "Tal@smithfamily.co.za", phone: "0768443412"},
  {id: 12, name: "Vicky", surname: "Smith", email: "Vicky@smithfamily.co.za", phone: "0768443413"},
  {id: 13, name: "courtney", surname: "Smith", email: "courtney@smithfamily.co.za", phone: "0768443414"},
  {id: 14, name: "christie", surname: "Smith", email: "christie@smithfamily.co.za", phone: "0768443415"},
  {id: 15, name: "michelle", surname: "Smith", email: "michelle@smithfamily.co.za", phone: "0768443416"},
  {id: 16, name: "Fredrick", surname: "Zondagh", email: "fredrick@zondaghfamily.co.za", phone: "0768443417"},
  {id: 17, name: "Luke", surname: "Smith", email: "luke@smithfamily.co.za", phone: "0768443418"},
  {id: 18, name: "Thomas", surname: "Page", email: "thomaspage@hotmail.co.za", phone: "0768443419"},
  {id: 19, name: "Harry", surname: "de Haast", email: "harry@dehaastfamily.co.za", phone: "0768443420"}
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

//handles adding a new contact to open contact Dialog
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

  handleEdit(contact) {
  	this.setState({
      openDialog: true,
      updateContact: contact,
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

//handles when a new or edited contact is submitted and stored client side
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
  const search = this.state.search.toLowerCase();


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
                className="Search-bar"
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
