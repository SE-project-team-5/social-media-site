import React from "react";
import "./Header.css";

function Header({setCreatePost}) {
    return (
        <div id="header-container">
            <p>Social Media Site</p>
            <div id="header-features-container">
                <div id="create-post-btn" onClick={() => setCreatePost(true)}>Create a Post</div>
                <img id="header-profile-pic" src="https://picsum.photos/40/40?random=3" />
            </div>
        </div>
    );
}

export default Header