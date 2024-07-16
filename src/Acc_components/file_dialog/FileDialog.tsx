
// Import styles
import { Avatar, Box, ImageList, ImageListItem, Stack, Typography, useTheme } from '@mui/material';
import ChildCard from 'src/components/shared/ChildCard';
import Translatable from '../translatable_text/Translatable';
import { IconFile } from '@tabler/icons-react';


type FileProps = {
  files: any
}

export default function FileDialog({ files }: FileProps) {
  const theme = useTheme()
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
            <a style={{ color: 'gray' }} href={file?.path} target="_blank" key={file?.id} >
              <Stack
              direction="row"
              spacing={3}
              justifyContent="space-between"
                alignItems="center"
                sx={{ cursor: 'pointer'}}
                onClick={() => {''}}
              >
                <Stack spacing={2}>
                  <Avatar
                    variant="rounded"
                    sx={{ bgcolor: theme.palette.primary.light, color: theme.palette.primary.main, width: 150, height: 150 }}
                  >
                    <IconFile size={100} stroke={1}/>
                  </Avatar>
                  <Box>
                    <Typography variant="h6" mb="4px">
                      {file?.document_name}
                    </Typography>
                  </Box>
                </Stack>
              </Stack>
            </a>
          </ImageListItem>
        ))}
      </ImageList>
    </ChildCard>
  )
}
