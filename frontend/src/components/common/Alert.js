import React from 'react';
import { Alert as MuiAlert, Snackbar } from '@mui/material';
import { useSnackbar } from 'notistack';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const GlobalAlert = () => {
  const { closeSnackbar, enqueueSnackbar } = useSnackbar();

  return (
    <Snackbar
      open={false}
      autoHideDuration={6000}
      onClose={closeSnackbar}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <Alert severity="success" sx={{ width: '100%' }}>
        This is a success message!
      </Alert>
    </Snackbar>
  );
};

export const InlineAlert = ({ severity, message, onClose }) => {
  return (
    <Alert severity={severity} onClose={onClose} sx={{ mb: 2 }}>
      {message}
    </Alert>
  );
};

export default Alert;