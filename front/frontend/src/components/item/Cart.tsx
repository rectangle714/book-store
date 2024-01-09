import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { List, Table, Typography } from '@mui/material';
import { useAppSelect} from "store/configureStore";
import CartItem from './CartItem';

export interface Cart {
  cartId: number;
  category?: string;
  contents?: string;
  title?: string;
  price?: number;
  quantity?: number;
  storedFileName?: string;
}

const Cart: React.FC = () => {
  const email = useAppSelect((state) => state.userReducer.email);


  const getCartList = async () => {
    if(email != '') {
      const URL = process.env.REACT_APP_API_URL + '/cart/selectList?email='+email;
      const result = await axios.get(URL);
      if(result.data != null) {
        setCartItems(result.data);
        console.log(result.data);
      }
    }
}

  const [cartItems, setCartItems] = useState<Cart[]>([]);

  const handleRemoveItem = async (cartId: number) => {
    const URL = process.env.REACT_APP_API_URL + '/cart/delete';
    const result = await axios.post(URL, cartId);
    if(result.data == 'success') {
      alert('해당 상품이 삭제 되었습니다.');
      window.location.reload();
    } else {
      alert('삭제 작업 중 문제가 발생했습니다.');
    }
  };

  useEffect(() => {
    getCartList();
  }, []);

  return (
    <>
        <div style={{paddingBottom:'50px', paddingTop: '50px', textAlign:'center'}}>
          <span style={{fontWeight: '500', fontSize: '24px', color: 'rgb(51, 51, 51)', lineHeight:'48px'}}>장바구니</span>
        </div>
        <section style={{verticalAlign:'center', minHeight:'100%', width:'100%', display:'flex'}}>
            <div style={{textAlign:'center'}}>
                <div style={{borderTop: 'solid 3px black',borderBottom: 'solid 3px black'}}>
                    {cartItems.length > 0 ? (
                        <Table>
                            {cartItems.map(item => (
                                <CartItem key={item.cartId} book={item} onRemove={handleRemoveItem} />
                            ))}
                        </Table>
                    ) : (
                      <Table>
                        <tr style={{borderBottom:'1px solid black'}}>
                          <td style={{width:'720px', height:'150px'}}>
                            <Typography variant="body1">장바구니가 비어 있습니다.</Typography>
                          </td>
                        </tr>
                      </Table>
                    )}
                </div>
            </div>
            <div style={{width:'30%', padding:'20px', height:'300px'}}>
              <div style={{border:'3px solid grey', borderRadius:'10px', height:'100%'}}>
                <div style={{margin:'20px', height:'65%', textAlign:'center'}}>
                  <div style={{margin:'20px'}}>
                    <span style={{float:'left'}}>상품금액 : </span><span style={{float:'right'}}>35000원</span>
                  </div>
                </div>
                <div style={{border:'3px solid grey', margin:'20px', borderRadius:'10px', 
                  height:'15%', textAlign:'center', paddingTop:'8px'}}>
                  <div style={{verticalAlign:'middle', height:'100%'}}>결재버튼</div>
                </div>
              </div>
            </div>
        </section>
    </>
  );
};

export default Cart;