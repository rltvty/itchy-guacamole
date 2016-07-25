import { render } from 'react-dom'
import thunkMiddleware from 'redux-thunk'
import { Provider, connect } from 'react-redux'
import { Router, Route, browserHistory } from 'react-router'
import { createStore, applyMiddleware } from 'redux'

import { Reducers } from './utils/reducers'
import { NavContainer } from './nav'
import { DeckContainer } from './deck'
import { ModalWrapperContainer } from './modals'
import '../styles/base.scss'

const Layout = () => (
  <div>
    <NavContainer />
    <DeckContainer />
    <ModalWrapperContainer />
  </div>
)

const App = () => (
  <Provider store={createStore(Reducers, applyMiddleware(thunkMiddleware))}>
    <Router history={browserHistory}>
      <Route path="/(:id)" component={Layout} />
    </Router>
  </Provider>
)

render(<App />, document.getElementById('content'))
