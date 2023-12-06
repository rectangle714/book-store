import { useAppDispatch } from "../../store/configureStore";
import { useState, useEffect } from 'react';
import { allItemInfo, itemDetailInfo, recentRegisteredItem } from '../../store/modules/item';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { Button } from "@mui/material";

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

const ItemGrid = () => {
  const dispatch = useAppDispatch();
  const [spacing, setSpacing] = useState(2);
  const [rows, setRows] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  const [modalTitle, setModalTitle] = useState('');
  const [modalContents, setModalContents] = useState('');
  const [imgSrc, setImgSrc] = useState('');
  

  const getItemList = async () => {
      const result = await dispatch(recentRegisteredItem());
      if(result.payload != undefined) {
        setRows(result.payload);
      }
  }

  const handleOpen = async (arg:any, e:any) => {
    const result = await dispatch(itemDetailInfo(arg));
    if(result.payload != undefined) {
      setModalTitle(result.payload.title);
      setModalContents(result.payload.contents);
      if(result.payload.fileList[0] != undefined) {
        setImgSrc(result.payload.fileList[0].storedFileName);
      }
    }
    setOpen(true);
  }

  useEffect(() => {
    getItemList();
  },[]);

  return (
    <>
      <Grid sx={{ flexGrow: 2 }} container spacing={1}>
        <Grid item xs={12}>
          <Grid container justifyContent="center" spacing={spacing} style={{paddingTop:10, justifyContent:'left', paddingLeft:'70px'}}>
            {rows.map((value, index) => (
              <Grid key={value.id} item >
                <Paper
                  elevation={1}
                  sx={{
                    height: 204,
                    width: 140,
                    backgroundColor: (theme) =>
                      theme.palette.mode === 'dark' ? '#1A2027' : 'white', textAlign: 'left'
                  }}
                  onClick={(e) => {handleOpen(value.id, e)}}
                >
                {value.fileList[0] != undefined? <img 
                  src={value.fileList[0].storedFileName}
                  alt='logo image' 
                  style={{ width:140, height:204, cursor:"pointer" }}
                  item-id={value.id}
                /> : ''}
                </Paper>
                <div style={{textAlign:'center', width:'140px'}}>
                  <Typography  id="modal-modal-title" variant="body1" component="h3">{value.title}</Typography>
                </div>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
        <Box sx={style}>
          <div style={{textAlign:'center', display:'flex', height:'630px'}}>
            <div style={{ cursor:"pointer", marginTop:'50px', marginBottom:'50px' ,flex:'1' }}>
              {imgSrc != ''? <img
                src={imgSrc}
                alt='logo image'
                style={{ width:300, height:400 }}/> : ''}
            </div>
            <div style={{paddingTop:'50px', paddingLeft:'50px', flex:'2'}}>
              <Typography id="modal-modal-title" variant="h5" component="h3" sx={{wordWrap:'break-word'}}>
                {modalTitle}
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                {modalContents}
              </Typography>
            </div>
            <div style={{position:'relative', transform:'translateY(0%)', textAlign:'center'}}>
              <span onClick={() => {setOpen(false)}} style={{cursor:'pointer'}} className="material-symbols-outlined">close</span>
            </div>
          </div>
        </Box>
        </Modal>
      </div>
    </>
  );
}

export default ItemGrid;