import React, { Fragment, useState } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Textbox from '../toolbox/Textbox'
import { forgotPassword } from '../../redux/actions/email'
import alertify from "alertifyjs"
const ForgotPassword = ({ isAuthenticated, forgotPassword }) => {
    const [formData, setFormData] = useState({
        email:""
    })
    const { email } = formData
    const onChange = (e) => {
        setFormData({
            email: e.target.value
        })
    }
    const onSubmit = (e) => {
        e.preventDefault();
        console.log(email)
        if(!email) {
            alertify.error("Lütfen email adresinizi giriniz")
        } else {
            forgotPassword(email)
          
        }
         
        //veritabanı
    }
    if(isAuthenticated) {
        return <Redirect to="/home"/>
    }
    return (
        <Fragment>
            <div className="container">
                <form className="form-control" onSubmit={onSubmit}>
                    Email
                    <Textbox type="email" name="email" placeholder="Email adresinizi giriniz" value={email} onChange={onChange} />
                    <input className="default-hover w-100" type="submit" value="Gönder"/>
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
    forgotPassword
}
export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword)

