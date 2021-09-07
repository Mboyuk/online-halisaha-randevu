import { connect } from 'react-redux';
import React, { Fragment } from 'react';
import { logout } from '../../redux/actions/auth';
import { Link } from 'react-router-dom';
import { Dropdown } from "react-bootstrap"
const Navi = ({ logout, isAuthenticated, user, userId, history }) => {
  
  const authAndUser = (
    <Dropdown className="drop-down-button ">
      <Dropdown.Toggle style={{border:"none"}} id="dropdown-basic" className="default-hover">
        { user && user.nickname }
      </Dropdown.Toggle>
      <Dropdown.Menu id="drop-down-menu" >
        <Dropdown.Item as={Link} to="/auth/pre-transactions">Önceki işlemler</Dropdown.Item>
        <Dropdown.Item as={Link} to="/halisaha/register/request"> Halısaha Al </Dropdown.Item>
        <Dropdown.Item as={Link} to="/auth/edit-profile"> Profil </Dropdown.Item>
        <Dropdown.Divider style={{color:"white"}} />
        <Dropdown.Item  onClick={logout}> Oturum Kapat </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
  const authAndManger = (
    <Dropdown className="drop-down-button ">
      <Dropdown.Toggle style={{border:"none"}} id="dropdown-basic" className="default-hover">
        { user && user.nickname }
      </Dropdown.Toggle>

      <Dropdown.Menu id="drop-down-menu" >
        <Dropdown.Item as={Link} to="/auth/pre-transactions">Önceki işlemler</Dropdown.Item>
        <Dropdown.Item as={Link} to={`/halisaha/${user && user._id}/edit-halisaha`}> Halısaham </Dropdown.Item>
        <Dropdown.Item as={Link} to="/halisaha/register/control" > Halısaha oluştur </Dropdown.Item>
          <Dropdown.Item as={Link} to="/auth/edit-profile"> Profil </Dropdown.Item>
        <Dropdown.Divider style={{color:"white"}} />
        <Dropdown.Item  onClick={logout}> Oturum Kapat </Dropdown.Item>

      </Dropdown.Menu>
    </Dropdown>
  );

  const guestLinks = (
    <ul className="guest-links">
      <li>
        <Link className="link default-hover"  to="/auth/register">Üye Ol</Link>
      </li>
      <li>
        <Link className="link default-hover" to="/auth/login">Giriş</Link>
      </li>
    </ul>
  );
  const authAdmin = (
    <ul>
      <li>admin</li>
    </ul>
  )

  return (
    <nav className="navbar sticky-top"> 
      <Link to="/home">
        <img src={"/logo/logo11.jpg"} alt="logo"/>
      </Link>
      <Fragment>
        {isAuthenticated
          ? user && user.role === 'user'
            ? authAndUser
            : user && user.role === 'manager'
            ? authAndManger
            : authAdmin
          : guestLinks}
      </Fragment>
    </nav>
  );
};
const mapDispatchToProps = {
  logout,
};
function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
    // userId: state.auth.user.id
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Navi);
