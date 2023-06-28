import React from 'react';

import { Fragment } from 'react';
import MainNavigation from './MainNavigation';
import BottomNav from './BottomNav';

type Props = {
    children?: React.ReactNode
}

const Layout: React.FC<Props> = (props) => {

    return (
        <Fragment>
            <MainNavigation />
            <main>{props.children}</main>
            <footer><BottomNav/></footer>
        </Fragment>
    )
}

export default Layout;