export interface InitialProps {
	store: {
		dispatch: any;
	};
}

export interface Config {
	apiInfo: {
		baseUrl: string;
		query: string;
	};
	apiType: {
		new: string;
		popular: string;
		job: string;
	};
	tabTitles: string[];
	viewLimit: number;
}
