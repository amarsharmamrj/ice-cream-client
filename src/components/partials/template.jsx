import React, { useContext } from 'react';
import PropTypes from 'prop-types'

import TopBar from './navbar/topBar';
import Footer from './footer/footer';
import { CartContext } from '../../contexts/cartContext';

const Template = (props ) => {
    const { cart, setCart } = useContext(CartContext);

    const mainContainer = {
        padding: '0rem 0 2rem 0',
    }
    return (
        <div>
            <TopBar cart={cart} />
                <div style={mainContainer}>
                    {props.children }
                </div>
            <Footer />
        </div>
    )
}

Template.propTypes = {
    children: PropTypes.any,
}

export default Template;