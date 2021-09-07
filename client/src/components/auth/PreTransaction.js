import React, { Fragment, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { getPreTransaction, setCommentAndPoint } from "../../redux/actions/auth"
import Modal from 'react-modal';
import StarRatings from 'react-star-ratings';
import alertify from 'alertifyjs';

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      
    },
};
Modal.setAppElement("#root");
const PreTransaction = ({ getPreTransaction, preTransactions, setCommentAndPoint, halisahaId }) => {
    useEffect(() => {
        getPreTransaction()
        closeModal()
    },[getPreTransaction])
    let subtitle;
    const [modalIsOpen, setIsOpen] = useState(false);
    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        const newDate = date.toLocaleDateString()+" "+date.toLocaleTimeString()    
        return newDate
    }
    const [currentPreTrans, setPreTrans] = useState({})
    const openModal = (item) => {
        setPreTrans(item)
        setIsOpen(true)
    }
    const afterOpenModal = () => {
        subtitle.style.color = "#f00"
    }
    const closeModal = () => {
        setIsOpen(false)
        setTextarea({
            comment:""
        })
        setRating(0)
    }
    const [rating, setRating] = useState(0);
    const changeRating = (newRating) => {
        setRating(newRating)
    }

    const [modalTextarea, setTextarea] = useState({
        comment: ""
    })

    const { comment } = modalTextarea;
    const onSubmitModal = (e) => {
        e.preventDefault();
        if(!comment || !rating) {
            alertify.error("Lütfen geçerli yerleri doldurunuz...")
        } else {
            setCommentAndPoint(comment, rating, currentPreTrans)
            getPreTransaction()
            alertify.success("Yorum ve puanınız başarıyla eklendi...")
        }
    }

    const onChangeModalForm = (e) => {
        setTextarea({
            comment: e.target.value
        })
    }

    const modal = (
        <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Lütfen Puan ve Yorumunuzu giriniz.</h2>
                <StarRatings
                        rating={rating}
                        starRatedColor="blue"
                        changeRating={changeRating}
                        starDimension="30px"
                        starSpacing="10px"
                        numberOfStars={5}
                        name='rating'
                    />
                <form className="" onSubmit={onSubmitModal}>
                    <textarea style={{width:"70%", height:"100px", marginRight:"20px",marginTop:"9px"}} value={comment}  onChange={onChangeModalForm} />
                    <input className="default-hover" type="submit" value="Gönder"/>
                </form>
                {/* {closeModal()} */}
                <button className="disabled-button" onClick={closeModal}>Kapat</button>
        </Modal>
    )
    const dateControl = (item) => {
        const { time, date } = item;
        const newTime = time.split("-")[1];
        const newDate = date.split("-");
        const d1 = new Date(`${newDate[0]}.${newDate[1]}.${newDate[2]} ${newTime}`);
        const d2 = new Date()
        if(d1.getTime() - d2.getTime() < 0){
            return false
        }
        return true;
    }
   
    return (
        <Fragment>
            <div className="container"> 
                <table className="table sort-table pretranstable">
                <thead>
                    <tr>
                        <th>index</th>
                        <th>Halisaha adı</th>
                        <th>Tarih</th>
                        <th>Saat</th>
                        <th>Oluşturma saati</th>
                        <th>Yorum ve puan</th>
                    </tr>
                </thead>
                <tbody>
                    {
                         preTransactions && preTransactions.preTransactions && preTransactions.preTransactions.map((item, index) => (
                            <tr key= {index}>
                                <td>{index+1}</td>
                                <td>{ item.halisahaName }</td>
                                <td> { item.date } </td>
                                <td> { item.time } </td>
                                <td> { formatDate(item.createAt) } </td>
                                <td>{ item.isComment ? 
                                    "Yorum yapıldı" 
                                    : 
                                    dateControl(item) 
                                    ? 
                                    <button style={{cursor:"no-drop"}} className="disabled-button" disabled>Zamanı gelmedi</button>:
                                    <button className="smallpad-hover" onClick={(e) => openModal(item)}>Yorum</button>
                                
                                }  
                                </td>
                            </tr>
                        ))
                    }

                </tbody>
            </table>
            </div>
            
            {
                modal
            }
        </Fragment>
    )
}
function mapStateToProps(state) {
    return {
        preTransactions: state.auth.preTransactionsRdcr,
        halisahaId: state.halisaha.currentHalisaha._id
    }
}
const mapDispatchToProps = {
    getPreTransaction,
    setCommentAndPoint
}
export default connect(mapStateToProps, mapDispatchToProps)(PreTransaction)
