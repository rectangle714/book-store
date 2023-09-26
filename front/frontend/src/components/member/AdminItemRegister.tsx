import { useRef } from 'react';
import { Button, TextField, InputAdornment } from '@mui/material';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const AdminItemRegister = () => {

    const titleInputRef = useRef<HTMLInputElement>(null);
    const contentsInputRef = useRef<HTMLInputElement>(null);

    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
      });

    const itemSubmitHandler = async (event: React.FormEvent) => {
        event.preventDefault();
  
        const enterTitle = titleInputRef.current!.value;
        const enterContents = contentsInputRef.current!.value;
  
        console.log('enterTitle: ',enterTitle);
        console.log('enterContents: ',enterContents);
  
      }

    return (
        <form onSubmit={itemSubmitHandler}>
        <div>
          <div>상품명</div>
          <div>
            <TextField 
              variant='standard'
              autoComplete='true'
              id='title'
              inputRef={titleInputRef}
              InputProps={{
                startAdornment: (
                <InputAdornment position='start'>
                  {/* <EmailIcon /> */}
                </InputAdornment>
                ),
              }}
            />
          </div>
        </div>
        <div style={{paddingTop:30}}>
          <div>내용</div>
          <div>
            <TextField
              placeholder="상품 내용 입력"
              multiline
              inputRef={contentsInputRef}
              sx={{width:'500px'}}
              rows={2}
              maxRows={4}
            />
          </div>
        </div>
        <div style={{paddingTop:30}}>
          <div>
            이미지
          </div>
          <div style={{paddingTop:100}}>
            <Button color='success' component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                Upload file
                <VisuallyHiddenInput type="file" style={{display: "none"}} />
            </Button>
          </div>
        </div>
        <div style={{ paddingTop: 50 }}>
          <Button color='success' variant='contained' size="large" type='submit'>등록</Button>
        </div>
        </form>
    )
}

export default AdminItemRegister;