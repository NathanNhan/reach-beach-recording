import React, {useState, useEffect} from 'react';
import { db } from '../firebase-config';
import { collection, doc, getDocs, deleteDoc } from 'firebase/firestore/lite';
import moment from "moment";
import NavbarAdmin from '../components/NavbarAdmin';
import { Modal, Button, Alert } from "react-bootstrap";
import {Link} from "react-router-dom";
const Admin = ()=>{
  const [bookingInfo, setBookingInfo] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  //const [edit, setEdit] = useState(false);

  const [status, setStatus] = useState(null);
  const bookingCollection = collection(db,'booking');
  const deleteBooking = async (id) => {
    const userDoc = doc(db, "booking", id);
    await deleteDoc(userDoc);
    window.location.reload();
  };
  useEffect(()=>{
  //write your effect here...
    const getBookingData = async () => {
     const data = await getDocs(bookingCollection);
      console.log(data);
      setBookingInfo(data.docs.map((doc) => ({...doc.data(), id:doc.id})));
    }
    getBookingData();
  },[])

  return (
    <>
      <NavbarAdmin />
      <table className="table align-middle mb-0 bg-white">
        <thead className="bg-light">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Room</th>
            <th>Price</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Payment</th>
            <th>Address</th>
            <th>status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {bookingInfo.map((booking) => (
            <tr key={booking.id}>
              <td>
                <p className="fw-normal mb-1">{booking.fullname}</p>
              </td>
              <td>
                <p className="fw-normal mb-1">{booking.email}</p>
              </td>
              <td>
                <p className="fw-normal mb-1">{booking.phone}</p>
              </td>
              <td>
                <p className="fw-normal mb-1">{booking.room}</p>
              </td>
              <td>
                <p className="fw-normal mb-1">{booking.price}</p>
              </td>
              <td>
                <p className="fw-normal mb-1">
                  {moment(booking.startdate.toDate()).format("DD-MM-YYYY")}
                </p>
              </td>
              <td>
                <p className="fw-normal mb-1">
                  {moment(booking.endData.toDate()).format("DD-MM-YYYY")}
                </p>
              </td>
              <td>
                <p className="fw-normal mb-1">{booking.payment}</p>
              </td>
              <td>
                <p className="fw-normal mb-1">{booking.address}</p>
              </td>
              <td>
                <p className="fw-normal mb-1">{booking.status}</p>
              </td>
              <td>
                <Link to={`/edit/${booking.id}`}
                  
                  className="btn btn-success"
                >
                  Edit
                </Link>
                
                <button
                  className="btn btn-danger"
                  onClick={() => deleteBooking(booking.id)}
                >
                  Delete
                </button>
              </td>
              
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
export default Admin;