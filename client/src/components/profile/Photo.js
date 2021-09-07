import alertify from 'alertifyjs';
import React, { Fragment, useState } from 'react'
import { connect } from 'react-redux';
import { editProfilePhoto } from '../../redux/actions/auth';
const Photo = ({ editProfilePhoto, history }) => {
    const [profileImage, setProfileImage] = useState({
        selectedFile:null
    })
    const { selectedFile } = profileImage;
    
    const onSubmit = (e) => {
        e.preventDefault();
        if(!selectedFile) {
            alertify.error("Lütfen geçerli bir fotoğraf ekleyin...")
        } else {
            const fd = new FormData();
            fd.append("profile_image", selectedFile, selectedFile.name)
            editProfilePhoto(fd, history)
            alertify.success("Fotoğraf başarıyla güncellendi...")
        }
       
    }
    const onFileChange = (e) => {
        setProfileImage({
            selectedFile: e.target.files[0]
        })
        console.log(selectedFile)  
    }
    return (
        <Fragment>
            <div> 
                <h2> Fotoğraf Güncelle</h2>
                <form className="input-group mt-5" onSubmit={onSubmit}>
                    <input className="form-control" type="file" name="profile_image" onChange={onFileChange}/>
                    <input className="default-hover" type="submit" value="Güncelle"/>
                </form>          
            </div>

        </Fragment>
    )

        

}


const mapDispatchToProps = {
    editProfilePhoto,
}
export default connect(null, mapDispatchToProps)(Photo) 