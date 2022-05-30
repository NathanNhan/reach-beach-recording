import React from 'react'
import Hero from '../components/Hero'
import Banner from '../components/Banner'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
export default function Error() {
  return (
    <div>
      <Navbar/>
        <Hero>
            <Banner title="404" subtitile="Page not Found">
                <Link to="/" className="btn-primary">return home</Link>
            </Banner>
        </Hero>
    </div>
  )
}
