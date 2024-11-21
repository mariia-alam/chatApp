export default function Login(){
    return(
        <div className="common">
                <p className="left"></p>
                <p className="right"></p>
                <p className="bottom"></p>
            <h2>Login</h2>
            <hr/>
            <form action="">
                <input type="email"
                placeholder="Enter Your Email"
                required />
                <input type="password"
                placeholder="Password"
                required />
                <button>Login</button>
            </form>
        </div>
    );
}