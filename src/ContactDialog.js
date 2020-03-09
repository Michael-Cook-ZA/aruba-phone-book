import React from 'react';
import {Dialog, DialogActions, DialogContent, DialogTitle} from '@material-ui/core/';
import {TextField, Button} from '@material-ui/core';
import './ContactDialog.css';


class ContactDialog extends React.Component {
  constructor() {
    super();
    this.state = {
      contact: "new",
      errors: {},

    };

  }


  handleClose() {
    this.props.handleClose();
  };

  handleChange(event) {
    this.setState({
      contact: {
            ...this.state.contact,
            [event.target.name]: event.target.value
      }
    })
  };

  render() {
    const {openDialog} = this.props;
    const {contact} = this.state;



    return (
      <div className="ContactDialog">
        <Dialog open={openDialog} onClose={() => this.handleClose()} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Add Contact</DialogTitle>
          <DialogContent>

            <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              label="First Name"
              type="text"
              fullWidth
              onChange={(value) => this.handleChange(value)}
              value={contact.name}
            />
            <TextField
              required
              margin="dense"
              id="surname"
              label="Surname"
              type="text"
              fullWidth
              value={contact.surname}
            />
            <TextField

              margin="dense"
              id="email"
              label="Email Address"
              type="email"
              fullWidth
              value={contact.email}
            />
            <TextField
              required
              margin="dense"
              id="number"
              label="phone number"
              type="text"
              fullWidth
              value={contact === "new"? "" :  contact.phone}
            />

          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.handleClose()} color="primary">
              Cancel
            </Button>
            <Button onClick={() => this.handleClose()} color="primary">
              submit
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

export default ContactDialog
