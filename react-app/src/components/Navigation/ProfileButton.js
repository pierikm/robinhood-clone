import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../../store/session';
import './ProfileButton.css';

const DropDownMenu = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);

  const onLogout = async e => {
    await dispatch(logout());
  };

  return (
    <div className='profileMenu' onClick={e => e.stopPropagation()}>
      <div className='header'>
        <h3 className='name'>
          {user.first_name} {user.last_name}
        </h3>
        <div className='details'>
          <div className='portfolioValue'>
            <p className='value'>Some Value</p>
            <p className='description'>Portfolio Value</p>
          </div>
          <div className='buyingPower'>
            <p className='value'>Some Value</p>
            <p className='description'>Buying Power</p>
          </div>
        </div>
      </div>
      <div className='body'>
        <div className='menu'>stuff</div>
      </div>
      <div className='footer'>
        <Link className='menu logout' onClick={onLogout} to='/login'>
          Log Out
        </Link>
      </div>
    </div>
  );
};

const ProfileButton = () => {
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener('click', closeMenu);
  }, [showMenu]);

  return (
    <div className='profile'>
      <button className='profileButton navText' onClick={() => !showMenu && setShowMenu(true)}>
        Profile
      </button>
      {showMenu && <DropDownMenu />}
    </div>
  );
};

export default ProfileButton;
