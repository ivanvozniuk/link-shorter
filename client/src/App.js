import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'emotion-theming';

import { BaseLayout } from './layout';
import theme from './theme';
import Routes from './routes';
import { StoreProvider, Notifications } from './components';

const App = () => {
	return (
		<StoreProvider>
			<BrowserRouter>
				<ThemeProvider theme={theme}>
					<>
						<Notifications />
						<BaseLayout>
							<Routes />
						</BaseLayout>
					</>
				</ThemeProvider>
			</BrowserRouter>
		</StoreProvider>
	);
};

export default App;
