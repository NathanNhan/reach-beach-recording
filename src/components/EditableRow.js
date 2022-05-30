import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';
import { Form, Button } from "react-bootstrap";
import {  doc, getDoc, updateDoc } from 'firebase/firestore/lite';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { db } from '../firebase-config';
export default function EditableRow() {
  const navigate = useNavigate();
  const {id} = useParams();
  const [startdate, setStartDate] = useState(new Date());
  const [endData, setEndDate] = useState(new Date());
  const [selectedBooking, setSelectedBooking] = useState({
    fullname: "",
    email: "",
    phone: "",
    address: "",
    status:"",
    payment:"",
    price:"",
    room:"",
    startdate: "",
    endData: "",
  });
  useEffect(()=>{
   const getUserDetail = async () => {
      const userDoc = doc(db, "booking", id);
      const docSnap = await getDoc(userDoc);
      console.log(docSnap.data());
      if (docSnap.exists()) {
        
        setSelectedBooking(docSnap.data());
        
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
       
   }
   getUserDetail();
   
  },[id])

  const onInputChange = (e) => {
    setSelectedBooking({ ...selectedBooking, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newField = {...selectedBooking}
    console.log("Hello + " , newField);
    const bookingDoc = doc(db, 'booking', id);
    await updateDoc(bookingDoc , newField);
    navigate("/admin");
    window.location.reload();
  }
  return (
    <>
      {selectedBooking && (
        <>
          {/* <p>
            {moment(new Date(selectedBooking.startdate.seconds * 1000)).format(
              "DD/MM/YYYY"
            )}
          </p> */}
          <h1>Edit Form</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Your Full Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Name *"
                name="fullname"
                value={selectedBooking.fullname}
                onChange={(e) => onInputChange(e)}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Email *"
                name="email"
                value={selectedBooking.email}
                onChange={(e) => onInputChange(e)}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Address</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Address"
                rows={3}
                name="address"
                value={selectedBooking.address}
                onChange={(e) => onInputChange(e)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Phone number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Phone"
                name="phone"
                value={selectedBooking.phone}
                onChange={(e) => onInputChange(e)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Start date:</Form.Label>
              <DatePicker
                selected={startdate}
                onChange={(date) => setStartDate(date)}
                className="form-control"
                name="startdate"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>End date:</Form.Label>
              <DatePicker
                selected={endData}
                onChange={(date) => setEndDate(date)}
                className="form-control"
                name="endData"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Phone"
                min="0"
                name="price"
                value={selectedBooking.price}
                onChange={(e) => onInputChange(e)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Room</Form.Label>
              <Form.Control
                type="text"
                placeholder="Room"
                name="room"
                value={selectedBooking.room}
                onChange={(e) => onInputChange(e)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Status</Form.Label>
              <Form.Control
                type="text"
                placeholder="Status"
                name="status"
                value={selectedBooking.status}
                onChange={(e) => onInputChange(e)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Payment</Form.Label>
              <Form.Control
                type="text"
                placeholder="payment"
                name="payment"
                value={selectedBooking.payment}
                onChange={(e) => onInputChange(e)}
              />
            </Form.Group>

            <div className="d-flex justify-content-center">
              <Button variant="success mt-2" type="submit" block>
                Update
              </Button>
              <Button variant="danger ml-4 mt-2" block>
                <Link to="/admin">Return Admin</Link>
              </Button>
            </div>
          </Form>
        </>
      )}
    </>
  );
}
