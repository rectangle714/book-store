import Container from '@mui/material/Container';
import { GET } from "../../store/fetch-auth-action";
import ItemGrid from './ItemGrid';
import Styls from'./MainPage.module.css'
import Slider from './Slider';
import Admin from '../member/Admin';

const MainPage = () => {

    return (
        <Container maxWidth="md" fixed className={Styls.container}>
          <Slider/>
          <ItemGrid/>
          <ItemGrid/>
          <Admin/>
        </Container>
    )
}

export default MainPage;