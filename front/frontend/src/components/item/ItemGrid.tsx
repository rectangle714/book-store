import { useAppDispatch } from "store/configureStore";
import { useState, useEffect } from 'react';
import { itemDetailInfo, recentRegisteredItem } from 'store/modules/item';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import ItemModal from "./ItemModal";

interface modalValue {
  itemId: string,
  title: string,
  contents: string,
  price: number,
  category: string
}

const ItemGrid = () => {
  const dispatch = useAppDispatch();
  const [spacing, setSpacing] = useState(2);
  const [rows, setRows] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const modalClose = () => setOpen(false);

  const [imgSrc, setImgSrc] = useState('');
  const [modalValue, setModalValue] = useState<modalValue>(
    {itemId: '', title: '', contents: '', price: 0, category: ''}
  );

  const getItemList = async () => {
      const result = await dispatch(recentRegisteredItem());
      if(result.payload != undefined) {
        setRows(result.payload);
      }
  }

  const handleOpen = async (arg:any, e:any) => {
    e.stopPropagation();
    const result = await dispatch(itemDetailInfo(arg));
    if(result.payload != undefined) {
      setModalValue({itemId:result.payload.itemId, title:result.payload.title, contents:result.payload.contents,
        price:result.payload.price, category:result.payload.category});
      if(result.payload.saveFileList[0] != undefined) {
        setImgSrc(process.env.REACT_APP_FILE_URL + result.payload.saveFileList[0].storedFileName);
      }
    }
    setOpen(() => true);
  }

  useEffect(() => {
    getItemList();
  },[]);

  return (
    <>
      <div>
        <Grid sx={{ flexGrow: 2, height: '512px'}} container spacing={1}>
          <Grid item xs={12}>
            <Grid container justifyContent="center" spacing={spacing} style={{paddingTop:10, justifyContent:'left', paddingLeft:'70px', overflow: 'auto' }}>
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
                    src={process.env.REACT_APP_FILE_URL + value.fileList[0].storedFileName}
                    alt='logo image'
                    style={{ width:140, height:204, cursor:"pointer" }}
                    item-id={value.id}
                  /> : ''}
                  </Paper>
                  <div style={{textAlign:'center', width:'140px'}}>
                    <span style={{fontFamily: 'Noto Sans KR, sans-serif'}}>{value.title}</span>
                  </div>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </div>
      <div>
        <ItemModal modalValue={modalValue} imgSrc={imgSrc} open={open} handleOpen={handleOpen} handleClose={modalClose} ></ItemModal>
      </div>
    </>
  );
}

export default ItemGrid;