import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {getTotalCartPrice, getTotalCartQuantity} from "./cartSlice.js";
import {formatCurrency} from "../../utils/helpers.js";

function CartOverview() {
    const totalCartQuamtity = useSelector(getTotalCartQuantity)
    const totalCartPrice = useSelector(getTotalCartPrice)

    if(!totalCartQuamtity) return null

  return (
    <div className="bg-stone-800 text-stone-200 sm:px-6 uppercase p-4 text-sm md:text-base flex justify-between">
      <p className="font-semibold text-stone-300 space-x-4 sm:space-x-6">
        <span>{totalCartQuamtity} pizzas</span>
        <span>{formatCurrency(totalCartPrice)}</span>
      </p>
        <Link to='/cart'>Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
