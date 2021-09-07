import React, { Fragment, useState } from 'react'
import Textbox from '../toolbox/Textbox'
import { Redirect, useLocation } from "react-router-dom";
import { connect } from 'react-redux';
import { resetPassword } from "../../redux/actions/email"
import alertify from 'alertifyjs';
const ResetPassword = ({resetPassword, isAuthenticated, history}) => {
    function useQuery() {
        return new URLSearchParams(useLocation().search);
    }
    let query = useQuery();
    const [formData, setFormData] = useState({
        password: "",
        password2: ""
    })
    const { password, password2 } = formData;
    const onChange = (e) =>{
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }
    const onSubmit = (e) => {
        e.preventDefault();
        const token = query.get("resetPasswordToken");
        if(password !== password2) {
            alertify.error("Şifreler uyuşmuyor...")
        } else {
            resetPassword(formData, token, history)
        }
        
    }
    if(isAuthenticated){
        return <Redirect to="/home" />
    }
    return (
        <Fragment>
            <div className="container">
                <form className="form-control" onSubmit={onSubmit}>
                    Şifre
                    <Textbox type="password" name="password" placeholder="şifre giriniz" value={password} onChange={onChange} />
                    Şifre onay
                    <Textbox type="password" name="password2" placeholder="şifre onaylayın" value={password2} onChange={onChange}/>
                    <input className="default-hover" type="submit" value="Güncelle" />
                </form>
            </div>
        </Fragment>
    )
}
function mapStateToProps(state) {
    return {
        isAuthenticated: state.auth.isAuthenticated
    }
}
const mapDispatchToProps = {
    resetPassword
}
export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword)
