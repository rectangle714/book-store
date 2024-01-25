import { Container } from "@mui/material";
import ItemDetail from "components/item/ItemDetail"

const ItemDetailPage = () => {
    return (
        <>
            <Container style={{minHeight:'100vh'}}>
                <ItemDetail></ItemDetail>
            </Container>
        </>
    )
}

export default ItemDetailPage;