
// Import styles
import { Box, ImageList, ImageListItem, Typography } from '@mui/material';
import ChildCard from 'src/components/shared/ChildCard';
import Translatable from '../translatable_text/Translatable';
import DeletableFile from 'src/Acc_pages/request_details/_components/DeletableFile';


type FileProps = {
  files: any
}

export default function FileDialogDeletable({ files }: FileProps) {

  return (
    <ChildCard>
      <Typography variant="h4"><Translatable>Files</Translatable></Typography>
      <Box>
        {files?.length === 0 && (
          <Box width='100%' minHeight='210px' display='flex' justifyContent='center' alignItems='center'>
            <Typography variant="h6" color='gray'fontWeight={600} fontSize={15} pt={1}>
              <Translatable>
                No files uploaded
              </Translatable>
            </Typography>
          </Box>
        )}
      </Box>

      <ImageList cols={3} gap={20}>
        {files?.map((file: {id: string, path: string, document_name: string}) => (
          <ImageListItem key={file?.id} sx={{ pt: 1}}>
            <DeletableFile file={file}/>
          </ImageListItem>
        ))}
      </ImageList>
    </ChildCard>
  )
}
