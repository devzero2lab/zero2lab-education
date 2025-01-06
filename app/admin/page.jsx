"use client"
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Courses from './Courses';
import Users from './Users';
import Settings from './Settings';

function AdminPage() {
  const [activePage, setActivePage] = useState('courses');

  const renderContent = () => {
    switch (activePage) {
      case 'courses':
        return <Courses />;
      case 'users':
        return <Users />;
      case 'settings':
        return <Settings />;
      default:
        return <div>Select a page</div>;
    }
  };

  return (
    <div className="flex mt-12">
      <Sidebar onMenuSelect={setActivePage} />
      <div className="w-full h-screen bg-gray-100">{renderContent()}</div>
    </div>
  );
}

export default AdminPage;
