import React from 'react'
import Hero from '../components/Hero'
import Banner from '../components/Banner';  
import { Link } from 'react-router-dom';
import RoomContainer from '../components/RoomContainer';
import Navbar from '../components/Navbar';
export default function Rooms() {
  return (
    <div>
      <Navbar/>
      <Hero hero="roomsHero">
          <Banner title="our room">
              <Link to="/" className='btn-primary'>return home</Link>
          </Banner>
      </Hero>
      <RoomContainer/>
    </div>
  );
}
