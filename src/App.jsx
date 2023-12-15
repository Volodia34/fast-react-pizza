import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Home from "./ui/Home.jsx";
import Menu, {loader as menuLoader} from "./features/menu/Menu.jsx";
import Cart from "./features/cart/Cart.jsx";
import CreateOrder, {action as createOrderAction} from "./features/order/CreateOrder.jsx";
import Order, {loader as orderLoader} from "./features/order/Order.jsx";
import AppLayout from "./ui/AppLayout.jsx";
import Error from "./ui/Error.jsx";
import {action as updateOrderAction} from './features/order/UpdateOrder.jsx'

const router = createBrowserRouter([
    {
        element: <AppLayout/>,
        errorElement: <Error/>,
        children: [
            {
                path: 'fast-react-pizza',
                element: <Home/>
            },
            {
                path: 'fast-react-pizza/menu',
                element: <Menu/>,
                loader: menuLoader,
                errorElement: <Error/>
            },
            {
                path: 'fast-react-pizza/cart',
                element: <Cart/>
            },
            {
                path: 'fast-react-pizza/order/new',
                element: <CreateOrder/>,
                action: createOrderAction
            },
            {
                path: 'fast-react-pizza/order/:orderId',
                element: <Order/>,
                loader: orderLoader,
                errorElement: <Error/>,
                action: updateOrderAction
            }
        ]
    }


])
const App = () => {
    return <RouterProvider router={router}/>
};

export default App;