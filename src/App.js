
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Authentication from './Components/Authentication/Authentication';
import Header from './Components/Header/Header';
import RootLayout from './Components/Layout/Root';
import Profile from './Components/Profile/Profile';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<RootLayout />}>
          <Route index element={<Authentication />} />
          <Route path='/profile' element={<Profile />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;