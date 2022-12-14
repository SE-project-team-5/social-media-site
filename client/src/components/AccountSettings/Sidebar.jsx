import React from 'react';

import style from './Settings.module.css';

const Sidebar = (props) => {
    const tabs = props.tabs.map((tab, i) => (
        <div
            key={i}
            className={`${style.Tab} ${
                i === props.selected ? style.Selected : ''
            }`}
            onClick={() => props.setSelected(i)}
        >
            {tab}
        </div>
    ));

    return <nav className={style.Sidebar} style={props.style}>{tabs}</nav>;
};

export default Sidebar;
