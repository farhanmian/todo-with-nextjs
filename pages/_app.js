import '../styles/globals.css'
import { Provider } from 'react-redux'
import store from '../store/store.ts';
import { createWrapper } from 'next-redux-wrapper';
import { ThemeProvider } from '@material-ui/core';
import theme from "../theme";
import Layout from '../Components/partials/Layout/Layout';
import ErrorBoundary from '../Components/partials/ErrorBoundary/ErrorBoundary';

function MyApp({ Component, pageProps }) {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </Provider>
    </ErrorBoundary>
  );
}

const makestore = () => store;
const wrapper = createWrapper(makestore);


export default wrapper.withRedux(MyApp);
