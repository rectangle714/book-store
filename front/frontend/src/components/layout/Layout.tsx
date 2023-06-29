import React from 'react';

import { Fragment } from 'react';
import Header from './Header';
import Footer from './Footer';
import Styles from './Layout.module.css';

type Props = {
    children?: React.ReactNode
}

const Layout: React.FC<Props> = (props) => {

    return (
        <Fragment>
            <Header />
            <main className={Styles.main}>
                {props.children}
            </main>
            <Footer />
        </Fragment>
    )
}

export default Layout;