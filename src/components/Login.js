import React, {useState,useEffect} from 'react'
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import { db } from '../firebase-config';
import { getDocs , collection } from 'firebase/firestore/lite';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  let navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [users, setUsers] = useState([]);
  const usersCollection = collection(db, 'users');
  useEffect(()=>{
  //write your effect here...
  const getUsers = async () => {
     const data = await getDocs(usersCollection);
     setUsers(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
     
  }
  getUsers();
  
   
  },[])
  const handleSubmit = (e) => {
    e.preventDefault();
    if(email === users[0].email && users[0].role === 'admin') {
      navigate('/admin');
    }
  }
  return (
    <>
  
     <Navbar/>
      <form className="mt-4" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
        
      </form>
    </>
  );
}
