
import './App.css';
import Home from './Pages/Home';
import Error from './Pages/Error';
import Rooms from './Pages/Rooms';
import SingleRoom from './Pages/SingleRoom';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import RoomProvider from './context';
import Book from './Pages/Book';
import Admin from './Pages/Admin';
import Login from './components/Login';
import EditableRow from './components/EditableRow';
function App() {
  return (
    <RoomProvider>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/room/:slug" element={<SingleRoom />} />
          <Route path="/*" element={<Error />} />
          <Route path="/booknow/:slug" element={<Book />} />
          <Route path="/login" element={<Login />} />
          <Route path='/admin' element={<Admin/>} />
          <Route path='/edit/:id' element={<EditableRow/>} />
          
        </Routes>
      </Router>
    </RoomProvider>
  );
}

export default App;
