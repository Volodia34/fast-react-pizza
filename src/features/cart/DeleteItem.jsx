import Button from "../../ui/Button.jsx";
import {useDispatch} from "react-redux";
import {deleteItem} from "./cartSlice.js";

// eslint-disable-next-line react/prop-types
const DeleteItem = ({pizzaId}) => {
    const dispatch = useDispatch()
    return (
        <div>
            <Button type='small' onClick={() => dispatch(deleteItem(pizzaId))}>Delete</Button>
        </div>
    );
};

export default DeleteItem;