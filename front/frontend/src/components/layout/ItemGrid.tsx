import * as React from 'react';
import { useAppDispatch } from "../../store/configureStore";
import { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { allItemInfo } from '../../store/modules/item';
import { useAppSelect } from "../../store/configureStore";

const ItemGrid = () => {
  const [spacing, setSpacing] = useState(2);
  const dispatch = useAppDispatch();
  const [rows, setRows] = useState<any[]>([]);
  const isLogin = useAppSelect((state) => state.userReducer.isLogin);
  

  const getItemList = async () => {
      const result = await dispatch(allItemInfo());
      console.log('아이템 조회 완료 ',result);
      if(result.payload != undefined) {
          setRows(result.payload);
      }
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
                    height: 200,
                    width: 195,
                    backgroundColor: (theme) =>
                      theme.palette.mode === 'dark' ? '#1A2027' : 'white',
                    // border: '2px solid black',
                    textAlign: 'left'
                  }}
                >
                {<img 
                  src={value.fileList[0].storedFileName}
                  alt='logo image' 
                  style={{ width:198, height:200, cursor:"pointer" }}
                />}
                </Paper>
                <div style={{textAlign:'left'}}>{value.title}</div>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default ItemGrid;