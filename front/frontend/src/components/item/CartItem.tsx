import React from 'react';
import { ListItem, ListItemText, ListItemSecondaryAction, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Book } from './Cart';

interface CartItemProps {
  book: Book;
  onRemove: (itemId: number) => void;
}

const CartItem: React.FC<CartItemProps> = ({ book, onRemove }) => {
  return (
    <ListItem>
      <ListItemText primary={book.title} secondary={`$${book.price}`} />
      <ListItemSecondaryAction>
        <IconButton edge="end" onClick={() => onRemove(book.id)} aria-label="delete">
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default CartItem;