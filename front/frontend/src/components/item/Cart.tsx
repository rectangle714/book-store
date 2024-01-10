import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Table, Typography } from '@mui/material';
import { useAppSelect} from "store/configureStore";
import CartItem from './CartItem';
import PaginationForm from 'components/common/PaginationForm';

export interface Book {
  cartId: number;
  category?: string;
  contents?: string;
  title?: string;
  price?: number;
  quantity: number;
  storedFileName?: string;
}

const Cart: React.FC = () => {
  const isLogin = useAppSelect((state) => state.userReducer.isLogin);
  const email = useAppSelect((state) => state.userReducer.email);

  const [cartItems, setCartItems] = useState<Book[]>([]);
  const [totalItemPrice, setTotalItemPrice] = useState(0);

  const getCartList = async () => {
    const URL = process.env.REACT_APP_API_URL + '/cart/selectList?email='+email;
    await axios.get(URL)
    .then(function(response) {
      console.log('data ',response.data);
      response.data.content.forEach((data:any) => {
        const itemPrice = data.price * data.quantity;
        setTotalItemPrice((value) => {return value + itemPrice});
      });
      setCartItems(response.data.content);
    });
  }

  const renderTotalPrice = (flag:any, bookPrice:number) => {
    if(flag == 'increse') {
      setTotalItemPrice(totalItemPrice + bookPrice);
    } else {
      setTotalItemPrice(totalItemPrice - bookPrice);
    }
  }

  const handleRemoveItem = async (cartId: number) => {
    if(window.confirm('해당 상품을 삭제 하시겠습니까?')) {
      const URL = process.env.REACT_APP_API_URL + '/cart/delete';
      const result = await axios.post(URL, cartId);
      if(result.data == 'success') {
        alert('해당 상품이 삭제 되었습니다.');
        window.location.reload();
      } else {
        alert('삭제 작업 중 문제가 발생했습니다.');
      }
    }
  };

  const onOrder = () => {
    console.log('주문 버튼 이벤트');
  }

  useEffect(() => {
    if(isLogin) {
      getCartList();
    }
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
                                <CartItem key={item.cartId} book={item} onRemove={handleRemoveItem} renderTotalPrice={renderTotalPrice} />
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
            <div style={{width:'30%', padding:'15px', height:'300px', paddingTop:'0px'}}>
              <div style={{border:'3px solid grey', borderRadius:'10px', height:'100%'}}>
                <div style={{margin:'20px', height:'65%', textAlign:'center'}}>
                  <div style={{margin:'20px'}}>
                    <span style={{float:'left'}}>상품금액 : </span><span style={{float:'right'}}>{totalItemPrice.toLocaleString()}</span>
                  </div>
                </div>
                <div onClick={onOrder} style={{border:'3px solid grey', margin:'20px', borderRadius:'10px',
                  height:'12%', textAlign:'center', paddingTop:'10px', cursor:'pointer', background:'#5055b1'}}>
                  <div style={{verticalAlign:'middle', height:'100%', color:'white', fontWeight:'500'}}>주문하기</div>
                </div>
              </div>
            </div>
        </section>
        <div>
          <PaginationForm />
        </div>

    </>
  );
};

export default Cart;