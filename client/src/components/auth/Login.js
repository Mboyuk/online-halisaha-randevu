import { connect } from 'react-redux';
import React, { Fragment, useState } from 'react';
import Textbox from '../toolbox/Textbox';
import { login } from '../../redux/actions/auth';
import { Link, Redirect } from 'react-router-dom';
import alertify from 'alertifyjs';
const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const { email, password } = formData;
  const onSubmit = (e) => {
    e.preventDefault();
    if(!email || !password) {
      alertify.error("Lütfen gerekli yerleri doldurunuz...")
    } else {
       login({ email, password });
       alertify.success("Başarıyla giriş yapıldı...")
    }
   
    //login işlemi
  };
  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (isAuthenticated) {
    return <Redirect to="/home" />;
  }
  return (
    <Fragment>
      <div className="container form">
        <div className="mb-4 mt-3" style={{textAlign:"center"}}>
          <h1>
            <i className="fas fa-sign-in-alt"/>
            Giriş Yap
          </h1>
        </div>  
        <form onSubmit={onSubmit}>
          <div className="container">
            Email
            <Textbox
              type="email"
              placeholder="Email Giriniz"
              name="email"
              value={email}
              onChange={onChange}
            />
            Şifre
          </div>
          <div className="container">
            <Textbox
              type="password"
              placeholder="Şifre Giriniz"
              name="password"
              value={password}
              onChange={onChange}
            />
          </div>
          <div className="container">
            <input className="default-hover w-100" type="submit" value="Giriş Yap" />
          </div>
         
        </form>
        <p className="container my-1 mt-3">
          Hesabınız yok mu? <Link className="link" to="/auth/register"> Kaydol </Link>
        </p>
        <p className="container my-1 mt-3">
          veya <Link className="link" to="/auth/forgot-password">Şifrenmi unuttum</Link>
        </p>
      </div>  
      
      
    </Fragment>
  );
};

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
  };
}

const mapDispatchToProps = {
  login,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
