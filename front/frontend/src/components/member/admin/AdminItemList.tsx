import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useAppDispatch } from "../../../store/configureStore";
import { useState, useEffect } from 'react';
import { allItemInfo, deleteItem } from '../../../store/modules/item';
import { Button } from '@mui/material';

const AdminItemList = () => {

    const [rows, setRows] = useState<any[]>([]);
    const [selectedRows, setSelectedRows] = useState<any[]>([]);
    const dispatch = useAppDispatch();

    const rowData = async () => {
        const result = await dispatch(allItemInfo());
        if(result.payload != undefined) {
            setRows(result.payload);
        }
    }

    const onRowsSelectionHandler = (ids:any) => {
        setSelectedRows(ids.map((id:any) => rows.find((row) => row.id === id)));
      };

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
                if(params.value[0] != undefined && params.value[0].storedFileName != '') {
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

    const deleteItems = async() => {
        if(selectedRows.length < 0) {
            console.log('삭제할 상품을 선택해주세요.');
        } else {
            console.log('selectedRows :', selectedRows);
            const result = await dispatch(deleteItem());
        }
    }

    useEffect(() => {
        rowData();
    },[]);

    return (
        <>
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    onRowSelectionModelChange={(ids) => onRowsSelectionHandler(ids)}
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
            <div style={{marginTop:'20px', textAlign:'right'}}>
                <Button style={{width: '10%', height:'50px'}} color='primary' variant='contained' onClick={deleteItems}>삭제</Button>
            </div>
        </>
    )
}

export default AdminItemList;