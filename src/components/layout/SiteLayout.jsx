import React from 'react';
import { Outlet } from 'react-router-dom';
import NavigationBar from './NavigationBar';
import Footer from './Footer';

export default function SiteLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <NavigationBar />
      <main className="flex-1 pt-[88px] md:pt-[88px]">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}