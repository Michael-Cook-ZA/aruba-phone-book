import React from 'react';
import {Button, Grid} from '@material-ui/core/';

import './App.css';
import ContactList from './ContactList.js';
import ContactDialog from './ContactDialog.js';
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      openDialog:false,
      updateContact: "",
    };
  }


  handleDialog(){
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

  handleClose(){
    this.setState({
      openDialog: false,
    });
  }

  handleSubmit(updatedContact){
  	this.setState({
      openDialog: false,
      updateContact: updatedContact,
    });
  }

  handleEdit(contact){
  	this.setState({
      openDialog: true,
      updateContact: contact,
    });
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
                onClick={() => this.handleDialog()}
              >
                Add contact
              </Button>
            </Grid>
          </Grid>
        </header>

        <ContactList handleEdit={(contact) => this.handleEdit(contact)} updateContact={this.state.updateContact}/>
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
