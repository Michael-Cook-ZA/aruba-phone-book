import React from 'react';
import {Table, TableBody, TableContainer, TableCell,  TableHead, TableRow} from '@material-ui/core/';
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@material-ui/core/';
import {Paper, Grid, Button } from '@material-ui/core/';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import './ContactList.css';


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

class ContactList extends React.Component {
  constructor() {
    super();

    this.state = {
      contacts:JSON.parse(localStorage.getItem('contacts')) || contacts,
      deleteID: ""
    };
  }


  componentDidUpdate(prevProps) {
    if(prevProps.updateContact !== this.props.updateContact && this.props.updateContact !== "") {
      const editedContact = this.props.updateContact
      var newContacts = this.state.contacts

      if(newContacts.findIndex(x => x.id === editedContact.id) === -1 && this.props.updateContact.name.length > 0) {
        newContacts.push(editedContact)
      } else {
        newContacts[newContacts.findIndex(x => x.id === editedContact.id)] = editedContact
      }
      this.setState({contacts: newContacts})
      localStorage.setItem('contacts', JSON.stringify(newContacts));
    }
  }

  handleDelete(id) {
    this.setState({deleteID: id})
  };

  handleDeleteCancel() {
    this.setState({deleteID: ""})
  };

  handleDeleteConfirm() {
    const id = this.state.deleteID
    var newContacts = this.state.contacts.filter(function(item) { return item.id !== id; });
    this.setState({contacts: newContacts, deleteID: ""})
    localStorage.setItem('contacts',  JSON.stringify(newContacts));

  };

  handleEdit(id) {
    var contact = this.state.contacts.find(x => x.id === id)
    this.props.handleEdit(contact);
  };

  actions (id) {
     return (
       <Grid container>
        <Grid item>
          <Button
            id={id}
            onClick={() => this.handleDelete(id)}
          >
            <DeleteIcon/>
          </Button>
        </Grid>
        <Grid item>
          <Button
            onClick={() => this.handleEdit(id)}
            id={id}
          >
            <EditIcon/>
          </Button>
        </Grid>
       </Grid>
     )
  }



  render() {
    const {contacts} = this.state;
    return (
      <div className="ContactList">
      <TableContainer className="contactTable" component={Paper}>
      <Table  aria-label="phone book table">
        <TableHead stickyHeader >
          <TableRow>
            <TableCell><h3>Action</h3></TableCell>
            <TableCell><h3>Name</h3></TableCell>
            <TableCell ><h3>Surname</h3></TableCell>
            <TableCell ><h3>Email</h3></TableCell>
            <TableCell ><h3>Phone Number</h3></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {contacts.map(contact => (
            <TableRow key={contact.id}>
              <TableCell>
                {this.actions(contact.id)}
              </TableCell>
              <TableCell>{contact.name}</TableCell>
              <TableCell>{contact.surname}</TableCell>
              <TableCell>{contact.email}</TableCell>
              <TableCell>{contact.phone}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </TableContainer>


      <Dialog
        open = {this.state.deleteID !== ""}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        onClose={() => this.handleDeleteCancel()}
      >
        <DialogTitle id="alert-dialog-title">{"Delete Contact"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this contact
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={() => this.handleDeleteCancel()}>
            No
          </Button>
          <Button onClick={() => this.handleDeleteConfirm()} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>






      </div>
    )
  }
}


export default ContactList
