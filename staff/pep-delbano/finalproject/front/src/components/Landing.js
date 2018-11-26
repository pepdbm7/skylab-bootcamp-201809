import React from 'react'

function Landing(props) {
    return <div className="landing-container">
                <h1 className="landing-title" data-letters="planbe">plan<span className="landing-underline-b">b</span><span className="landing-e">e</span></h1>
                <h2 className="landing-subtitle">fresh bites</h2>

                <section className="landing-buttons">
                        <button className="btn btn-primary btn-lg landing-btn" onClick={props.onRegisterClick}>Sign Up</button>
                        <button className="btn btn-primary btn-lg landing-btn" onClick={props.onLoginClick}>Sign In</button>
                </section>
    </div>
}

export default Landing