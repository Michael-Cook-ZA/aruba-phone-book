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
      edit: "new",
      errors: {}
    };
  }

  handleDialog(){
  	this.setState({openDialog: true});

  }

  handleClose(){
  	this.setState({openDialog: false, edit: "new"});
  }
  handleEdit(contact){
    console.log(contact);
  	this.setState({
      openDialog: true,
      edit: contact,
    });

  }

contactDialogDisplay(){
  if (this.state.openDialog){
    return (
      <ContactDialog
        openDialog ={this.state.openDialog}
        handleClose={() => this.handleClose()}
        edit={this.state.edit}
      />
    );
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

        <ContactList handleEdit={(contact) => this.handleEdit(contact)}/>
        {this.contactDialogDisplay()}

    </div>
  )
  }
}

export default App;
