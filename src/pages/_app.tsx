import { Provider } from "react-redux";
import { useStore } from "../ts/store";
import { AppProps } from "next/app";
import React, { useEffect } from "react";

import { ThemeProvider as StyledComponentsThemeProvider } from "styled-components";
import {
	ThemeProvider as MaterialUIThemeProvider,
	StylesProvider,
} from "@material-ui/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

import theme from "../styles/theme";

const App = ({ Component, pageProps }: AppProps) => {
	useEffect(() => {
		const jssStyles = document.querySelector("#jss-server-side");
		if (jssStyles && jssStyles.parentNode) {
			jssStyles.parentNode.removeChild(jssStyles);
		}
	}, []);
	const store = useStore(pageProps.initialReduxState);
	return (
		<Provider store={store}>
			<StylesProvider injectFirst>
				<MaterialUIThemeProvider theme={theme}>
					<StyledComponentsThemeProvider theme={theme}>
						<CssBaseline />
						<Component {...pageProps} />
					</StyledComponentsThemeProvider>
				</MaterialUIThemeProvider>
			</StylesProvider>
		</Provider>
	);
};

export default App;
