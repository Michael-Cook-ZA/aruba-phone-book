import React from 'react';
import { Table, TableBody, TableContainer, TableCell,  TableHead, TableRow, TablePagination } from '@material-ui/core/';
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@material-ui/core/';
import {Paper, Grid, Button } from '@material-ui/core/';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import './ContactList.css';

export default function ContactList (props) {
  const [deleteID, setDeleteID] = React.useState('');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const {contacts} = props;

  const handleDeleteConfirm = ()=> {
    props.handleDelete(deleteID);
    setDeleteID("");
  };

  const handleEdit = (id) => {
    console.log();
    props.handleEdit(props.contacts.find(x => x.id === id));
  };

  const handleChangePage = (event, newPage) => {
     setPage(newPage)
  };

  const handleChangeRowsPerPage = (event) => {
     setRowsPerPage(+event.target.value);
     setPage(0);
  };

  const actions = (id) => {
     return (
       <Grid container>
        <Grid item>
          <Button
            id={id}
            onClick={() => setDeleteID(id)}
          >
            <DeleteIcon/>
          </Button>
        </Grid>
        <Grid item>
          <Button
            onClick={() => handleEdit(id)}
            id={id}
          >
            <EditIcon/>
          </Button>
        </Grid>
       </Grid>
     )
  }

  return (

    <div className="ContactList">
    <Paper className="contactTable">
      <TableContainer  className="contactTableContainer" >
      <Table stickyHeader  className="" aria-label="phone book table">
        <TableHead  >
          <TableRow>
            <TableCell><h3>Action</h3></TableCell>
            <TableCell><h3>Name</h3></TableCell>
            <TableCell ><h3>Surname</h3></TableCell>
            <TableCell ><h3>Email</h3></TableCell>
            <TableCell ><h3>Phone Number</h3></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {contacts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(contact => (
            <TableRow key={contact.id}>
              <TableCell>
                {actions(contact.id)}
              </TableCell>
              <TableCell>{contact.name}</TableCell>
              <TableCell>{contact.surname}</TableCell>
              <TableCell>{contact.email}</TableCell>
              <TableCell>{contact.phone}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table >
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={contacts.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
      </TableContainer >
    </Paper>

    <Dialog
      open = {deleteID !== ""}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      onClose={() => setDeleteID("")}
    >
      <DialogTitle id="alert-dialog-title">{"Delete Contact"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure you want to delete this contact
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={() => setDeleteID("")}>
          No
        </Button>
        <Button onClick={() => handleDeleteConfirm()} color="primary" autoFocus>
          Yes
        </Button>
      </DialogActions>
    </Dialog>

    </div>
  )
}
