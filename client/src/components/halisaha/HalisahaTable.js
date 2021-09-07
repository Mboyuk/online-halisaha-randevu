import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import MyTable from '../toolbox/MyTable';
import { getHalisahaRezervationInfoForUser } from '../../redux/actions/halisaha';
import Slider from '../toolbox/Slider';
import { Spinner } from 'react-bootstrap';
import StarRatings from 'react-star-ratings';
const HalisahaTable = ({
  getHalisahaRezervationInfoForUser,
  rezervationTable,
  images,
  match,
  properties,
  currentHalisaha,
  currentComment,
  loading,
}) => {
  useEffect(() => {
    const { id, slug, city } = match.params;
    getHalisahaRezervationInfoForUser(city, id, slug);
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

  const prp = ['default.jpg'];
  const spinner = (
    <div style={{ marginLeft: '45%', marginTop: '150px' }}>
      <Spinner animation="border" variant="primary" />
    </div>
  );
  const createStar = (count) => {
    let a = [];
    for (let i = 0; i < parseInt(count); i++) {
      a.push(1);
    }
    return a;
  };
  return (
    <Fragment>
      {loading ? (
        spinner
      ) : (
        <div>
          <div className="rezervation-page-cover">
            <div className="rezervation-cover">
              <div className="rezervation-info">
                <h2>{currentHalisaha && currentHalisaha.name}</h2>
                <span>Halı saha puanı: </span>
                <StarRatings
                  rating={currentHalisaha.avgPoint}
                  starRatedColor="yellow"
                  starDimension="17px"
                  starSpacing="1px"
                  numberOfStars={5}
                  name="rating"
                />
                <span>
                  {' '}
                  {currentHalisaha.avgPoint &&
                    currentHalisaha.avgPoint.toFixed(2)}
                </span>
                <p style={{ textAlign: 'left' }}>
                  Halı saha mesajı:{' '}
                  <span className="yellow">
                    {' '}
                    {currentHalisaha && currentHalisaha.content}
                  </span>
                </p>
              </div>
              <div className="rezervation-table-div">
                <MyTable
                  userRezervationTable={rezervationTable}
                  authTable="userTable"
                  currentHalisaha={currentHalisaha && currentHalisaha.slug}
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

          <div>
            {currentComment &&
              currentComment.map((item) => (
                <div key={item._id} className="comment-cover container row">
                  <div className="comment col-9">{item.comment}</div>
                  <div className="comment-info col-3">
                    <div>
                      <img src={`/uploads/${item.profile_image}`} alt=""></img>
                    </div>
                    <div>{item.userNickname}</div>
                    <div>
                      {createStar(item.point).map((item, index) => (
                        <i key={index} className="fa fa-star yellow" />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </Fragment>
  );
};
const mapDispatchToProps = {
  getHalisahaRezervationInfoForUser,
};
function mapStateToProps(state) {
  return {
    rezervationTable: state.halisaha.rezervationTable,
    images: state.halisaha.currentHalisaha.image,
    properties: state.halisaha.currentHalisaha.properties,
    currentHalisaha: state.halisaha.currentHalisaha,
    currentComment: state.halisaha.currentComment,
    loading: state.halisaha.loadingBigTable,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HalisahaTable);
