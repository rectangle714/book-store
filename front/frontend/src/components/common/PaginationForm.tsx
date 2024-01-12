import { useState, useEffect } from 'react';
import Pagination from 'react-js-pagination';
import { Stack } from '@mui/material';
import { Page } from 'components/item/Cart';
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