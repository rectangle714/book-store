import axios from 'axios';
import React, { useState, useEffect, Suspense } from 'react';
import { useNavigate } from "react-router-dom";
import { Table, Typography } from '@mui/material';
import { useAppSelect } from "store/configureStore";
import CartItem from './CartItem';
import PaginationForm from 'components/common/PaginationForm';
import { Iamport, RequestPayParams, RequestPayResponse } from 'store/modules/payment';

declare global {
  interface Window {
      IMP?: Iamport
  }
}

export interface Book {
  cartId: number;
  category?: string;
  contents?: string;
  title?: string;
  price?: number;
  quantity: number;
  storedFileName?: string;
}

export interface Page {
  totalDataCount: number;
  totalPageCount: number;
}

const Cart = () => {
  const isLogin = useAppSelect((state) => state.userReducer.isLogin);
  const email = useAppSelect((state) => state.userReducer.email);
  const navigation = useNavigate();
  
  const [cartItems, setCartItems] = useState<Book[]>([]);
  const [totalItemPrice, setTotalItemPrice] = useState(0);
  const [pageData, setPageData] = useState<Page>(Object);

  // 버튼 로직
  const handlePayment = () => {
    window.IMP?.init(process.env.REACT_APP_PAYMEMNTS_KEY+'');
    const amount: number = totalItemPrice;
    if (!amount) {
      alert('상품을 선택 후 주문해주세요.')
      return
    }
    const data: RequestPayParams = {
      pg: 'nice_v2.'+process.env.REACT_APP_PAYMEMNTS_PG_KEY,
      pay_method: 'card',
      merchant_uid: `orderNo${new Date().getTime()}`,
      amount: amount,
      buyer_tel: '00-000-0000',
      name:'주문명:결제테스트'
    }
    const callback = (response: RequestPayResponse) => {
      const { success, merchant_uid, error_msg, imp_uid, error_code } = response
      if (success) {
        console.log(response)
      } else {
        console.log(response)
      }
    }
    window.IMP?.request_pay(data, callback)
  }

  const getCartList = async (currentPage:number) => {
    const URL = process.env.REACT_APP_API_URL + '/cart/selectList?email='+email+'&page='+currentPage;
    console.log(isLogin);
    await axios.get(URL)
      .then(function(response) {
        if(response.data.content.length > 0) {
          setTotalItemPrice(response.data.content[0].totalBookPrice);
          setPageData({totalDataCount:response.data.totalElements, totalPageCount:response.data.totalPages});
          setCartItems(response.data.content);
        }
      })
      .catch(function(error) {
        console.log('error ', error);
        navigation('/', {replace:true})
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
      await axios.post(URL, cartId)
      .then(function(response) {
        if(response.data == 'success') {
          alert('해당 상품이 삭제 되었습니다.');
          window.location.reload();
        }
      }).catch(function(error) {
        console.log('error ',error);
        alert('삭제 작업 중 문제가 발생했습니다.');
      });
    }
  };

  const onOrder = () => {
    console.log('주문 버튼 이벤트');
  }

  useEffect(() => {
    if(isLogin) {
      getCartList(0);
    }
  }, []);

  return (
    <>
        <div style={{paddingBottom:'50px', textAlign:'center'}}>
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
                    <span style={{float:'left'}}>상품금액 : </span><span style={{float:'right', fontWeight:'600'}}>{totalItemPrice.toLocaleString()}</span>
                  </div>
                </div>
                <div onClick={onOrder} style={{border:'3px solid grey', margin:'20px', borderRadius:'10px',
                  height:'12%', textAlign:'center', paddingTop:'10px', cursor:'pointer', background:'#5055b1'}}>
                  <div style={{verticalAlign:'middle', height:'100%', color:'white', fontWeight:'500'}} onClick={()=>handlePayment()}>주문하기</div>
                </div>
              </div>
            </div>
        </section>
        <div style={{width:'65%'}}>
          {pageData.totalPageCount != undefined ? <PaginationForm pageData={pageData} getCartList={getCartList}/> : ''}
        </div>
    </>
  );
};

export default Cart;