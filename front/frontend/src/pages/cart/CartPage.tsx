import { Container } from "@mui/material";
import Cart from "components/cart/Cart";

const CartPage = () => {
    return(
        <>
            <Container maxWidth="lg" sx={{position:'relative'}}>
                <Cart></Cart>
            </Container>
        </>
    )
}

export default CartPage;