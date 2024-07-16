import { Box, Button, Fab, Stack, useTheme } from '@mui/material';
import { IconEdit, IconPhoto, IconTrash } from '@tabler/icons-react';
import ImageUploading from 'react-images-uploading';
import Translatable from 'src/Acc_components/translatable_text/Translatable';

type ImageProps = {
  setImages: any
  setImagesValue: any
  images: any
  imagesValue: any
}

export function ReactMultiImageUpload({ setImages, imagesValue, setImagesValue, images }: ImageProps) {
  const maxNumber = 3;
  const theme = useTheme()
  const onChange = (imageList: any) => {
    setImages(imageList);
    setImagesValue(imageList);
  };

  return (
    <div>
      <ImageUploading
        multiple
        value={imagesValue}
        onChange={onChange}
        maxNumber={maxNumber}
        dataURLKey="data_url"
        acceptType={['jpg', 'png', 'jpeg']}
        maxFileSize={2000000} // in Bytes
      >
        {({
          imageList,
          onImageUpload,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps,
          errors,
          // acceptType,
        }) => (

          <div className="upload__image-wrapper">
            {images.length === 0 && 
              <Box
                display={'flex'} justifyContent={'center'} alignItems={'center'}
                sx={{ height: '150px', border: '1px solid #dfe5ef', backgroundColor: '#f4f7fc' , cursor: 'pointer' }}
                style={isDragging ? { color: 'green' } : undefined}
                onClick={onImageUpload}
                {...dragProps}
              >
                <Stack direction="row" gap={1} alignItems="center">
                  <Fab size="small" color="primary">
                    <IconPhoto size="16" />
                  </Fab>
                  <Button variant="text" color="inherit" component="label">
                    <Translatable>
                      Click or Drop here
                    </Translatable>
                  </Button>
                </Stack>
              </Box>
            }
            
            <Box display={'flex'} gap={2}>
              {Array.isArray(imageList) && imageList.map((image, index) => (
                <div key={index} className="image-item">
                  <img src={image['data_url']} alt="images" width="100%" height={70} style={{objectFit: 'cover'}}/>
                  <div>
                    <Box display={'flex'} gap={2}>
                      <Button sx={{ width: '100%', height: '35px'}} onClick={() => onImageUpdate(index)}>
                        <IconEdit width={20} />
                      </Button>
                      <Button color='error'sx={{ width: '100%', height: '35px'}} onClick={() => onImageRemove(index)}>
                        <IconTrash width={20}/>  
                      </Button>
                    </Box>
                  </div>
                </div>
              ))}
            </Box>

            {errors && 
              <Box mt={1} color={theme.palette.error.main}>
                {errors.maxNumber && <span>Max number of selected images allowed is 2</span>}
                {errors.acceptType && <span>Only image type 'png', 'jpg' is allowed</span>}
                {errors.maxFileSize && <span>Selected file size exceed maxFileSize</span>}
              </Box>
            }
          </div>
        )}
      </ImageUploading>
    </div>
  );
}