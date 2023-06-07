import { Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux';
import './App.css'
import DashboardPage from './pages/Dashboard.page'
import store from './redux/store';

function App() {
  return (
    <Provider store={store}>
      <Routes>
        <Route path='/' element={<DashboardPage />} />
      </Routes>
    </Provider>
  )
}

export default App
