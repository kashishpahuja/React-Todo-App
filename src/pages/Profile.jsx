import {React, useState, useContext, useEffect} from 'react';
import Photo from '../assets/resumePhoto.jpg';
import AuthContext from '../auth/AuthContext';
import ProfilePopup from '../components/ProfilePopup';
import { formatDob } from '../helper/index'
// import { useNavigate } from 'react-router-dom';



function Profile(props) { 
  const {user}=useContext(AuthContext)

  const [formData, setFormData] = useState({
    id:user?.id,
    email:user?.email,
    name:user?.name,
    dob: user?.dob || '',
    gender: user?.gender || [],
    contact: user?.contact || '',
    image:user?.image || ''
  });
 
  useEffect(() => {
    if (user) {
      setFormData({
        id: user.id,
        email: user.email,
        name: user.name,
        dob: user.dob || '',
        gender: user.gender || [],
        contact: user.contact || '',
        image: user.image || ''
      });
    }
  }, [user]);

  const [imgVal,setImgVal]=useState("");

  
  
  return (
    <div className="container">
      <div className="row d-flex justify-content-center align-items-center">
        <div className="col-md-6">
          <img src={formData.image || imgVal} className="card-img-top" alt="..." style={{ width: '100%', border:"2px solid"}} />
        </div>
        <div className="col-md-6">
          <div className="card-body text-center">
            <h3 className="card-title ">{user.name}</h3>
            <div className="p-4">
            <p>{formData.dob}</p>
            <p>{formData.gender}</p>
            <p>{formData.contact}</p>
            </div>
            <button className="btn btn-light text-dark border-black " data-bs-toggle="modal" data-bs-target="#profile-modal" >Edit Profile</button>
          </div>
        </div>
      </div>
    <ProfilePopup user={formData}/>
      
    </div>

  )
}

export default Profile