import React from 'react';
import { Outlet } from 'react-router-dom';
import NavigationBar from './NavigationBar';
import Footer from './Footer';

export default function SiteLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <NavigationBar />
      <main className="flex-1 pt-16">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}