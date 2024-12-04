import pic from '../assets/pic1.jpg';
import NavBar from '../Component/NavBar';

export default function Profile() {
    return (<>
    <NavBar></NavBar>
            <div className="profile">
            <img className="profile-pic" src={pic} alt="Profile" />
            <div className="buttons">
                <button>Back</button>
                <button>Upload new picture</button>
                <button>Delete</button>
            </div>
        </div>
    </>

    );
}
