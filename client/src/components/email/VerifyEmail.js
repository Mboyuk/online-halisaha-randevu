import alertify from 'alertifyjs';
import React, { Fragment } from 'react'
import { connect } from 'react-redux';
import { Redirect, useLocation } from "react-router-dom";
import { verifyEmail } from '../../redux/actions/email';

const VerifyEmail = ({ verifyEmail, isAuthenticated }) => {
    function useQuery() {
        return new URLSearchParams(useLocation().search);
    }
    let query = useQuery();
    const btnClick = () => {

        const token = query.get("verifyEmailToken");
        if(!token) {
            console.log("token mevcut değil");
            alertify.error("Link süresi dolmuş...")
        } else {
            verifyEmail(token)
            alertify.success("Email onaylama başarıyla gerçekleşti...")
        }
        
    }
    if(isAuthenticated) {
        return <Redirect to="/home" />;
    }
    return (
        <Fragment>
            <div className="container">
                <button className="default-hover" onClick={btnClick}>ONAYLA</button>
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
    verifyEmail
}

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail)
