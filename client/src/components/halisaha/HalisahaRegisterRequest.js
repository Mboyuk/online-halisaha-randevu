import React, { Fragment, useState } from 'react'
import { connect } from 'react-redux'
import { registerHalisahaRequest } from "../../redux/actions/halisaha"
import alertify from 'alertifyjs'
const HalisahaRegisterRequest = ({ registerHalisahaRequest, history }) => {
    const [formData, setFormData] = useState({
        content: ""
    })
    const { content } = formData
    const onChange = (e) => {
        setFormData({
            content: e.target.value
        })
    }
    const onSubmit = (e) => {
        e.preventDefault();
        if(!content) {
            alertify.error("Lütfen geçerli bir mesaj giriniz...")
        } else {
            registerHalisahaRequest(content, history)
            alertify.success("Mesajınız başarıyla gönderildi...")
        }
       
    }
    return (
        <Fragment>
            <div className="container "> 
            <h1> BU SAYFA HALI SAHA SAHİBİ OLANLAR İÇİNDİR. BİLGİNİZE... </h1>
                <form className="" onSubmit={onSubmit}>
                    <input placeholder="Bize halı sahanızdan bahsedin" className="form-control" type="text" name="content" value={content} onChange={onChange}/>
                    <input className="default-hover mr-0" type="submit" value="Gönder" />
                </form>
            </div>
            
        </Fragment>
    )
}
const mapDispatchToProps = {
    registerHalisahaRequest
}
export default connect(null,mapDispatchToProps)(HalisahaRegisterRequest)