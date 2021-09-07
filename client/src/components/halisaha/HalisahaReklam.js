import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import StarRatings from 'react-star-ratings';
import { Spinner } from "react-bootstrap"
import {
  getHalisaha,
  changeHalisaha,
  removeCurrentHalisaha,
} from '../../redux/actions/halisaha';
const HalisahaReklam = ({
  getHalisaha,
  changeHalisaha,
  removeCurrentHalisaha,
  halisahalar,
  currentHalisaha,
  match,
  loading
}) => {
  useEffect(() => {
    const city = match.params.city;
    sortHalisaha()
    getHalisaha(city);
    removeCurrentHalisaha();
  }, []); //getHalisaha, match.params.city, removeCurrentHalisaha
  const sortHalisaha = () => {
    halisahalar.sort(function(a, b) {
        return a.avgPoint - b.avgPoint
    })
    halisahalar.slice(5,halisahalar.length-1)
  }


  const clickLink = (currentHalisaha) => {
    changeHalisaha(currentHalisaha);
  };
  const spinner = (
    <div style={{marginLeft:"45%"}}>
        <Spinner  animation="border" variant="primary" />
    </div>
    
  )
  return (
    <Fragment>
        <div className="container halisaha-reklam-content" style={{textAlign:"center", marginBottom:"3rem"}}> 
            <h3>
                <span> {match.params.city} </span>
                <span>şehrindeki en yüksek puanlı halısahalar.</span>
                <span> Aradığınızı bulamadınız mı? </span>
                <p>
                    <Link className="link" to={`/halisaha/${match.params.city}/search`}>Arama</Link> sayfamıza göz atabilirsiniz...
                </p>

            </h3>
        </div>
      
      {
        loading ?
        spinner :  
        <div className="container">
        <table className="table table-striped sort-table table-hover">
          <thead>
            <tr>
              <th>Halısahalar</th>
              <th>Puan</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody >
            {
              halisahalar.map((halisaha) => (
                <tr key={halisaha._id} style={{alignItems:"center"}}>
                  <td  >
                    <Link
                      className="link black"
                      onClick={() => clickLink(halisaha)}
                      to={
                        halisaha.city + '/' + halisaha._id + '/' + halisaha.slug
                      }>
                      {halisaha.name}
                    </Link>
                  </td>
                  <td >
                    <StarRatings
                      rating={halisaha.avgPoint}
                      starRatedColor="red"
                      starDimension="17px"
                      starSpacing="1px"
                      numberOfStars={5}
                      name="rating"
                    />
                    <span style={{marginLeft:"5px", alignItems:"center"}} >
                      {halisaha.avgPoint.toFixed(2)}
                    </span>
                  </td>
                  <td> {halisaha.price} </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      }
    </Fragment>
  );
};

function mapStateToProps(state) {
  return {
    halisahalar: state.halisaha.halisahalar,
    currentHalisaha: state.halisaha.currentHalisaha,
    loading: state.halisaha.loadingMiniTable
  };
}
const mapDispatchToProps = {
  getHalisaha,
  changeHalisaha,
  removeCurrentHalisaha,
  
};

export default connect(mapStateToProps, mapDispatchToProps)(HalisahaReklam);
