import Container from '@mui/material/Container';
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
        </Container>
    )
}

export default MainPage;