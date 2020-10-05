import React, { FC } from "react";
import dynamic from "next/dynamic";

const PageNoSSR = dynamic(() => import("../components/Page"), {
	ssr: false,
});

const Index: FC = () => {
	return <PageNoSSR />;
};

export default Index;
