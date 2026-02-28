import Header from './components/header'
import {Routes,Route} from 'react-router-dom'
import Main from './pages/main'
import About from './pages/about'
import Contacts from './pages/contacts'
import Profile from './pages/userProfile'
import CategoryPage  from './pages/categoryPage'
import ErrorMessage from './components/ErrorMessage';
import { useState } from 'react';

function App() {
  const [error, setError] = useState(null);

  return (
    <>
      <Header/>
      <ErrorMessage error={error} />
      <Routes>
        <Route element={<Main/>} path='/main'/>
        <Route element={<About/>} path='/about'/>
        <Route element={<Contacts/>} path='/contacts'/>
        <Route element={<Profile setError={setError} /> } path='/profile'/>
        <Route element={<CategoryPage/>} path='/category/:id'/>
      </Routes>
    </>
  );
}

export default App;
