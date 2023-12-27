import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { Button } from "@mui/joy";

const ItemModal = ({ modalValue, imgSrc, open, handleOpen, handleClose }:any) => {
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

  return (
    <>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div style={{textAlign:'center', display:'flex', height:'580px'}}>
              <div style={{ marginTop:'50px', marginBottom:'50px' ,flex:'1' }}>
                {imgSrc != '' && imgSrc != undefined ? <img
                  src={imgSrc}
                  alt='logo image'
                  style={{ width:300, height:400 }}/> : ''}
              </div>
              <div style={{paddingTop:'50px', paddingLeft:'50px', flex:'2'}}>
                <Typography id="modal-modal-title" variant="h5" component="h3" sx={{wordWrap:'break-word'}}>
                  {modalValue.title}
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2, textAlign:'right' }}>
                  가격 : {modalValue.price}
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2, textAlign:'right' }}>
                  분류 : {modalValue.category}
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  {modalValue.contents}
                </Typography>
              </div>
              <div style={{position:'relative', transform:'translateY(0%)', textAlign:'center'}}>
                <span onClick={handleOpen} style={{cursor:'pointer'}} className="material-symbols-outlined">close</span>
              </div>
            </div>
            <div style={{textAlign:'center'}}>
              {/* <Button>장바구니 담기</Button><Button>장바구니 담기</Button> */}
            </div>
          </Box>
        </Modal>
    </>
  );
};

export default ItemModal;