import { Provider } from "react-redux";
import { useStore } from "../store";
import { AppProps } from "next/app";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    background: #cccccc3d;
  }
`;

const App = ({ Component, pageProps }: AppProps) => {
	const store = useStore(pageProps.initialReduxState);
	return (
		<Provider store={store}>
			<GlobalStyle />
			<Component {...pageProps} />
		</Provider>
	);
};

export default App;
