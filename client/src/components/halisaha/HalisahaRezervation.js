import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { ListGroupItem } from 'reactstrap'
import { makeRezervation } from "../../redux/actions/halisaha"
import { setPreTransaction } from "../../redux/actions/auth"
const HalisahaRezervation = ({ makeRezervation, match, history, setPreTransaction, halisahaId }) => {
    const { city, id, slug, date, time } = match.params
    const onSubmit = (e) => {
        e.preventDefault();
        makeRezervation(city, id, slug, date, time, history)
        setPreTransaction(halisahaId, date, time)
    }
    return (
        <Fragment>
            <div className="container form"> 
            <div className="mb-4 mt-3" style={{textAlign:"center"}}>
                <h1>
                    <i className="fas fa-sign-in-alt"/>
                    Ödeme Yap
                </h1>
            </div>  
                <form className="" onSubmit={onSubmit}>
                    <ListGroupItem >{slug}</ListGroupItem>
                    <ListGroupItem > { date } </ListGroupItem>
                    <ListGroupItem > { time } </ListGroupItem>
                    <h2>Kredi kartı bilgileri</h2>
                    <p>Şuan ödeme sayfası aktif değildir. Dilerseniz ödeme yapmadan devam edebilirsiniz.</p>
                    <input className="default-hover w-100 mb-4" type="submit" value="Onayla" />
                </form>
            </div>
            
        </Fragment>
    )
}
function mapStateToProps(state) {
    return {
        halisahaId: state.halisaha.currentHalisaha._id,
    }
}
const mapDispatchToProps = {
    makeRezervation,
    setPreTransaction
}
export default connect(mapStateToProps, mapDispatchToProps)(HalisahaRezervation)
