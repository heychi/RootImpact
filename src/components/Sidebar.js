import React from 'react';
import '../style/Sidebar.css';

const Sidebar = () => {
  const forwarders = [
    { id: 1, name: '업체 1', logo: 'https://via.placeholder.com/50' },
    { id: 2, name: '업체 2', logo: 'https://via.placeholder.com/50' },
  ];

  return (
    <div className="sidebar">
      <h2 className="sidebar-title">포워더</h2>
      <ul className="sidebar-menu">
        {forwarders.map((forwarder) => (
          <li key={forwarder.id} className="sidebar-item">
            <img
              src={forwarder.logo}
              alt={`${forwarder.name} 로고`}
              className="sb-forwarder-logo"
            />
            <span>{forwarder.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
