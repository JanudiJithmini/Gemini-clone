import React, { useState, useContext } from "react";
import "./Sidebar.css";
import { assets } from "../../assets/assets/assets";
import { Context } from "../../context/context";

const Sidebar = () => {
  const [extended, setExtended] = useState(false);

  // ⭐ Get prompts from global context
  const { prevPrompts } = useContext(Context);

  return (
    <div className="sidebar">
      <div className="top">
        <img
          onClick={() => setExtended(!extended)}
          className="menu"
          src={assets.menu_icon}
          alt=""
        />

        <div className="new-chat">
          <img src={assets.plus_icon} alt="" />
          {extended ? <p>New Chat</p> : null}
        </div>

        {extended ? (
          <div className="recent">
            <p className="recent-title">Recent</p>

            {prevPrompts.length === 0 && <p>No history yet...</p>}

            {prevPrompts.map((item, index) => (
              <div className="recent-entry" key={index}>
                <img src={assets.message_icon} alt="" />
                <p>{item.slice(0, 20)}...</p>
              </div>
            ))}
          </div>
        ) : null}
      </div>

      <div className="bottom">
        <div className="bottom-item recent-entry">
          <img src={assets.question_icon} alt="" />
          {extended ? <p>Help</p> : null}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.history_icon} alt="" />
          {extended ? <p>Activity</p> : null}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.setting_icon} alt="" />
          {extended ? <p>Setting</p> : null}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
