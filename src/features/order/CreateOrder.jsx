// eslint-disable-next-line no-unused-vars
import { useState } from "react";
// eslint-disable-next-line no-unused-vars
import {Form, redirect, useActionData, useNavigation} from "react-router-dom";
import Button from "../../ui/Button.jsx";
import {useDispatch, useSelector} from "react-redux";
// eslint-disable-next-line no-unused-vars
import {clearCart, getCart, getTotalCartPrice} from "../cart/cartSlice.js";
import EmptyCart from "../cart/EmptyCart.jsx";
// eslint-disable-next-line no-unused-vars
import {createOrder} from "../../services/apiRestaurant.js";
// eslint-disable-next-line no-unused-vars
import store from "../../store.js";
import {formatCurrency} from "../../utils/helpers.js";
import {fetchAddress} from "../user/userSlice.js";

// https://uibakery.io/regex-library/phone-number
// eslint-disable-next-line no-unused-vars
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );
//
// const fakeCart = [
//   {
//     pizzaId: 12,
//     name: "Mediterranean",
//     quantity: 2,
//     unitPrice: 16,
//     totalPrice: 32,
//   },
//   {
//     pizzaId: 6,
//     name: "Vegetale",
//     quantity: 1,
//     unitPrice: 13,
//     totalPrice: 13,
//   },
//   {
//     pizzaId: 11,
//     name: "Spinach and Mushroom",
//     quantity: 1,
//     unitPrice: 15,
//     totalPrice: 15,
//   },
// ];

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const {username, status:addressStatus, position, address,error:errorAddress} = useSelector(state => state.user)
  const isLoadingAddress = addressStatus === 'loading'
  const navifation = useNavigation()
  const isSubmitting = navifation.state === 'submitting'

  // eslint-disable-next-line no-unused-vars

  const formErrors = useActionData()
  const dispatch = useDispatch()

  const cart = useSelector(getCart);

  const totalCartPrice = useSelector(getTotalCartPrice)
  const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0

  const totalPrice = totalCartPrice + priorityPrice

  if(!cart.length) return <EmptyCart/>


  return (
    <div className='px-4 py-6'>
      {/* eslint-disable-next-line react/no-unescaped-entities */}
      <h2 className='text-xl font-semibold mb-8'>Ready to order? Let's go!</h2>



      <Form method='POST'>
        <div className='mb-5 flex gap-2 flex-col sm:flex-row sm:items-center'>
          <label className='sm:basis-40'>First Name</label>
          <input className='input grow' type="text" name="customer" defaultValue={username} required />
        </div>

        <div className='mb-5 flex gap-2 flex-col sm:flex-row sm:items-center'>
          <label className='sm:basis-40'>Phone number</label>
          <div className='grow'>
            <input className='input w-full' type="tel" name="phone" required />
          {formErrors?.phone && <p className='text-xs mt-2 text-red-700 bg-red-100 p-2 rounded-md'>{formErrors.phone}</p>}
          </div>
        </div>

        <div className='mb-5 flex gap-2 flex-col sm:flex-row sm:items-center relative'>
          <label className='sm:basis-40'>Address</label>
          <div className='grow'>
            <input className='input w-full' type="text" name="address" disabled={isLoadingAddress} defaultValue={address} required/>
            {addressStatus === 'error' && <p className='text-xs mt-2 text-red-700 bg-red-100 p-2 rounded-md'>{errorAddress}</p>}
          </div>

          {!position.latitude && !position.longitude && <span className='absolute sm:right-[3px] top-[3px] md:top[5px] z-50'>
            <Button disabled={isLoadingAddress} type='small' onClick={(e) => {
              e.preventDefault()
              dispatch(fetchAddress())
            }}>Get position</Button>
          </span>}
        </div>



        <div className='mb-12 flex items-center gap-5'>
          <input
              className='h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2'
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority" className='font-medium'>Want to yo give your order priority?</label>
        </div>

        <div>
          <input type="hidden" name='cart' value={JSON.stringify(cart)}/>
          <input type="hidden" name='position' value={position.longitude && position.latitude ?`${position.latitude}, ${position.longitude}`: ''}/>
          <Button disabled={isSubmitting || isLoadingAddress} type='prymary'
          >{isSubmitting ? 'Placing order....' : `Order now from ${formatCurrency(totalPrice)}`}</Button>
        </div>
      </Form>
    </div>
  );
}



export async function action({request}) {
  const formData = await request.formData()
  const data = Object.fromEntries(formData)


  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === 'true'
  }


  const errors = {}
  if(!isValidPhone(order.phone))

    errors.phone = 'Please give u s your correct phone number. We might need it to contact you.';

  if(Object.keys(errors).length > 0) return errors;

  const newOrder = await createOrder(order)

  store.dispatch(clearCart())

  return redirect(`/order/${newOrder.id}`)

}

export default CreateOrder;
