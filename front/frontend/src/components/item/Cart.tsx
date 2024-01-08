// CartPage.tsx
import axios from 'axios';
import React, { useState } from 'react';
import { List, Typography } from '@mui/material';
import Styles from 'styles/item/Cart.module.css'
import CartItem from './CartItem';

export interface Book {
  id: number;
  title: string;
  price: number;
}

const getCartList = () => {
    // const URL = process.env.REACT_APP_API_URL + '/api/v1/cart/getCartList';
    // const result = axios.get(URL);
}

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<Book[]>([
    { id: 1, title: 'Book 1', price: 20 },
    { id: 2, title: 'Book 2', price: 30 },
    { id: 3, title: 'Book 3', price: 25 },
    { id: 4, title: 'Book 4', price: 20 },
    { id: 5, title: 'Book 5', price: 30 },
    { id: 6, title: 'Book 6', price: 25 },
    { id: 7, title: 'Book 7', price: 20 },
    { id: 8, title: 'Book 8', price: 30 },
    { id: 9, title: 'Book 9', price: 25 },
    { id: 10, title: 'Book 10', price: 25 }
  ]);

  const handleRemoveItem = (itemId: number) => {
    const updatedCart = cartItems.filter(item => item.id !== itemId);
    setCartItems(updatedCart);
  };

  return (
    <>
        <section style={{paddingTop: '100px', borderBottom: 'solid 3px black', verticalAlign:'center', minHeight:'100%'}}>
            <div style={{textAlign:'center'}}>
                <div style={{paddingBottom:'50px'}}>
                    <span style={{fontWeight: '500', fontSize: '24px', color: 'rgb(51, 51, 51)', lineHeight:'48px', paddingBottom:'50px'}}>장바구니</span>
                </div>
                <div style={{borderTop: 'solid 3px black'}}>
                    {cartItems.length > 0 ? (
                        <List>
                            {cartItems.map(item => (
                                <CartItem key={item.id} book={item} onRemove={handleRemoveItem} />
                            ))}
                        </List>
                    ) : (
                        <Typography variant="body1">장바구니가 비어 있습니다.</Typography>
                    )}
                </div>
            </div>
        </section>
    </>
  );
};

export default Cart;