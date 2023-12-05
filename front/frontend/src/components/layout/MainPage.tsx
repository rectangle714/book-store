import Container from '@mui/material/Container';
import ItemGrid from './ItemGrid';
import Styls from'../../styles/layout/MainPage.module.css';
import Slider from './Slider';
import Typography from '@mui/material/Typography';

const MainPage = () => {

    return (
      <>
        <Slider/>
        <Container fixed className={Styls.container}>
          <Typography id="modal-modal-title" variant="h5" component="h3">최근 추가된 책</Typography>
          <ItemGrid/>
          <div style={{paddingTop:'60px'}}>
            <Typography id="modal-modal-title" variant="h5" component="h3">게시판</Typography>
          </div>
        </Container>
      </>
    )
}

export default MainPage;