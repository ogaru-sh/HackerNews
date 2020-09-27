import { Provider } from 'react-redux'
import { useStore } from '../store'
import {AppProps} from 'next/app'

const App =({ Component, pageProps }: AppProps) => {
  const store = useStore(pageProps.initialReduxState)
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}

export default App
