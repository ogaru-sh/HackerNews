import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Header from "./header/Header";
import ThreadList from "./ThreadList";
import actions from "../ts/action";
import { AppState } from "../ts/state";
import moment from "moment";

const Page = () => {
	const dispatch = useDispatch();
	const props = useSelector((state: AppState) => state);
	const [time, setTime] = useState(moment());
	useEffect(() => {
		let tabName = props.tabName;
		if (!tabName) {
			dispatch(actions.init("new"));
		} else if (tabName !== "favorite") {
			dispatch(actions.init(tabName));
		}
		// インターバルごとにスレッド自動更新
		const interval = setInterval(() => {
			setTime(moment());
		}, 20000);
		return () => {
			clearInterval(interval);
		};
	}, []);
	return (
		<>
			<Header />
			<ThreadList />
		</>
	);
};

export default Page;
