import { useState, useEffect } from 'react';
import Pagination from '@mui/material/Pagination';
import { Stack } from '@mui/material';

export interface Page {
    totalPage: number;
    totalElements: number;
}

export default function PaginationForm() {

    const [page, setPage] = useState(1); // 처음 페이지는 1이다.

    const handlePage = (event:any) => {
        const nowPageInt = parseInt(event.target.outerText);
        setPage(nowPageInt);
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
            <Stack direction="row" justifyContent="center" sx={{ flexWrap: "wrap" }}>
                <Pagination boundaryCount={2} style={{width:'80%'}} count={10} defaultPage={1} onChange={(e) => handlePage(e)}/>
            </Stack>
        </>
    )
}