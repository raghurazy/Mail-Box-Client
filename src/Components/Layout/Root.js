import React, { Fragment } from "react";
import { Outlet } from "react-router-dom";
import Authentication from "../Authentication/Authentication";
import Header from "../Header/Header";

const RootLayout = (props) => {
    return (
        <Fragment>
            <Header />
            <Outlet />
        </Fragment>
    )
}

export default RootLayout;