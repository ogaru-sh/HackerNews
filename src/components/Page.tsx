import { useDispatch, useSelector } from "react-redux";
import Header from "./header/Header";
import ThreadList from "./ThreadList";
import { AppState } from "../ts/state";

const Page = () => {
	const dispatch = useDispatch();
	const props = useSelector((state: AppState) => state.result);
	return (
		<>
			<Header />
			<ThreadList />
		</>
	);
};

export default Page;
