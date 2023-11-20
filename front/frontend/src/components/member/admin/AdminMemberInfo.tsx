import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useState, useEffect } from 'react';
import { useAppDispatch } from "../../../store/configureStore";
import { allUserInfo } from "../../../store/modules/user"

const AdminMemberInfo = () => {

    const [rows, setRows] = useState([]);
    const dispatch = useAppDispatch();

    const rowData = async () => {

        const result = await dispatch(allUserInfo());
        if(result.payload != undefined) {
            setRows(result.payload);
        }
    }

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'email', headerName: '이메일', width: 130 },
        { field: 'nickname', headerName: '닉네임', width: 130 },
        {
          field: 'role',
          headerName: '권한',
          description: 'This column has a value getter and is not sortable.',
          sortable: false,
          width: 130,
          valueGetter: ({value}) => value=='USER'? '사용자':'관리자',
        },
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
            field: 'socialType',
            headerName: '가입경로',
            width: 150,
        }
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
                paginationModel: { page: 0, pageSize: 5 },
            },
            }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
        />
    </div>
    )
}

export default AdminMemberInfo;