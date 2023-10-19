import { useRef, useState } from 'react';
import { Button, TextField, InputAdornment } from '@mui/material';
import store from "../../store/configureStore";
import { registerItem } from '../../store/modules/item';

import Preview from '../common/Preview';
import { Item } from '../../store/modules/item';

const AdminItemRegister = () => {

    const titleInputRef = useRef<HTMLInputElement>(null);
    const contentsInputRef = useRef<HTMLInputElement>(null);

    const [selectedFiles, setSelectedFiles] = useState(null as any);
    const item = useRef<Item>({ title: '', contents: ''});

    const itemSubmitHandler = async (event: React.FormEvent) => {
      event.preventDefault();
  
      const enteredTitle = titleInputRef.current!.value;
      const enteredContents = contentsInputRef.current!.value;

      if(enteredTitle == '' || enteredTitle == undefined) {
        alert('제목을 입력해주세요');
        return;
      }

      if(enteredContents == '' || enteredContents == undefined) {
        alert('내용을 입력해주세요');
        return;
      }

      item.current = { title: enteredTitle, contents: enteredContents };
      console.log('아이템: ', item.current);

      const result = await store.dispatch(registerItem(item.current));

      if(result.payload != undefined) {
        console.log(result);
      }

    }

    const getSelectedFiles = (v:any) => {
      setSelectedFiles(v);
    }

    // const registFile = async (id:any) => {
    //   const formData = new FormData();

    //   //request로 보내야할 데이터를 formData에 넣어서 보냈다. 
    //   for (let i = 0; i < selectedFiles.length; i++) {
    //     formData.append('file', selectedFiles[i]);
    //   }
    //   formData.append('type', 'itemQna');
    //   // 서버에서 받은 id값 사용
    //   formData.append('targetId', id);
    // }

    return (
        <form encType='multipart/form/data'>
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
              name='contents'
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
          <Button color='success' variant='contained' size="large" onClick={itemSubmitHandler}>등록</Button>
        </div>
        </form>
    )
}

export default AdminItemRegister;