import { Icon } from '@iconify/react'
import Pill from '../Pill';

const CartWidget = () => {

    return(
        <div className='cart-widget'>
            <Pill quantity={0} />
            <Icon className='cart-widget__cart' icon="mdi:cart" />
        </div>
    );
};

export default CartWidget;