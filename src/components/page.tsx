import { useDispatch } from "react-redux";
import useInterval from "../lib/useInterval";
import ButtonUi from "./Sample";
import Header from "./Header";

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
		</>
	);
};

export default Page;
