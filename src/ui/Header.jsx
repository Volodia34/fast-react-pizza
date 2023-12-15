import {Link} from "react-router-dom";
import SearchOrder from "../features/order/SearchOrder.jsx";
import Username from "../features/user/Username.jsx";

const Header = () => {
    return (
        <header className="bg-yellow-400 uppercase px-4 py-3 border-b 200 sm:px-6 flex items-center justify-between ">
            <Link to='/fast-react-pizza' className="tracking-widest">Fast react pizza co.</Link>

            <SearchOrder/>

            <Username/>
        </header>
    );
};

export default Header;