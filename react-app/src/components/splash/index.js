import React from 'react';
import { Link } from 'react-router-dom';
import './Splash.css';

const Splash = () => {
  return (
    <div className='splash main'>
      <nav>
        <div className='navbar'>
          <div className='logo'>
            <Link to='/'>HOME</Link>
          </div>
          <div className='auth'>
            <Link className='btn login' to='/login'>
              Log In
            </Link>
            <Link className='btn signup' to='/signup'>
              Sign Up
            </Link>
          </div>
        </div>
      </nav>
      <header className='headerContainer'>
        <div className='header'>
          <div className='headerLeftContainer'>
            <div className='headerLeft'>
              <h1>Investing for Everyone</h1>
              <p>
                Commission-free investing, plus the tools you need to put your money in motion. Sign
                up and get your first stock for free. Certain limitations and fees apply.
              </p>
              <Link className='btn signup black' to='/signup'>
                Sign Up
              </Link>
            </div>
          </div>
          <div className='headerRightContainer'>
            <div className='headerRight'>
              <video
                autoPlay
                muted
                controlsList='nodownload nofullscreen noremoteplayback'
                loop
                playsInline
                preload='auto'
                className='headerVideo'
              >
                <source
                  src='https://robinhood.com/us/en/_next/static/images/3x__327bf4cc768a323497d5aaa7416319c2.mp4'
                  type='video/mp4'
                />
              </video>
              <img
                className='headerImage'
                src='https://robinhood.com/us/en/_next/static/images/1x__284c8d0c799d3c9649ca021c00228275.png'
                alt=''
              />
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Splash;
