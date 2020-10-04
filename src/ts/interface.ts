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
}
