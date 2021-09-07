import React, { Fragment, useState } from 'react'
import { connect } from 'react-redux';
import Textbox from '../../toolbox/Textbox'
import { registerHalisaha } from "../../../redux/actions/halisaha"
import { citiess } from "../../home/cties"
import { timesOpening, timesClosing } from './times';
import alertify from 'alertifyjs';

const HalisahaRegister = ({ registerHalisaha, history }) => {
    const [formData, setFormData] = useState({
        name: "",
        city: "",
        fieldCount: "",
        content: "",
        opening: "08:00",
        closing: "24:00",
        price: ""
    })
    const { name, city, fieldCount, content, opening, closing, price } = formData;
    const onChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }
    const onSubmit = (e) => {
        e.preventDefault();
        if(!name || !city || !fieldCount || !content || !opening || !closing || !price) {
            alertify.error("Lütfen boş yerleri doldurunuz...")
        } else {
            registerHalisaha(formData, history)
            alertify.success("Kayıt olma işlemi başarıyla gerçekleşti...")
        }
     
    }
    const onChangeOption = (e) => {
        setFormData({
            ...formData,
            city: e.target.value
        })
    }
    const onChangeOption2 = (e) => {
        setFormData({
            ...formData,
            opening: e.target.value
        })
    }
    const onChangeOption3 = (e) => {
        setFormData({
            ...formData,
            closing: e.target.value
        })
    }

    return (
        <Fragment>
            <div className="container form" > 
                <div className="mb-4 mt-3" style={{textAlign:"center"}}>
                    <h1>
                        <i className="fas fa-sign-in-alt"/>
                        Halısaha Kaydol
                    </h1>
                </div> 
                <form className="" onSubmit={onSubmit}>
                    Halısaha ismi
                    <Textbox type="text" name="name" placeholder="Halısaha ismi giriniz" value={name} onChange={onChange} />
                    Şehir 
                    <select className="form-control" value={city} onChange={onChangeOption}>
                        {
                            citiess.map(item => (
                                <option key={item.name} value={item.name}>{item.name}</option>
                            ))
                        }
                    </select>
                    Saha sayısı
                    <Textbox type="number" name="fieldCount" placeholder="Saha sayısı giriniz" value={fieldCount} onChange={onChange} />
                    İçerik
                    <Textbox type="text" name="content" placeholder="Content giriniz" value={content} onChange={onChange} />
                    Açılış saati
                    <select className="form-control" value={opening} onChange={onChangeOption2}>
                        {
                            timesOpening.map((item, index) => (
                                <option key={index} value={item}>{item}</option>
                            ))
                        }
                    </select>
                    Kapanış saati

                    <select className="form-control" value={closing} onChange={onChangeOption3}>
                        {
                            timesClosing.map((item, index) => (
                                <option key={index} value={item}>{item}</option>
                            ))
                        }
                    </select>
                    Fiyat
                    <Textbox type="number" name="price" placeholder="Fiyat giriniz" value={price} onChange={onChange} />
                    <input className="default-hover w-100 mb-3" type="submit" value="Kaydol" />
                </form>   
            </div>
           

        </Fragment>
    )
}
const mapDispatchToProps = {
    registerHalisaha
}

export default connect(null, mapDispatchToProps)(HalisahaRegister)
