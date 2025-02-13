import React from 'react';
import '../style/Sidebar.css';

const Sidebar = () => {
  const forwarders = [
    { id: 1, name: '업체 1' },
    { id: 2, name: '업체 2' },
  ];

  return (
    <div className="sidebar">
      <h2 className="sidebar-title">포워더</h2>
      <ul className="sidebar-menu">
        {forwarders.map((forwarder) => (
          <li key={forwarder.id} className="sidebar-item">
            <span>{forwarder.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
