import { useContext, useState } from "react";
import "./profileUpdatePage.scss";
import { AuthContext } from "../../context/AuthContext";
import apiRequest from "../../components/lib/apiRequest";
import { useNavigate } from "react-router-dom";
import UploadWidget from "../../components/uploadWidget/uploadWidget";

function ProfileUpdatePage() {
  const [error, setError] = useState("");
  const { currentUser, updateUser } = useContext(AuthContext);
  const [avatar, setAvatar] = useState([]);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const { username, email, password } = Object.fromEntries(formData);

    try {
      const res = await apiRequest.put(`/users/${currentUser.id}`, {
        username,
        email,
        password,
        avatar: avatar[0],
      });
      updateUser(res.data);
      navigate("/profile");
    } catch (err) {
      console.log(err);
      setError(err.response.data.message);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className="profileUpdatePage">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Update Profile</h1>
          <div className="item">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" name="username" defaultValue={currentUser.username} className="input-field" />
          </div>
          <div className="item">
            <label htmlFor="email">Email</label>
            <input type="text" id="email" name="email" defaultValue={currentUser.email} className="input-field" />
          </div>
          <div className="item">
            <label htmlFor="password">Password</label>
            <div className="password-container">
              <input
                type={showPassword ? "password" : "text"}
                id="password"
                name="password"
                className="input-field"
              />
              <button type="button" className="toggle-password" onClick={toggleShowPassword}>
                <i className={showPassword ? "fas fa-eye-slash" :  "fas fa-eye" }></i>
              </button>
            </div>
          </div>
          <div>
          <button>Update</button>
          {error && <span>{error}</span>}
          </div>
          
        </form>
      </div>
      <div className="sideContainer">
        <img src={avatar[0] || currentUser.avatar || "/noavatar.png"} alt="" />
        <UploadWidget
          uwConfig={{
            cloudName: "dhja77zhk",
            uploadPreset: "estate",
            multiple: false,
            maxImageFileSize: 2000000,
            folder: "avatars",
          }}
          setState={setAvatar}
        />
      </div>
    </div>
  );
}

export default ProfileUpdatePage;
