import { useRef } from 'react';
import { Button, TextField, InputAdornment } from '@mui/material';

import Preview from '../common/Preview';
import { Item } from '../../store/modules/item';

const AdminItemRegister = () => {

    const titleInputRef = useRef<HTMLInputElement>(null);
    const contentsInputRef = useRef<HTMLInputElement>(null);

    const item = useRef<Item>({ title: '', contents: '', originName: '', storedName: ''});

    const itemSubmitHandler = async (event: React.FormEvent) => {
      event.preventDefault();
  
      const enterTitle = titleInputRef.current!.value;
      const enterContents = contentsInputRef.current!.value;

      if(enterTitle == '' || enterTitle == undefined) {
        alert('제목을 입력해주세요');
        return;
      }

      if(enterContents == '' || enterContents == undefined) {
        alert('내용을 입력해주세요');
        return;
      }

      
  
    }

    return (
        <form onSubmit={itemSubmitHandler} encType='multipart/form/data'>
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
          <div style={{paddingBottom:'20px'}}>
            이미지
          </div>
          <div><Preview/></div>
        </div>
        <div style={{ paddingTop: 50 }}>
          <Button color='success' variant='contained' size="large" type='submit'>등록</Button>
        </div>
        </form>
    )
}

export default AdminItemRegister;