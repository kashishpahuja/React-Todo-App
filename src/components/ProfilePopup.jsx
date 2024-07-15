import React, { useContext, useState , useEffect} from 'react';
import AuthContext from '../auth/AuthContext';
import {convertBase64} from '../helper/index'

function ProfilePopup({user}) {
  const {updateUser}=useContext(AuthContext)
  const [formData,setFormData]=useState({
    id:user?.id,
    email:user?.email,
    name:user?.name,
    dob: user?.dob || '',
    gender: user?.gender || [],
    contact: user?.contact || '',
    image:user?.image || ''
  })
 
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

  const handleChange = (e) => {
        let {name,value,type}=e.target;
        console.log(e.target.value)
        setFormData((prev)=>({
                ...prev,
                [name]:value
            }))
        };
  
  const [imgVal,setImgVal]=useState("");

  const handleImage = async (e)=>{
    let file = e.target.files[0]
    let imgString = await convertBase64(file);
    setImgVal(imgString);
    setFormData((prev)=>({
      ...prev,
      image :imgString
      }))
  }

  const handleSubmit=(e)=>{
    e.preventDefault();
    updateUser(formData)
    };
  


  return (
    <div>
      <div className="modal fade" id="profile-modal" tabIndex="-1" aria-labelledby="profile-modal-label" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content bg-primary text-white">
            <div className="modal-header">
              <h5 className="modal-title" id="profile-modal-label">Edit Profile Details</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="dob" className="form-label">Date of Birth</label>
                  <input
                    type="date"
                    name='dob'
                    value={formData.dob}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Gender</label>
                  <div>
                    <input
                      type="radio"
                      name='gender'
                      value="Male"
                      checked={formData.gender.includes("Male")}
                      onChange={handleChange}
                    />
                    <label htmlFor="male" className="form-check-label"> Male </label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      name='gender'
                      value="Female"
                      checked={formData.gender.includes("Female")}
                      onChange={handleChange}
                    />
                    <label htmlFor="female" className="form-check-label"> Female </label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      name='gender'
                      value="Other"
                      checked={formData.gender.includes("Other")}
                      onChange={handleChange}
                    />
                    <label htmlFor="other" className="form-check-label"> Other </label>
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="contact" className="form-label">Contact No.</label>
                  <input
                    type="text"
                    name='contact'
                    value={formData.contact}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Enter contact number"
                  />
                </div>
                <input type="file" onChange={handleImage} value={formData.imgVal} accept='image/*' />

                <button type="submit" className="btn btn-light" data-bs-dismiss="modal" >Save Changes</button>
              </form>
            </div>
          </div>
        </div>
      </div>  
    </div>
  );
}
export default ProfilePopup;
