import { useRef, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Button, TextField, InputAdornment } from '@mui/material';
import { styled } from '@mui/material/styles';
import store from "../../../store/configureStore";
import { registerItem } from '../../../store/modules/item';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Item } from '../../../store/modules/item';

const AdminItemRegister = () => {
    const [imageSrc, setImageSrc]: any = useState(null);
    const [file, setFile] = useState<File>();
    const titleInputRef = useRef<HTMLInputElement>(null);
    const contentsInputRef = useRef<HTMLInputElement>(null);
    const item = useRef<Item>({ title: '', contents: ''});
    let navigate = useNavigate();

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

    const onSelectedFiles = async (e: any) => {
      let reader = new FileReader();

      reader.onload = function(e) {
          setImageSrc(e.target?.result);
      };
      reader.readAsDataURL(e.target.files[0]);
      setFile(e.currentTarget.files[0]);

    }

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

      const formData = new FormData();
      item.current = { title: enteredTitle, contents: enteredContents };
      formData.append('title', item.current.title);
      formData.append('contents', item.current.contents);
      if(file !== undefined){
        formData.append('file', file);
      }
      for(const data of formData) {console.log(data);}

      const result = await store.dispatch(registerItem(formData));

      console.log('payload: ',result.payload);
      if(result.payload == '200') {
        alert('상품을 등록했습니다.');
        window.location.reload();
      }

    }

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
          <div>
          <div style={{height:'200px', position:'relative'}}>
                <div style={{border:'solid 1px ', height:'210px', width:'210px', margin:'0 auto', borderRadius:'20px'}}>
                    <img src={imageSrc} style={{maxWidth:'100px',position:'absolute', top:'25%', left:'44%'}}/>
                </div>
            </div>
            <div style={{paddingTop:'20px'}}>
                <Button color='success' component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                    Upload
                    <VisuallyHiddenInput 
                    accept="image/*" 
                    multiple type="file"
                    // ref={fileInputRef}
                    onChange={e => onSelectedFiles(e)}
                    />
                </Button>
            </div>
          </div>
        </div>
        <div style={{ paddingTop: 50 }}>
          <Button color='success' variant='contained' size="large" onClick={itemSubmitHandler}>등록</Button>
        </div>
        </form>
    )
}

export default AdminItemRegister;