import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@mui/material';
import { COLORS_APP } from '../../constants/Colors';

const ConfirmationDialog = ({
  open,          
  onClose,       
  onConfirm,   
  title,          
  message,
  confirmText = "Confirmar", 
  cancelText = "Cancelar",   
  confirmColor = 'error',    
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="confirmation-dialog-title"
      aria-describedby="confirmation-dialog-description"
    >
      <DialogTitle id="confirmation-dialog-title" sx={{ fontWeight: 'bold', color: COLORS_APP.text.primary }}>
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="confirmation-dialog-description" sx={{ color: COLORS_APP.text.secondary }}>
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose} sx={{ color: COLORS_APP.text.primary, textTransform: 'none' }}>
          {cancelText}
        </Button>
        <Button
          onClick={onConfirm}
          variant="contained"
          sx={{
            backgroundColor: confirmColor === 'error' ? COLORS_APP.status.error : COLORS_APP.brand_COLORS_APP.stemine_purple,
            color: COLORS_APP.white,
            textTransform: 'none',
            '&:hover': {
              backgroundColor: confirmColor === 'error' ? COLORS_APP.status.error_light : COLORS_APP.brand_COLORS_APP.stemine_purple_dark,
            },
          }}
          autoFocus 
        >
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;