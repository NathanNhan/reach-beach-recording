import React, {useState, useEffect} from 'react'
import { db } from "../firebase-config";
import { getDocs, collection } from "firebase/firestore/lite";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function NavbarAdmin() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
   const usersCollection = collection(db, "users");
  useEffect(() => {
    //write your effect here...
    const getUsers = async () => {
      const data = await getDocs(usersCollection);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getUsers();
  }, [usersCollection]);
  const logout = () => {
    setUsers([]);
    navigate("/");
  }
  return (
    <>
      {/* A grey horizontal navbar that becomes vertical on small screens */}
      <nav className="navbar navbar-expand-sm bg-light">
        <div className="container-fluid">
          {/* Links */}
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/rooms">
                Rooms
              </Link>
            </li>
            
          </ul>
          <div className="d-flex">
            <li className='nav-link'>{users[0]?.email}</li>
            <button className="btn btn-dark" onClick={() => logout()}>Logout</button>
          </div>
        </div>
      </nav>
    </>
  );
}
