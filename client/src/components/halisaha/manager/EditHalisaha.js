import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  getHalisahaRezervationInfoForManager,
  setHalisahaImageUpload,
  deleteHalisahaImageAction,
  editHalisahaProperties,
  setPrice,
} from '../../../redux/actions/halisaha';
import Slider from '../../toolbox/Slider';
import Textbox from '../../toolbox/Textbox';
import MyTable from '../../toolbox/MyTable';
import StarRatings from 'react-star-ratings';
import Modal from 'react-modal';
import alertify from 'alertifyjs';
import { Redirect } from 'react-router-dom';
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
Modal.setAppElement('#root');

const EditHalisaha = ({
  getHalisahaRezervationInfoForManager,
  userRezervationTable,
  user,
  match,
  images,
  setHalisahaImageUpload,
  deleteHalisahaImageAction,
  properties,
  editHalisahaProperties,
  currentUserHalisaha,
  setPrice,
}) => {
  useEffect(() => {
    //getHalisahaRezervationInformation getHalisahaRezervationInfo
    const id = match.params.id;
    const id2 = user._id;
    dd();
    if (id !== id2) {
      return <Redirect to="home" />;
    } else {
      getHalisahaRezervationInfoForManager(id2);
    }
  }, []);

  const halisahaProperties = [
    'Ayakkabi',
    'Eldiven',
    'Duş',
    'Büfe',
    'Kafeterya',
    'Otopark',
    'WIFI',
    'Servis',
    'Açık Saha',
    'Kapalı Saha',
  ];
  const [halisahaImage, sethalisahaImage] = useState({
    selectedFile: [],
  });
  const [halisahaProperty, setHalisahaProperty] = useState({
    price: '',
    halisahaMessage: '',
  });

  const [checkedState, setCheckedState] = useState(
    new Array(halisahaProperties.length).fill(false)
  );
  //const { propertyArray } = checkedArray
  const handleOnChange = (position) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );

    setCheckedState(updatedCheckedState);

    // setTotal(totalPrice);
  };

  const { selectedFile } = halisahaImage;
  const { price, halisahaMessage } = halisahaProperty;

  const onSubmitProperty = (e) => {
    e.preventDefault();
    const id = match.params.id;

    const properties = [];
    checkedState.forEach((item, index) => {
      if (item) {
        properties.push(halisahaProperties[index]);
      }
    });
    if (!id || !price || !halisahaMessage || !properties) {
      alertify.error('Lütfen geçerli yerleri doldurunuz...');
    } else {
      editHalisahaProperties(id, price, halisahaMessage, properties);
      alertify.success('Özellikler başarıyla eklendi...');
    }
  };
  const onChangeProperty = (e) => {
    setHalisahaProperty({
      ...halisahaProperty,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmitHalisahaImage = (e) => {
    e.preventDefault();

    if (selectedFile.length <= 0) {
      alertify.error('Lütfen geçerli bir fotoğraf yükleyin...');
    } else {
      const fd = new FormData();
      selectedFile.forEach((element) => {
        fd.append('halisaha_image', element, element.name);
      });

      setHalisahaImageUpload(fd);
      alertify.success('Foroğraf başarıyla eklendi...');
    }
  };
  const onFileChange = async (e) => {
    var cpyFile = [];

    for (let i = 0; i < 5; i++) {
      if (e.target.files[i]) {
        cpyFile.push(e.target.files[i]);
      }
    }

    sethalisahaImage({
      selectedFile: cpyFile,
    });
  };
  const [priceState, setPriceState] = useState({
    rezervationDate: '',
    rezervationTime: '',
    priceSt: '',
  });
  const { rezervationDate, rezervationTime, priceSt } = priceState;
  const onSubmitPrice = (e) => {
    e.preventDefault();
    if (!priceSt) {
      alertify.error('Lütfen fiyat bilgisi giriniz...');
    } else {
      setPrice(rezervationDate, rezervationTime, priceSt);
      alertify.success('Fiyat bilgisi başarıyla eklendi...');
    }
  };
  const onChangePrice = (e) => {
    setPriceState({
      ...priceState,
      [e.target.name]: e.target.value,
    });
  };

  const prp = ['default.jpg'];

  const [buttonInfo, setButtonInfo] = useState('');
  const addImage = () => {
    setButtonInfo('addImage');
    openModal();
  };
  const deleteImage = () => {
    setButtonInfo('deleteImage');
    openModal();
  };
  const addProperty = () => {
    setButtonInfo('addProperty');
    openModal();
  };
  const addPrice = () => {
    setButtonInfo('addPrice');
    openModal();
  };
  const deleteImageDatabase = (imgName, e) => {
    deleteHalisahaImageAction(imgName);
  };

  let subtitle;
  const [modalIsOpen, setIsOpen] = useState(false);
  const openModal = (item) => {
    setIsOpen(true);
  };
  const afterOpenModal = () => {
    subtitle.style.color = '#f00';
  };
  const closeModal = () => {
    setIsOpen(false);
  };
  const madalDeleteImage = (
    <div className="edit-halisaha-delete-image">
      <h2> Fotoğraf Sil</h2>

      {images &&
        images.map((item) => (
          <div
            key={item}
            onClick={(e) => deleteImageDatabase(item)}
            className="edit-halisaha-delete-image-div">
            <img
              style={{ cursor: 'pointer' }}
              src={`/halisahaResimler/${item}`}
              alt="first slide"
            />
          </div>
        ))}
      <div style={{ display: 'block', float: 'left' }}>
        <p>
          {' '}
          <span style={{ color: 'red' }}>NOT: </span> Silmek istediğiniz
          fotoğrafın üzerine tıklamanız yeterlidir
        </p>
      </div>
    </div>
  );
  const modalAddImage = (
    <div className="edit-halisaha-add-image">
      <h3> Resim Ekleme</h3>
      <form className="form-control" onSubmit={onSubmitHalisahaImage}>
        <input
          type="file"
          name="halisaha_image"
          multiple
          onChange={onFileChange}
        />
        <input className="default-hover" type="submit" value="Güncelle" />
      </form>
    </div>
  );
  const modalAddProperty = (
    <div className="edit-halisaha-property">
      <h2> Halısaha bilgilerini güncelle </h2>
      <form className="" onSubmit={onSubmitProperty}>
        Fiyat
        <Textbox
          type="number"
          name="price"
          value={price}
          placeholder="Fiyat giriniz"
          onChange={onChangeProperty}
        />
        Halısaha mesajı
        <Textbox
          type="text"
          name="halisahaMessage"
          value={halisahaMessage}
          placeholder="Halısaha mesajı giriniz"
          onChange={onChangeProperty}
        />
        <p style={{ textAlign: 'center', color: 'green' }}> Özellik Ekle</p>
        <hr />
        {halisahaProperties.map((item, index) => (
          <label key={index}>
            <input
              type="checkbox"
              name={item}
              value={item}
              onChange={() => handleOnChange(index)}
              checked={checkedState[index]}
            />
            {item}
          </label>
        ))}
        <input className="default-hover w-100" type="submit" value="Güncelle" />
      </form>
    </div>
  );
  const [tarihler, setTarihler] = useState([]);
  const dd = () => {
    const array = [];

    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      let a = date.toLocaleDateString().split('.');
      if (a[0].charAt(0) === '0') {
        a[0] = a[0].charAt(1);
      }
      if (a[1].charAt(0) === '0') {
        a[1] = a[1].charAt(1);
      }
      let b = a[1] + '-' + a[0] + '-' + a[2];
      array.push(b);
    }

    setTarihler(array);
  };
  const saatler = [
    '01:00-02:00',
    '02:00-03:00',
    '03:00-04:00',
    '04:00-05:00',
    '05:00-06:00',
    '06:00-07:00',
    '07:00-08:00',
    '08:00-09:00',
    '09:00-10:00',
    '10:00-11:00',
    '11:00-12:00',
    '12:00-13:00',
    '13:00-14:00',
    '14:00-15:00',
    '15:00-16:00',
    '16:00-17:00',
    '17:00-18:00',
    '18:00-19:00',
    '19:00-20:00',
    '20:00-21:00',
    '21:00-22:00',
    '22:00-23:00',
    '23:00-24:00',
    '24:00-01:00',
  ];
  const onChangeOption3 = (e) => {
    setPriceState({
      ...priceState,
      rezervationDate: e.target.value,
    });
  };
  const onChangeOption4 = (e) => {
    setPriceState({
      ...priceState,
      rezervationTime: e.target.value,
    });
  };

  const modalAddPrice = (
    <div className="edit-profile-add-price ">
      <h2> Halısaha özel fiyat ekleme </h2>
      <form className="" onSubmit={onSubmitPrice}>
        Tarih
        <select
          className="form-control"
          value={rezervationDate}
          onChange={onChangeOption3}>
          {tarihler &&
            tarihler.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
        </select>
        Saat
        <select
          className="form-control"
          value={rezervationTime}
          onChange={onChangeOption4}>
          {saatler.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </select>
        <Textbox
          type="number"
          name="priceSt"
          value={priceSt}
          placeholder="Fiyat giriniz"
          onChange={onChangePrice}
        />
        <input className="default-hover w-100" type="submit" value="Onayla" />
      </form>
    </div>
  );

  const modal = (
    <Modal
      isOpen={modalIsOpen}
      onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal">
      <h2 ref={(_subtitle) => (subtitle = _subtitle)}>1</h2>

      {buttonInfo === 'addImage'
        ? modalAddImage
        : buttonInfo === 'deleteImage'
        ? madalDeleteImage
        : buttonInfo === 'addProperty'
        ? modalAddProperty
        : buttonInfo === 'addPrice'
        ? modalAddPrice
        : null}
      <button className="disabled-button" onClick={closeModal}>
        Kapat
      </button>
    </Modal>
  );
  if (match.params.id !== user._id) {
    alertify.error('Geçersiz istek!!!!!!!!!!!!!!!!');
    return <Redirect to="/home" />;
  }

  return (
    <Fragment>
      <div>
        <div className="rezervation-page-cover">
          <div className="rezervation-cover">
            <div className="rezervation-info">
              <h2>{currentUserHalisaha && currentUserHalisaha.name}</h2>
              <span>Halı saha puanı: </span>
              <StarRatings
                rating={currentUserHalisaha.avgPoint}
                starRatedColor="yellow"
                starDimension="17px"
                starSpacing="1px"
                numberOfStars={5}
                name="rating"
              />
              <span>
                {' '}
                {currentUserHalisaha.avgPoint &&
                  currentUserHalisaha.avgPoint.toFixed(2)}
              </span>
              <p style={{ textAlign: 'left' }}>
                Halı saha mesajı:{' '}
                <span className="yellow">
                  {' '}
                  {currentUserHalisaha && currentUserHalisaha.content}
                </span>
              </p>
            </div>
            <div className="rezervation-table-div">
              <MyTable
                userRezervationTable={userRezervationTable}
                authTable="managerTable"
              />
            </div>
          </div>
          <div className="rezervation-slider-prop">
            <div
              className="rezervation-slider"
              style={{ marginBottom: '20px' }}>
              <Slider images={images && images.length > 0 ? images : prp} />
            </div>
            <div className="rezervation-prop">
              {halisahaProperties &&
                halisahaProperties.map((item, index) => (
                  <div key={index}>
                    <input
                      type="checkbox"
                      onChange={() => {}}
                      checked={
                        properties && properties.includes(item) ? true : false
                      }
                    />
                    {item}
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
      {modal}
      <div style={{ textAlign: 'center' }} className="container btngrp mb-5">
        <button type="button" onClick={addImage} className="btn btn-danger">
          Resim ekle{' '}
        </button>
        <button onClick={deleteImage} className="btn btn-success ">
          Resim Sil{' '}
        </button>
        <button onClick={addProperty} className="btn btn-danger">
          Özellik ekle{' '}
        </button>
        <button onClick={addPrice} className="btn btn-success">
          Price ekle{' '}
        </button>
      </div>
    </Fragment>
  );
};

function mapStateToProps(state) {
  return {
    user: state.auth.user,
    currentHalisahaPriceTable: state.halisaha.currentHalisahaPriceTable,
    images: state.halisaha.currentUserHalisaha.image,
    userRezervationTable: state.halisaha.userRezervationTable,
    properties: state.halisaha.currentUserHalisaha.properties,
    currentUserHalisaha: state.halisaha.currentUserHalisaha,
  };
}
const mapDispatchToProps = {
  getHalisahaRezervationInfoForManager,
  setHalisahaImageUpload,
  deleteHalisahaImageAction,
  editHalisahaProperties,
  setPrice,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditHalisaha);
