// flex
import pic from '../assets/pic1.jpg';

export default function CreateRoom({ name, date }) {
    const datee = new Date(date);
    const day = datee.getDate();
    const month = datee.toLocaleString('en-US', { month: 'short' });
    const year = datee.getFullYear();

    return (
    <div className="room">
        <span id="name">{name}</span>
        <img src={pic} alt="Profile" />
        <span className="date">
            <span className="day">{day}</span>
            <span className="month">{month}</span>
            <span className="year">{year}</span>
        </span>
        <button>Join</button>
    </div>
);
}