import "./style.css";

const Header = () => { 
    const name = "Ricardo Cooper";
    return (
        <header className="header">
            <div className="container">
                <div className="header-content">
                    <div className="profile-photo"></div>
                            <div className="profile-name">{name}</div>
                            <div className="profile-btn__wrap">
                                <button className="profile-btn Message">Message</button>
                                <button className="profile-btn Call">Call</button>
                            </div>
                    </div>
            </div>
        </header>
    );
}
export default Header; 