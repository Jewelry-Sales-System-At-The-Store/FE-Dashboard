import React from 'react';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { InputLabel, FormControl, Select, MenuItem } from '@mui/material';

function StaffEditForm({ open, onClose, onSubmit, staff }) {
    const [formState, setFormState] = useState({
        username: '',
        fullName: '',
        email: '',
        gender: '',
        password: '',
        roleId: ''
    });

    useEffect(() => {
        if (staff) {
            setFormState({
                username: staff.username,
                fullName: staff.fullName,
                email: staff.email,
                gender: staff.gender,
                password: staff.password,
                roleId: staff.roleId
            });
        }
    }, [staff]);

    const handleChange = (event) => {
        setFormState({ ...formState, [event.target.name]: event.target.value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit({ ...formState, userId: staff.userId });
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Edit Staff</DialogTitle>
            <DialogContent>
                <TextField
                    margin="dense"
                    name="username"
                    label="User Name"
                    type="text"
                    fullWidth
                    value={formState.username}
                    onChange={handleChange}
                />
                <TextField
                    margin="dense"
                    name="fullName"
                    label="Full Name"
                    type="text"
                    fullWidth
                    value={formState.fullName}
                    onChange={handleChange}
                />
                <TextField
                    margin="dense"
                    name="email"
                    label="Email"
                    type="email"
                    fullWidth
                    value={formState.email}
                    onChange={handleChange}
                />
                <TextField
                    margin="dense"
                    name="gender"
                    label="Gender"
                    type="text"
                    fullWidth
                    value={formState.gender}
                    onChange={handleChange}
                />
                <TextField
                    margin="dense"
                    name="password"
                    label="Password"
                    type="password"
                    fullWidth
                    value={formState.password}
                    onChange={handleChange}
                />
                <FormControl fullWidth margin="dense">
                    <InputLabel id="role-label">Role ID</InputLabel>
                    <Select
                        labelId="role-label"
                        name="roleId"
                        label="Role ID"
                        value={formState.roleId}
                        onChange={handleChange}
                    >
                        <MenuItem value="2">Manager</MenuItem>
                        <MenuItem value="3">Staff</MenuItem>
                    </Select>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleSubmit}>Submit</Button>
            </DialogActions>
        </Dialog>
    );
}

StaffEditForm.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    staff: PropTypes.shape({
        userId: PropTypes.string,
        username: PropTypes.string,
        fullName: PropTypes.string,
        email: PropTypes.string,
        gender: PropTypes.string,
        password: PropTypes.string,
        roleId: PropTypes.string
    })
};

export default StaffEditForm;
