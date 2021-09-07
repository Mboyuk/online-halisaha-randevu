import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCities } from '../../redux/actions/home';
import { removeHalisahalar } from "../../redux/actions/halisaha"
import { citiess } from './cties';
const Home = ({ getCities, removeHalisahalar, cities }) => {
  useEffect(() => {
    // getCities();
    removeHalisahalar()
  }, []);

  return (
    <Fragment>
      <div style={{textAlign:"center"}} className="container home-content ">
        <h4>Halisahacim.com ile halısahan sadece birkaç tık uzaklıkta! Şehirinizi seçip randevu alın</h4>
      </div>
      <div className="city-cover container">
        {citiess && citiess.map((item) => (
        
            <div key={item.plakaNo}  className="plaka-name-cover" >
              <Link className="link" to={'/halisaha/' + item.name}   >
                <div className="plaka-no">
                  <span> {item.plakaNo}  </span>
                </div>
                <span className="city-name"> {item.name} </span>
              </Link>
            </div>
          
         
      ))}
      </div>  
      
    </Fragment>
  );
};

function mapStateToProps(state) {
  return {
    cities: state.home.cities,
  };
}
const mapDispatchToProps = {
  getCities,
  removeHalisahalar
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
