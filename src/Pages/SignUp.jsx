export default function Login(){
    return(
        <div className="signup common">
                <p className="left"></p>
                <p className="right"></p>
                <p className="bottom"></p>
            <h2>SignUp</h2>
            <hr/>
            <form action="">
                <input
                type="text"
                placeholder="Enter Your Name"
                required />
                <input
                type="email"
                placeholder="Enter Your Email"
                required />
                <input
                type="password"
                placeholder="Password"
                required />
                <input
                type="password" 
                placeholder="Confirm Password"
                required/>
                <button>SignUp</button>
            </form>
        </div>
    );
}