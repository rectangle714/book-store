import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useAppDispatch } from "../../store/configureStore";
import { useState, useEffect } from 'react';
import { allItemInfo } from '../../store/modules/item';

const AdminItemList = () => {

    const [rows, setRows] = useState([]);
    const dispatch = useAppDispatch();

    const rowData = async () => {

        const result = await dispatch(allItemInfo());
        console.log('아이템 조회 완료 ',result);
        if(result.payload != undefined) {
            setRows(result.payload);
        }
    }

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'title', headerName: '제목', width: 130 },
        { field: 'contents', headerName: '내용', width: 130 },
        { 
            field: 'registerDate',
            headerName: '등록날짜', 
            width: 150,
            type: 'date',
            valueGetter: ({ value }) => value && new Date(value),
        },
        { 
            field: 'updateDate', 
            headerName: '수정날짜', 
            width: 150,
            type: 'date',
            valueGetter: ({ value }) => value && new Date(value),
        },
        { 
            field: 'fileList', 
            headerName: '이미지', 
            width: 150,
            renderCell: (params) => {
                if(params.value[0].storedFileName != '') {
                    console.log('params ', params.value[0].storedFileName);
                    return (
                      <>
                        <img 
                        src={'../'+params.value[0].storedFileName}
                        style={{ width:40, height:40}}/>
                      </>
                    );
                }
              }
        },
      ];

    useEffect(() => {
        rowData();
    },[]);

    return (
        <div style={{ height: 400, width: '100%' }}>
        <DataGrid
            getRowId={(row) => row.id}
            rows={rows}
            columns={columns}
            initialState={{
            pagination: {
                paginationModel: { page: 0, pageSize: 10 },
            },
            }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
        />
    </div>
    )
}

export default AdminItemList;