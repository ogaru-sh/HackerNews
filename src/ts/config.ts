import { Config } from "./interface";

const config: Config = {
	apiInfo: {
		baseUrl: "https://hacker-news.firebaseio.com/v0",
		query: "print=pretty",
	},
	apiType: {
		new: "newstories",
		popular: "topstories",
		job: "jobstories",
	},
	tabTitles: [
		"new",
		"popular",
		"job"
	]
	viewLimit: 10,
};

export default config;
