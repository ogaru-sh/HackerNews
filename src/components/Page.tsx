import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Header from "./header/Header";
import ThreadList from "./ThreadList";
import actions from "../ts/action";

const Page = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		const init = async () => {
			await new Promise(() => dispatch(actions.init("new")));
		};
		init();
	}, []);
	return (
		<>
			<Header />
			<ThreadList />
		</>
	);
};

export default Page;
