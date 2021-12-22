import '../src/styles/globals.css'
import { storeWrapper } from '../store'

const MyApp = ({ Component, pageProps }) => {
  return <Component {...pageProps} />
}

// export default MyApp
export default storeWrapper.withRedux(MyApp)
