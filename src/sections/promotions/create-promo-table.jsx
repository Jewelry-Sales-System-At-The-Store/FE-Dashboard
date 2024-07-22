import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Autocomplete from '@mui/material/Autocomplete';

function PromotionForm({ open, onClose, onSubmit }) {
  const initialFormState = {
    type: '',
    discountRate: '',
    startDate: '',
    endDate: '',
    approveManager: '',
    description: '',
  };

  const [formState, setFormState] = React.useState(initialFormState);
  const [managers, setManagers] = useState([]);

  useEffect(() => {
    fetchManagers();
  }, []);

  const fetchManagers = async () => {
    try {
      const response = await axios.get('http://localhost:5188/api/User/GetUsers');
      const managerData = response.data.filter(user => user.roleName === 'Manager');
      setManagers(managerData);
    } catch (error) {
      console.error('Error fetching managers:', error);
    }
  };

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Ngăn chặn hành động submit mặc định của form
    onSubmit(formState); // Gọi addPromotion
    setFormState(initialFormState); // Clear các trường của form sau khi submit
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">New Promotion</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          name="type"
          label="Type"
          type="text"
          fullWidth
          onChange={handleChange}
          value={formState.type}
          InputProps={{ style: { marginBottom: 10 } }}
        />
        <TextField
          margin="dense"
          name="discountRate"
          label="Discount Rate"
          type="number"
          fullWidth
          onChange={handleChange}
          value={formState.discountRate}
          InputProps={{ style: { marginBottom: 10 } }}
        />
        <TextField
          margin="dense"
          name="startDate"
          label="Start Date"
          type="date"
          fullWidth
          InputLabelProps={{ shrink: true }}
          onChange={handleChange}
          value={formState.startDate}
          InputProps={{ style: { marginBottom: 10 } }}
        />
        <TextField
          margin="dense"
          name="endDate"
          label="End Date"
          type="date"
          fullWidth
          InputLabelProps={{ shrink: true }}
          onChange={handleChange}
          value={formState.endDate}
          InputProps={{ style: { marginBottom: 10 } }}
        />
        <Autocomplete
          options={managers}
          getOptionLabel={(option) => option.username}
          onChange={(event, value) => setFormState({ ...formState, approveManager: value ? value.userId : '' })}
          value={formState.approveManager}
          renderInput={(params) => (
            <TextField
              {...params}
              margin="dense"
              name="approveManager"
              label="Approval Manager"
              type="text"
              fullWidth
              InputProps={{ ...params.InputProps, style: { marginBottom: 10 } }}
            />
          )}
        />
        <TextField
          margin="dense"
          name="description"
          label="Description"
          type="text"
          fullWidth
          onChange={handleChange}
          value={formState.description}
          InputProps={{ style: { marginBottom: 10 } }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Submit</Button>
      </DialogActions>
    </Dialog>
  );
}

PromotionForm.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default PromotionForm;
