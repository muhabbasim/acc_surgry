import { Dialog, DialogContent, DialogTitle, ImageListItem } from "@mui/material"


type Props = {
  open: boolean;
  onClose: () => void;
  video: any;
}

export default function VideoDisplay({ open, onClose, video }: Props) {
  return (
    <Dialog
        open={open}
        onClose={onClose}
        maxWidth="lg"
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" variant="h5">
          Video Display
        </DialogTitle>
        <DialogContent>
          <ImageListItem>
            <video
              autoPlay
              src={video.path}
              style={{ borderRadius: 8, minWidth: '400px', maxHeight: '700px' }}
            />
          </ImageListItem>
        </DialogContent>
      </Dialog>
  )
}
