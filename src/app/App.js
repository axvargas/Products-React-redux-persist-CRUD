import React from 'react';

//@MAterial-ui imports
import {
	createMuiTheme,
	responsiveFontSizes,
	MuiThemeProvider,
	Container,
	Fab,
} from '@material-ui/core';


import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

//@material-ui imports 
import { IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

// styles
import useStyles from './style';

//Component imports
import Footer from '../components/footer';
import Header from '../components/header';
import ScrollTop from '../components/scrollTop';

//Routes
import Router from '../routes/Router';

// Theming and Routing
import themeColor from '../theme';
import { ThemeProvider } from '@material-ui/styles';
import { BrowserRouter } from 'react-router-dom';

// Redux
import { Provider } from 'react-redux';
import store from '../redux/store';
//REdux persist
import { PersistGate } from 'redux-persist/integration/react'
import { persistor } from '../redux/store'
//notistack
import { SnackbarProvider } from 'notistack';

const App = () => {

	const classes = useStyles();
	let theme = createMuiTheme();
	theme = responsiveFontSizes(theme);

	const notistackRef = React.createRef();
	const onCloseSnack = key => () => {
		notistackRef.current.closeSnackbar(key);
	}

	return (

		<MuiThemeProvider theme={theme}>
			<ThemeProvider theme={themeColor}>
				<BrowserRouter>
					<SnackbarProvider
						ref={notistackRef}
						maxSnack={5}
						action={(key) => (

							<IconButton onClick={onCloseSnack(key)} size="small">
								<CloseIcon size="small" />
							</IconButton>

						)}
						classes={{
							variantSuccess: classes.success,
							variantError: classes.error,
							variantWarning: classes.warning,
							variantInfo: classes.info,
						}}
					>
						<Provider store={store}>
							<PersistGate loading={null} persistor={persistor}>
								<Header title="CRUD - React, Redux, API Rest & Axios " />
								<Container className={classes.contain}>

									<Router />


								</Container>

								<Footer />
								<ScrollTop>
									<Fab className={classes.fab} size="small" aria-label="scroll back to top">
										<KeyboardArrowUpIcon />
									</Fab>
								</ScrollTop>
							</PersistGate>
						</Provider>
					</SnackbarProvider>
				</BrowserRouter>
			</ThemeProvider>

		</MuiThemeProvider>

	);
}


export default App;