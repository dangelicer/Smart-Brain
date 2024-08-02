import React from "react";

const Navigation = ({ onRouteChange, isSignedIn }) => {
        if (isSignedIn) {
            return (
                <nav style={{display: 'flex', justifyContent: 'end'}}>
                <p onClick={() => onRouteChange('signin')} className={'f3 link dim black underline pa4 ma0 pointer'}>Sign Out</p>
                </nav>
            )
        } else {
            return (
                <nav style={{display: 'flex', justifyContent: 'end'}}>
                    <p onClick={() => onRouteChange('signin')} className={'f3 link dim black underline pa4 ma0 pointer'}>Sign In</p>
                    <p onClick={() => onRouteChange('register')} className={'f3 link dim black underline pa4 ma0 pointer'}>Register</p>
                </nav>
            );
        }
}

export default Navigation;