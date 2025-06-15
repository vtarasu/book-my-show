import logo from './logo.svg';
import './App.css';
import {Provider} from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './pages/register';
import Login from './pages/login';
import Home from './pages/home';
import ProtectedRoute from './components/protectedroute';
import store from './redux/store';
import Admin from './pages/admin/Admin';
import Profile from './pages/users/Profile';
import Partner from './pages/partner/Partner';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login></Login>} />
            <Route path="/home" element={<ProtectedRoute> <Home></Home></ProtectedRoute>} />
            <Route path="/register" element={<Register></Register>} />
            <Route path="/login" element={<Login></Login>} />
            <Route path="/admin" element={<ProtectedRoute><Admin></Admin>  </ProtectedRoute>}/>
            <Route path="/profile" element={<ProtectedRoute><Profile></Profile></ProtectedRoute>}/>
            <Route path="/partner" element={<ProtectedRoute> <Partner></Partner></ProtectedRoute>}/>
          </Routes>
        </BrowserRouter>
      </Provider>

    </div>
  );
}

export default App;
