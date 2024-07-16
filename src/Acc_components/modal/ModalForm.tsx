import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useTheme } from '@mui/material';
import Translatable from '../translatable_text/Translatable';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '1px solid gray',
  boxShadow: 24,
  p: 6,
};

type Props = {
  openModal: boolean;
  handleClose: () => void;
  children: JSX.Element | JSX.Element[];
  title?: string;
  sx?: any;
}
export default function ModalForm({ openModal, handleClose, children, title, sx }: Props) {
  const theme = useTheme()
  return (
    <div>
      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={sx}
      >
        <Box sx={style}>
          <Typography color={theme.palette.primary.dark} variant="h4" mt={1} fontWeight="600">
            <Translatable>
              {title}
            </Translatable>
          </Typography>
          {children}
        </Box>
      </Modal>
    </div>
  );
}