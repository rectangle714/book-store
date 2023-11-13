import { useState } from 'react';
import Container from '@mui/material/Container';
import { Tabs, Tab, Box } from '@mui/material';
import Styls from'../../../styles/member/Admin.module.css';
import { useAppDispatch } from "../../../store/configureStore";
import AdminMemberInfo from '../admin/AdminMemberInfo';
import AdminItemRegister from '../admin/AdminItemRegister';
import AdminItemList from '../admin/AdminItemList';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
  }

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const Admin = () => {

    const [value, setValue] = useState(0);
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
      setValue(newValue);
    };

    return (
        <Container maxWidth="md" fixed className={Styls.container}>
          <section style={{
            minHeight:'84.8vh',
            display:'flex',
            flexDirection:'column',
            alignItems:'center',
            justifyContent:'center'
          }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider'}}>
                <Tabs centered={true} value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="회원정보" {...a11yProps(0)} />
                    <Tab label="상품등록" {...a11yProps(1)} />
                    <Tab label="상품조회" {...a11yProps(2)} />
                </Tabs>
            </Box>
            {/* 회원정보 */}
            <TabPanel value={value} index={0}>
              <AdminMemberInfo></AdminMemberInfo>
            </TabPanel>
            {/* 상품등록 */}
            <TabPanel value={value} index={1}>
              <AdminItemRegister></AdminItemRegister>
            </TabPanel>
            {/* 상품조회 */}
            <TabPanel value={value} index={2}>
              <AdminItemList></AdminItemList>
            </TabPanel>
          </section>
        </Container>
    )
}

export default Admin;