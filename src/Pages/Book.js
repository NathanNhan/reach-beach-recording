import React, {useState} from 'react'
import { RoomContext } from '../context';
import { useParams } from 'react-router-dom';
//import defaultBcg from "../images/defaultBcg.jpeg";
import { db } from '../firebase-config';
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {collection , addDoc} from "firebase/firestore/lite";
import {Link} from 'react-router-dom';
import Navbar from '../components/Navbar';
export default function Book() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [fullname, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [status, setStatus] = useState('pending');
  const [payment, setPayment] = useState('');
  const { slug } = useParams();
  //console.log(slug);
  const { getRoom } = React.useContext(RoomContext);
  const room = getRoom(slug);
  if (!room) {
    return (
      <div className="error">
        <h3> no such room could be found...</h3>
        <Link to="/rooms" className="btn-primary">
          back to rooms
        </Link>
      </div>
    );
  }
  const { name, capacity, size, price, breakfast, pets, images } = room;
  const [mainImg, ...defaultBcg] = images;
  //calculate day left
  const calculateDaysLeft = (startDate, endDate) => {
        if (!moment.isMoment(startDate)) startDate = moment(startDate);
        if (!moment.isMoment(endDate)) endDate = moment(endDate);
        return endDate.diff(startDate, "days");
    };
  const daysLeft = calculateDaysLeft(startDate, endDate);
  //handle Submit
  const bookingCollectionRef = collection(db, 'booking');
  const handleSubmit =  async (e) => {
    e.preventDefault();
    await addDoc(bookingCollectionRef, {fullname,email,address,phone,status,payment, room:name , startdate:startDate, endData:endDate, price: daysLeft * price});
  }
  return (
    <>
      <Navbar />
      <div className="container my-5">
        <div className="row">
          <div className="col-md-10 mx-auto col-12 card shadow-lg border-0 p-4">
            <div>
              <h1 className="display-4">Booking</h1>
            </div>
            <div className="row">
              <div className="col-md-6 col-12 my-auto">
                <img
                  src={mainImg || defaultBcg}
                  className="img-fluid"
                  alt="selected room"
                />
              </div>
              <div className="col-md-6 col-12 my-auto">
                <h1>Rooms Details</h1>
                <table className="table">
                  <thead className="thead-light">
                    <tr>
                      <th>Room Type</th>
                      <td>{name}</td>
                    </tr>
                    <tr>
                      <th>Capacity</th>
                      <td>{capacity}</td>
                    </tr>
                    <tr>
                      <th>Size</th>
                      <td>{size} sqft.</td>
                    </tr>
                    <tr>
                      <th>Breakfast</th>
                      <td>
                        {breakfast === true ? `Included` : `Not Included`}
                      </td>
                    </tr>
                    <tr>
                      <th>Pets</th>
                      <td>{pets === true ? `Allowed` : `Not Allowed`}</td>
                    </tr>
                  </thead>
                </table>
              </div>
            </div>
            <div className="row my-3">
              <div className="col-md-6 col-12">
                <div className="form-group">
                  <label htmlFor="Fromdate" className="font-weight-bolder mr-3">
                    From Date{" "}
                  </label>
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    className="form-control"
                  />
                </div>
              </div>
              <div className="col-md-6 col-12">
                <div className="form-group">
                  <label htmlFor="Todate" className="font-weight-bolder mr-3">
                    To Date{" "}
                  </label>
                  <DatePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    className="form-control"
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 col-12">
                <h6 className="font-weight-bolder">
                  Number of days : {daysLeft}
                </h6>
                <mark>Please make sure Checkin time is from 9 am to 12 pm</mark>
              </div>

              <div className="col-md-6 col-12">
                <h6 className="font-weight-bold">
                  Price per day :{" "}
                  <span className="badge badge-info">Rs {price}</span>
                </h6>
                <h6 className="font-weight-bold">
                  Total Price to be paid :{" "}
                  <span className="text-primary">Rs {daysLeft * price}</span>
                </h6>
              </div>
            </div>
            <div className="row my-4">
              <div className="col-md-6 col-12">
                <h4 className="font-weight-bold">Billing Information</h4>
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="">Full Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="fullname"
                      id="fullname"
                      placeholder="Please enter your full name"
                      value={fullname}
                      onChange={(e) => setFullName(e.target.value)}
                    />
                    <label htmlFor="">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      id="email"
                      placeholder="Please enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <label htmlFor="">Phone number</label>
                    <input
                      type="number"
                      className="form-control"
                      name="phone"
                      id="phone"
                      placeholder="Please enter your phone number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      min="0"
                    />
                    <label htmlFor="">Address</label>
                    <input
                      type="text"
                      className="form-control"
                      name="address"
                      id="address"
                      placeholder="Please enter your address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="payment" className="font-weight-bolder">
                      Payment Options
                    </label>
                    <select
                      className="form-control"
                      value={payment}
                      onChange={(e) => setPayment(e.target.value)}
                    >
                      <option disabled>Select payment option</option>
                      <option value="Credit">Credit Card</option>
                      <option value="Debit">Debit Card</option>
                      <option value="checkin">Pay during Checkin</option>
                    </select>
                  </div>
                  <div className="col-md-6 col-12 float-left">
                    <button
                      className="btn btn-block btn-outline-primary"
                      data-toggle="modal"
                      data-target="#thanks"
                      type="submit"
                    >
                      Confirm Booking
                    </button>
                  </div>
                </form>
                <div className="col-md-6 col-12 my-auto"></div>
                <Link to="/rooms" className="btn btn-info">
                  Return home
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="modal fade" id="thanks">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-body p-4">
                <h3>Thank you </h3>
                <p className="lead">Your room is booked successfully....</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
