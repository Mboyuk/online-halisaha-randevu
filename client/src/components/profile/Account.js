import React, { useState } from 'react'
import { connect } from 'react-redux';
import Textbox from '../toolbox/Textbox'
import { changePassword } from '../../redux/actions/auth';
import alertify from 'alertifyjs';
const Account = ({ userEmail, changePassword }) => {
    const [formData, setFormData] = useState({
        oldPassword: "",
        newPassword: "",
        newPassword2: ""
    })
    const { oldPassword, newPassword, newPassword2 } = formData;
    const onSubmit = (e) => {
        e.preventDefault();
        if(!newPassword || !oldPassword || !newPassword2) {
            alertify.error("Lütfen boş yerleri doldurunuz...")
        }
        else if(newPassword !== newPassword2) {
            alertify.error("Şifreler eşleşmiyor...")
        } else {
            //post 
            const newFormData = formData;
            newFormData.email = userEmail;
            changePassword(newFormData)
            alertify.success("Şifreniz başarıyla güncellendi...")
        }
        setFormData({
            oldPassword: "",
            newPassword: "",
            newPassword2: ""
        })
      
    }
    const onChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }
    return (
        <div>
            <h2>Şifre Değiştir</h2>
            Email
            <input className="form-control"
                type="email"
                placeholder="Email giriniz"
                name="email"
                defaultValue={userEmail}
                disabled
            />
            <form className="" onSubmit={onSubmit}>
                Şifre
                <Textbox 
                    type="password" 
                    placeholder="Şifrenizi giriniz"
                    name="oldPassword"
                    value={oldPassword}
                    onChange={onChange}
                />
                Yeni şifre
                <Textbox 
                    type="password" 
                    placeholder="Yeni şifrenizi giriniz"
                    name="newPassword"
                    value={newPassword}
                    onChange={onChange}
                />
                Şifre onay
                <Textbox 
                    type="password" 
                    placeholder="Yeni şifrenizi onaylayın"
                    name="newPassword2"
                    value={newPassword2}
                    onChange={onChange}
                />
                
                <input className="default-hover w-100" type="submit" value="Güncelle" />
            </form>
        </div>
    )

}

function mapStateToProps(state) {
    return {
        userEmail: state.auth.user.email
    }
} 
const mapDispatchToProps = {
    changePassword,
}
export default connect(mapStateToProps, mapDispatchToProps)(Account)