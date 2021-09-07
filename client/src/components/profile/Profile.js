import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Textbox from '../toolbox/Textbox';
import { editProfile } from '../../redux/actions/auth';
import alertify from 'alertifyjs';

const Profile = ({ user, editProfile }) => {
  const [formData, setFormData] = useState({
    nickname: '',
    name: '',
    surname: '',
  });
  useEffect(() => {
    setFormData({
      ...formData,
      nickname: user && user.nickname ? user.nickname : '',
      name: user && user.name ? user.name : '',
      surname: user && user.surname ? user.surname : '',
    });
  }, [user]);

  const { nickname, name, surname } = formData;
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if(!nickname || !name || !surname) {
      alertify.error("Lütfen boş alanları doldurunuz...")
    } else {
       editProfile(formData);
       alertify.success("Profiliniz başarıyla güncellendi...")
    }

  };
  return (
    <Fragment>
        <div className=""> 
            <h2>Profil Düzenle</h2>
            Email
            <input className="form-control"
                type="email"
                placeholder="Email giriniz"
                name="email"
                defaultValue={user && user.email}
                disabled
            />
            <form  onSubmit={onSubmit}>
                Kullanıcı Adı
                <Textbox
                type="text"
                placeholder="Kullanıcı adı giriniz"
                name="nickname"
                value={nickname}
                onChange={handleChange}
                />
                İsim
                <Textbox
                type="text"
                placeholder="İsim giriniz"
                name="name"
                value={name}
                onChange={handleChange}
                />
                Soyisim
                <Textbox
                type="text"
                placeholder="Soyisim giriniz"
                name="surname"
                value={surname}
                onChange={handleChange}
                />
                <input className="default-hover w-100" type="submit" value="Güncelle" />
            </form>  
        </div>
      
    </Fragment>
  );
};

function mapStateToProps(state) {
  return {
    user: state.auth.user,
  };
}
const mapDispatchToProps = {
  editProfile,
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
