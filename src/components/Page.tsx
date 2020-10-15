import React from "react";
import Header from "./header/Header";
import ThreadList from "./Thread/ThreadList";
import pageHooks from "../ts/hooks/pageHooks";

const Page = () => {
	pageHooks.usePageInit();
	return (
		<>
			<Header />
			<ThreadList />
		</>
	);
};

export default Page;
