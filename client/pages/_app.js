// import App from 'next/app';
import { BaseLayout } from '../layout';
import { ThemeProvider } from 'emotion-theming';

import theme from '../theme';
import '../assets/css/index.css';
import { useAuth } from '../services';
import { AuthContext } from '../context';

const App = ({ Component, pageProps }) => {
	const { logIn, logOut, token, userId } = useAuth();
	return (
		<AuthContext.Provider value={{ logIn, logOut, token, userId, isAuthenticated: !!token }}>
			<ThemeProvider theme={theme}>
				<BaseLayout>
					<Component {...pageProps} />
				</BaseLayout>
			</ThemeProvider>
		</AuthContext.Provider>
	);
};

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);
//
//   return { ...appProps }
// }

export default App;
