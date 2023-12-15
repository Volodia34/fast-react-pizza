import CreateUser from "../features/user/CreateUser.jsx";
import {useSelector} from "react-redux";
import Button from "./Button.jsx";

function Home() {
    const username = useSelector(state => state.user.username)
    console.log(username)
  return (
    <div className='my-10 sm:my-16 text-center px-4 '>
      <h1 className="mb-8 text-center text-xl font-semibold md:text-3xl">
        The best pizza.
        <br />
          <span className="text-yellow-500">
              Straight out of the oven, straight to you.
          </span>
      </h1>
        {username === '' ? <CreateUser/> : <Button to='menu' type='prymary'>Continuue ordering, {username}</Button>}
    </div>
  );
}

export default Home;
