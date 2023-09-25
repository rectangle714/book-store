import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { useState, useEffect } from 'react';
import { useAppSelect, useAppDispatch } from "../../store/configureStore";
import { allUserInfo } from "../../store/modules/user"

const AdminMemberInfo = () => {

    let [rows, setRows] = useState([]);
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
          field: 'authority',
          headerName: '권한',
          description: 'This column has a value getter and is not sortable.',
          sortable: false,
          width: 160,
          valueGetter: ({value}) => value=='ROLE_USER'? '사용자':'관리자',
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