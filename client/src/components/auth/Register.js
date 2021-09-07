import React, { Fragment, useState } from 'react';
import { setAlert } from '../../redux/actions/alert';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import Textbox from '../toolbox/Textbox';
import { register } from '../../redux/actions/auth';
import alertify from 'alertifyjs';

const Register = ({ register, setAlert, isAuthenticated, history }) => {
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    nickname: '',
    password: '',
    password2: '',
  });
  const { name, email, surname, nickname, password, password2 } = formData;

  const onSubmit = (e) => {
    e.preventDefault();
    if(!name || !email || !surname || !nickname || !password || !password2) {
      alertify.error("Lütfen boş yerleri doldurunuz...")
    }
    if (password !== password2) {
      alertify.error("Şifreler eşleşmiyor...")
    } else {
      // kayıt işlemi yap
      register(
        { name, email, surname, nickname, password, password2 },
        history
      );
      alertify.success("Başarıyla kayıt yapıldı...")
    }
  };
  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
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
            <i className="fas fa-user-plus"/>
            Kayıt Ol
          </h1>
        </div>  
        <form  onSubmit={onSubmit}>
          <div  className="container ">
            isim
            <Textbox
              type="text"
              placeholder="İsim Giriniz"
              name="name"
              value={name}
              onChange={handleChange}
            />
          </div>
          <div className="container">
            Soyisim
            <Textbox
              type="text"
              placeholder="Soyisim Giriniz"
              name="surname"
              value={surname}
              onChange={handleChange}
            />
          </div>
          <div className="container">
            Email
            <Textbox
              type="email"
              placeholder="Email giriniz"
              name="email"
              value={email}
              onChange={handleChange}
            />
          </div>
          <div className="container">
            Kullanıcı Adı
            <Textbox
              type="text"
              placeholder="Kullanıcı Adı Giriniz"
              name="nickname"
              value={nickname}
              onChange={handleChange}
            />
          </div>
          <div className="container">
            Şifre
            <Textbox
              type="password"
              placeholder="Şifre Giriniz"
              name="password"
              value={password}
              onChange={handleChange}
            />
          </div>
          <div className="container">
            Şifre Onay
            <Textbox
              type="password"
              placeholder="Şifrenizi Onaylayın"
              name="password2"
              value={password2}
              onChange={handleChange}
            />
          </div>
          <div className="container  ">
            <input className="default-hover w-100" type="submit" value="Kayıt Ol" />
          </div>
        </form>
        <p className="container my-1 mt-3">
          Zaten bir hesabınız var mı? <Link to="/auth/login"> Oturum Aç </Link>
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
  register,
  setAlert,
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
