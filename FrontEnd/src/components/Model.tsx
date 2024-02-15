import React from 'react';
import {
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  Grid,
  Box,
  Divider,
} from '@mui/material';
import { DateTimeFormatter } from '../utils/DateFormatter';

interface TransactionData {
  transaction_id: string;
  created_at: string;
  amount: number;
  bank_description: string;
  from_account: string;
  payment_method: string;
  status: string;
  to_account: string;
}

const ModelContent: React.FC<TransactionData> = (data) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <Typography variant="h4">Transfer</Typography>
      </Grid>
      <Divider />
      <Divider />
      <Grid item xs={12} alignItems="center">
        <Typography variant="h4" color={data.amount < 0 ? 'error' : 'primary'}>
          {data.amount < 0 ? '-' : ''}${Math.abs(data.amount)}
        </Typography>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Typography variant="subtitle1">From {data.from_account}</Typography>
          <Typography variant="subtitle1">{DateTimeFormatter(data.created_at)}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="subtitle1">To {data.to_account}</Typography>
          <Typography variant="subtitle1">{DateTimeFormatter(data.created_at)}</Typography>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="subtitle1">Payment Method</Typography>
        <Typography variant="subtitle2">{data.payment_method}</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="subtitle1">Bank Description</Typography>
        <Typography variant="body2">{data.bank_description}</Typography>
      </Grid>
    </Grid>
  );
};

type ModelProps = {
  open: boolean;
  handleClose: () => void;
  data: TransactionData;
};

const Model: React.FC<ModelProps> = ({ open, handleClose, data }) => {
  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ padding: 0 }}>
        <Paper sx={{ p: 2, bgcolor: 'background.paper', display: 'flex', alignItems: 'center' }}>
          {/* Title content goes here */}
        </Paper>
      </DialogTitle>
      <DialogContent sx={{ padding: 2 }}>
        <Box sx={{ p: 3, bgcolor: 'background.paper' }}>
          <ModelContent {...data} />
        </Box>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'flex-end' }}>
        <Button variant="contained" color="secondary" onClick={handleClose}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Model;