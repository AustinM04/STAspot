import React from 'react';
import { auth } from '/src/config/firebase.js'


const Avatar = () => {

    if (auth.currentUser) {
        const pfpUrl = auth.currentUser.photoURL;
        const name = auth.currentUser.displayName;
        return (
            < div >
                <img
                    className = "avatar"
                    src = {pfpUrl}
                    alt = {name}
                    width = {100}
                    height = {100} />
            </div>
        )
        }
    
}

export default Avatar;