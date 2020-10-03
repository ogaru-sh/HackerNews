import { useDispatch } from "react-redux";
import useInterval from "../lib/useInterval";
import Header from "./header/Header";
import ThreadList from "./ThreadList";

const Page = () => {
	const dispatch = useDispatch();

	// Tick the time every second
	useInterval(() => {
		dispatch({
			type: "TICK",
			light: true,
			lastUpdate: Date.now(),
		});
	}, 1000);

	return (
		<>
			<Header />
			<ThreadList />
		</>
	);
};

export default Page;
