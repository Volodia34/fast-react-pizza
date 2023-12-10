import LinkButton from "../../ui/LinkButton.jsx";
import Button from "../../ui/Button.jsx";
import CartItem from "./CartItem.jsx";
import {useDispatch, useSelector} from "react-redux";
import {clearCart, getCart} from "./cartSlice.js";
import EmptyCart from "./EmptyCart.jsx";

// const fakeCart = [
//   {
//     pizzaId: 12,
//     name: 'Mediterranean',
//     quantity: 2,
//     unitPrice: 16,
//     totalPrice: 32,
//   },
//   {
//     pizzaId: 6,
//     name: 'Vegetale',
//     quantity: 1,
//     unitPrice: 13,
//     totalPrice: 13,
//   },
//   {
//     pizzaId: 11,
//     name: 'Spinach and Mushroom',
//     quantity: 1,
//     unitPrice: 15,
//     totalPrice: 15,
//   },
// ];

function Cart() {
  // eslint-disable-next-line no-unused-vars
  const username = useSelector(state => state.user.username)
  const cart = useSelector(getCart);
  const dispatch = useDispatch()

  if(!cart.length) return <EmptyCart/>

  return (
    <div className='px-4 py-3'>
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>

      <h2 className='texy-xl font-semibold border-b mt-7'>Your cart, {username}</h2>

      <ul className='mt-3 divade-y divide-stone-200 border-b'>
        {cart.map((item)=> <CartItem item={item} key={item.pizzaId}/>)}
      </ul>

      <div className='mt-6 space-x-2 flex'>
        <Button to='/order/new' type='prymary'>Order pizzas</Button>
        <Button type='secondary' onClick={() => dispatch(clearCart())}>Clear cart</Button>
      </div>
    </div>
  );
}

export default Cart;
