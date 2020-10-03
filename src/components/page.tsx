import { useDispatch } from "react-redux";
import Header from "./header/Header";
import ThreadList from "./ThreadList";

const Page = () => {
	const dispatch = useDispatch();

	return (
		<>
			<Header />
			<ThreadList />
		</>
	);
};

export default Page;
