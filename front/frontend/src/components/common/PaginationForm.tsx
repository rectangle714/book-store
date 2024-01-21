import { useState, useEffect } from 'react';
import Pagination from 'react-js-pagination';
import { Stack } from '@mui/material';
import { Page } from 'components/cart/Cart';
import 'styles/common/Pagination.css';

interface pageProps {
    pageData?: Page;
    getCartList: (currentPage:number) => void;
}

export default function PaginationForm({pageData, getCartList}:pageProps) {

    const [page, setPage] = useState(1);
    const handlePage = (event:any) => {
        const nowPageInt = event;
        setPage(nowPageInt);
        getCartList(nowPageInt-1);
    }
    
    useEffect(() => {
        // setData(/* fetch(또는 전체 데이터에서 slice)로 현재 page의 데이터를 가져온다. */);
        // 한 페이지에 10개씩 보여준다.
        // if(page === LAST_PAGE){ // 마지막 페이지는 데이터가 10개보다 부족할 수도 있다.
        //   setData(dummydata.slice(10 * (page - 1)));
        // } else {
        //   setData(dummydata.slice(10 * (page - 1), 10 * (page - 1) + 10));
        // }  
    }, [page]);

    return(
        <>
            <Stack className={'pagingDiv'} justifyContent="center" sx={{float:'right', position:'relative', left:'-45%' }}>
                <Pagination
                    activePage={page}
                    itemsCountPerPage={5}
                    totalItemsCount={pageData?.totalDataCount!}
                    pageRangeDisplayed={5}
                    prevPageText={"<"}
                    nextPageText={">"}
                    onChange={e =>handlePage(e)}
                />
            </Stack>
        </>
    )
}