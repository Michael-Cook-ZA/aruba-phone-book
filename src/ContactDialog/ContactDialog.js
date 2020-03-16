import React from 'react';
import {Dialog, DialogActions, DialogContent, DialogTitle} from '@material-ui/core/';
import {TextField, Button} from '@material-ui/core';
import './ContactDialog.css';

var emailFormat = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

class ContactDialog extends React.Component {
  constructor() {
    super();
    this.state = {
      contact: {
        id: "",
        name: "",
        surname: "",
        email: "",
        phone: ""
        },
      loaded: false,
      error: {}
    };
  }

//Takes the cotnact to be added or edited from props to state for editing
componentDidUpdate() {
  if(this.props.openDialog && !this.state.loaded) {
    this.setState({
      contact: this.props.updateContact,
      loaded: true
    });
  }
}

  handleClose() {
    this.setState({loaded: false});
    this.props.handleClose();
  }

  canBeSubmitted () {
        const contact = this.state.contact;
        return (
            contact.name.length > 0 &&
            contact.surname.length > 0 &&
            contact.phone.length > 2 &&
            (
              contact.email === "" ||
              emailFormat.test((contact.email).toLowerCase())
            )
        );
    }

  handleSubmit() {
    if(this.canBeSubmitted()) {
      this.setState({loaded: false});
      this.props.handleSubmit(this.state.contact);
    }
  }

  handleChange(event) {
    this.setState({
      contact: {
            ...this.state.contact,
            [event.target.id]: event.target.value
      }
    });
  }

//allows only numbers and + for phone numbers textfield
  handleChangeNumber(event){
    const onlyNums = event.target.value.replace(/^([+\d]{1}?)\d{2, }$/g, '');
    this.setState({
      contact: {
            ...this.state.contact,
            [event.target.id]: onlyNums
      }
    });
  }

//tests for errors on the textfield
  handleOnBlur(event) {
    if(event.target.value === "") {
      this.setState({
        error: {
              ...this.state.error,
              [event.target.id]: true
        }
      });
    } else if(this.state.error[event.target.id] === true) {
      this.setState({
        error: {
              ...this.state.error,
              [event.target.id]: false
        }
      });
    }
  }

  handleOnBlurPhone(event) {
    if(event.target.value.length  < 3) {
      this.setState({
        error: {
              ...this.state.error,
              [event.target.id]: true
        }
      });
    } else if(this.state.error[event.target.id] === true) {
      this.setState({
        error: {
              ...this.state.error,
              [event.target.id]: false
        }
      });
    }
  }

  handleOnBlurEmail(event) {
    if(event.target.value === "") {
      this.setState({
        error: {
              ...this.state.error,
              [event.target.id]: false
        }
      });
    } else if(emailFormat.test((event.target.value).toLowerCase())) {
      this.setState({
        error: {
              ...this.state.error,
              [event.target.id]: false
        }
      });
    } else {
      this.setState({
        error: {
              ...this.state.error,
              [event.target.id]: true
        }
      });
    }
  }


  render() {
    const { openDialog } = this.props;
    const { contact, error } = this.state;
    return (
      <div className="ContactDialog">
        <Dialog open={openDialog} onClose={() => this.handleClose()} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">{/*this.props.updateContact.name === "" ? "Add" : "Edit"*/"Add"} Contact</DialogTitle>
          <DialogContent>

            <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              label="First Name"
              type="text"
              fullWidth
              onBlur={(value) => this.handleOnBlur(value)}
              error={error.name}
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
              onBlur={(value) => this.handleOnBlur(value)}
              error={error.surname}
              onChange={(value) => this.handleChange(value)}
              value={contact.surname}
            />
            <TextField
              margin="dense"
              id="email"
              label="Email Address"
              type="email"
              fullWidth
              onBlur={(value) => this.handleOnBlurEmail(value)}
              error={error.email}
              onChange={(value) => this.handleChange(value)}
              value={contact.email}
            />
            <TextField
            required
              margin="dense"
              id="phone"
              label="phone"
              type="text"
              fullWidth
              onBlur={(value) => this.handleOnBlur(value)}
              error={error.phone}
              onChange={(value) => this.handleChangeNumber(value)}
              value={contact.phone}
            />

          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.handleClose()} color="primary">
              Cancel
            </Button>
            <Button
              onClick={() => this.handleSubmit()}
              color="primary"
              disabled={!this.canBeSubmitted()}
            >
              submit
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}


export default ContactDialog
