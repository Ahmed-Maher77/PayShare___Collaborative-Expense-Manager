import "./Loader.css";

const Loader = () => {
    return (
        <div className="loader-container" role="status" aria-live="polite" aria-busy="true" aria-label="Loading app data">
            <div className="loader">
                <div className="loading-text">
                    Loading<span className="dot">.</span>
                    <span className="dot">.</span>
                    <span className="dot">.</span>
                </div>
                <div className="loading-bar-background">
                    <div className="loading-bar">
                        <div className="white-bars-container">
                            <div className="white-bar"></div>
                            <div className="white-bar"></div>
                            <div className="white-bar"></div>
                            <div className="white-bar"></div>
                            <div className="white-bar"></div>
                            <div className="white-bar"></div>
                            <div className="white-bar"></div>
                            <div className="white-bar"></div>
                            <div className="white-bar"></div>
                            <div className="white-bar"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Loader;
