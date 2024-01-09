import React from 'react';
import { ListItem, ListItemText, ListItemSecondaryAction, IconButton, ListItemIcon, ListItemAvatar, ListItemButton, Button } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { Cart } from './Cart';

interface CartItemProps {
  book: Cart;
  onRemove: (itemId: number) => void;
}

const CartItem: React.FC<CartItemProps> = ({ book, onRemove }) => {
  return (
    <tr style={{borderBottom:'1px solid black'}}>
      <td style={{width:'80px', height:'150px'}}>
        <ListItemIcon>
          <img src={book.storedFileName != undefined ?process.env.REACT_APP_FILE_URL + book.storedFileName : ''} 
            style={{ width:'82px', height:'121px', cursor:"pointer" }}alt='logo image'/>
        </ListItemIcon>
      </td>
      <td style={{width:'500px', textAlign:'left'}}>
        <div>
          <div style={{fontWeight:'600', paddingLeft:'10px'}}>{book.title}</div>
          <div style={{fontWeight:'500', paddingLeft:'20px'}}>{`${book.price}원`}</div>
        </div>
      </td>
      <td>
        <div style={{textAlign:'right'}}>
          <IconButton onClick={()=> onRemove(book.cartId)}>
            <ClearIcon style={{cursor:'pointer'}}/>
          </IconButton>
        </div>
        <div style={{paddingRight:'30px', textAlign:'right'}}>
          <span>{book.price}원</span>
        </div>
        <div style={{textAlign:'right'}}>
          <Button style={{border:'2px'}}>-</Button>1<Button>+</Button>
        </div>
      </td>
    </tr>
  );
};

export default CartItem;