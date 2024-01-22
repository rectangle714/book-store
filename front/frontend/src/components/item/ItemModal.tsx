import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { useAppSelect} from "store/configureStore";
import axios from 'axios';

type Cart = {
  itemId? : Object,
  email? : Object,
  quantity? : Object
}

const ItemModal = ({ modalValue, imgSrc, open, handleOpen, handleClose }:any) => {
  const email = useAppSelect((state) => state.userReducer.email);
  const isLogin = useAppSelect((state) => state.userReducer.isLogin);

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    height: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const onClickButton = async () => {
    const URL = process.env.REACT_APP_API_URL + '/cart/save';
    let param:Cart = {};
    param.itemId = modalValue.itemId;
    param.email = email;
    param.quantity = 1;
    const result = await axios.post(URL, param);
    if(result.data === 'success') {
      alert('장바구니에 담겼습니다.');
    } else {
      alert('장바구니 담기 실패했습니다.');
    }
    handleClose();
  }

  return (
    <>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div style={{position:'relative', transform:'translateY(0%)', textAlign:'right'}}>
              <span onClick={handleOpen} style={{cursor:'pointer'}} className="material-symbols-outlined">close</span>
            </div>
            <div>
              <div style={{borderBottom:'3px solid #eaeaea', padding:'10px', textAlign:'center'}}>
                <Typography id="modal-modal-title" variant="h5" component="h3" sx={{wordWrap:'break-word', fontWeight:'800'}}>
                  {modalValue.title}
                </Typography>
              </div>
            </div>
            <div style={{textAlign:'center', display:'flex', height:'500px'}}>
              <div style={{paddingTop:'5px', marginBottom:'50px' ,flex:'1' }}>
                {imgSrc != '' && imgSrc != undefined ? <img
                  src={imgSrc}
                  alt='logo image'
                  style={{ width:300, height:400 }}/> : ''}
              </div>
              <div style={{ paddingLeft:'50px', flex:'2'}}>
                <div style={{borderBottom:'3px solid #eaeaea', padding:'5px'}}>
                  <Typography id="modal-modal-description" sx={{ mt: 1, textAlign:'left' }}> 가격 </Typography>
                  <Typography sx={{ mt: 1, textAlign:'right', fontWeight:'600' }}>{modalValue.price.toLocaleString()} 원</Typography>
                </div>
                <div style={{borderBottom:'3px solid #eaeaea', padding:'5px'}}>
                  <Typography id="modal-modal-description" sx={{ mt: 1, textAlign:'left' }}>분류 </Typography>
                  <Typography id="modal-modal-description" sx={{ mt: 1, textAlign:'right', fontWeight:'600' }}>{modalValue.category}</Typography>
                </div>
                <div style={{padding:'5px'}}>
                  <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    {modalValue.contents}
                  </Typography>
                </div>
              </div>
            </div>
            <div style={{textAlign:'center'}}>
              {
                isLogin ? <Button style={{width: '50%'}} color='success' variant='outlined' type='submit' onClick={onClickButton}>장바구니 담기</Button> : ''
              }
            </div>
          </Box>
        </Modal>
    </>
  );
};

export default ItemModal;