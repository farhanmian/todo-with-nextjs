import '../styles/globals.css'
import { Provider } from 'react-redux'
import store from '../store/store.ts';
import { createWrapper } from 'next-redux-wrapper';
import { ThemeProvider } from '@material-ui/core';
import theme from "../theme";
import Layout from '../Components/Partials/Layout/Layout';

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </Provider>
  );
}

const makestore = () => store;
const wrapper = createWrapper(makestore);


export default wrapper.withRedux(MyApp);
