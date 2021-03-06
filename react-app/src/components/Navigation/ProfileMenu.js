import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { logout } from '../../store/session';
import './ProfileMenu.css';

const ProfileMenu = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector(state => state.session.user);
  const bp = useSelector(state => state.portfolio.buying_power);

  const onLogout = async e => {
    await dispatch(logout());
    history.push('/login');
  };

  if (!user) return null;

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
            <p className='value'>
              {bp.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
            </p>
            <p className='description'>Buying Power</p>
          </div>
        </div>
      </div>
      <div className='body'>
        <Link className='menu' to='/add-funds'>
          <i className='fa-solid fa-building-columns fa-xl'></i>
          Transfers
        </Link>
      </div>
      <div className='footer'>
        <div className='menu logout' onClick={onLogout}>
          <i className='fa-solid fa-arrow-right-from-bracket fa-xl'></i>
          Log Out
        </div>
      </div>
    </div>
  );
};

export default ProfileMenu;
