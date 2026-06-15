import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import {Provider} from 'react-redux';
import { store } from './context/store';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Habits from './pages/Habits.jsx';
import Goals from './pages/Goals.jsx';
import Dashboard from './pages/Dashboard.jsx';

const queryClient = new QueryClient();

function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/habits" element={<Habits/>} />
            <Route path="/goals" element={<Goals/>}/>
            <Route path="/dashboard" element={<Dashboard/>}/>
            <Route path="/" element={<Navigate to="/dashboard" />} /> 
          </Routes>
        </Router>
      </QueryClientProvider>
    </Provider>  
  );
}

export default App;
