import './App.css'
import { BrowserRouter } from 'react-router-dom'
import { applyMiddleware,createStore } from 'redux'
import { Provider } from 'react-redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import rootReducer from './redux/reducer'
import { Route } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'
import logger from 'redux-logger'

import MainPage from './screens/MainPage'
import Cart from './screens/Cart'
import Checkout from './screens/Checkout'

// const transformCircular = createTransform(
//   (inboundState, key) => Flatted.stringify(inboundState),
//   (outboundState, key) => Flatted.parse(outboundState),
// )

const persistConfig = {
  key: 'root',
  storage
}

const persistedReducer = persistReducer(persistConfig, rootReducer)
let store = createStore(persistedReducer,applyMiddleware(logger))
let persistor = persistStore(store)

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Route path="/chceckout" component={Checkout} />
          <Route path="/cart" component={Cart} />
          <Route path="/" component={MainPage} exact />
        </PersistGate>
      </Provider>
    </BrowserRouter>
  )
}

export default App
