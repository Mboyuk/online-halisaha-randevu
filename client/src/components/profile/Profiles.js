import React, { Fragment, useState } from 'react';
import Profile from './Profile';
import Photo from './Photo';
import Account from './Account';
import { ListGroupItem } from 'reactstrap';
import { connect } from 'react-redux';

const Profiles = ({ userImage, userName }) => {
  const [renderEdit, setRenderEdit] = useState({
    default: 'profile',
  });

  const profilBtn = () => {
    setRenderEdit({
      default: 'profile',
    });
  };
  const photoBtn = () => {
    setRenderEdit({
      default: 'photo',
    });
  };
  const accountBtn = () => {
    setRenderEdit({
      default: 'account',
    });
  };
  return (
    <Fragment>
      <div className="container profile-cover">
        <div className="img-list-cover">
          <div>
            <img
              style={{ borderRadius: '50%' }}
              width="150px"
              height="150px"
              src={'/uploads/' + userImage}
              alt=""
            />
          </div>
          <br/>
          <p> {userName}</p>
          <div className="list-cover">
            <ListGroupItem
              active={renderEdit.default === 'profile' ? true : false}
              onClick={profilBtn}>
              Profil
            </ListGroupItem>
            <ListGroupItem
              active={renderEdit.default === 'photo' ? true : false}
              onClick={photoBtn}>
              Fotoğraf
            </ListGroupItem>
            <ListGroupItem
              active={renderEdit.default === 'account' ? true : false}
              onClick={accountBtn}>
              Hesap
            </ListGroupItem>
          </div>
        </div>
        <div className="edit-profile-info-cover ">
            <div className="edit-profile-info"> 
                {renderEdit.default === 'profile' ? (
                    <Profile />
                ) : renderEdit.default === 'photo' ? (
                    <Photo />
                ) : (
                    <Account />
                )}    
            </div>

        </div>
      </div>
    </Fragment>
  );
};
function mapStateToProps(state) {
  return {
    userImage: state.auth.user.profile_image,
    userName: state.auth.user.name
  };
}
export default connect(mapStateToProps, null)(Profiles);
