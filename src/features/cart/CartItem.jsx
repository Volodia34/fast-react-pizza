import {formatCurrency} from "../../utils/helpers.js";
import DeleteItem from "./DeleteItem.jsx";
import UpdateItemQuantiity from "./UpdateItemQuantiity.jsx";
import {useSelector} from "react-redux";
import {getCurrentQuantityById} from "./cartSlice.js";

// eslint-disable-next-line react/prop-types
function CartItem({item}) {
    // eslint-disable-next-line react/prop-types
    const {pizzaId, name, quantity, totalPrice} = item;

    const currentQuantity = useSelector(getCurrentQuantityById((pizzaId)))

    return (
        <li className='py-3 sm:flex sm:items-center sm:justify-between'>
            <p className='mb-1 sm:mb-0'>
                {quantity}&times; {name}
            </p>
            <div className='flex justify-between items-center sm:gap-6'>
                <p className='text-sm font-bold'>{formatCurrency(totalPrice)}</p>
                <UpdateItemQuantiity pizzaId={pizzaId} currentQuantity={currentQuantity}/>
                <DeleteItem pizzaId={pizzaId}/>
            </div>
        </li>
    );
}

export default CartItem;
