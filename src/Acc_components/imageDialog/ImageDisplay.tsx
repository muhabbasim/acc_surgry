import { Dialog, DialogContent, DialogTitle, ImageListItem } from "@mui/material"


type Props = {
  open: boolean;
  onClose: () => void;
  photo: string;
}

export default function ImageDisplay({ open, onClose, photo }: Props) {
  return (
    <Dialog
        open={open}
        onClose={onClose}
        maxWidth="lg"
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" variant="h5">
          Image Display
        </DialogTitle>
        <DialogContent>
          <ImageListItem>
            <img
              srcSet={`${photo} 1x, ${photo} 2x`}
              alt='photo'
              loading="lazy"
              style={{ borderRadius: 8, minWidth: '400px', maxHeight: '700px' }}
            />
          </ImageListItem>
        </DialogContent>
      </Dialog>
  )
}
