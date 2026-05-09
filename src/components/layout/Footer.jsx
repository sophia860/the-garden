import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-black text-white border-t-4 border-black">

      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-14">
          {/* Brand */}
          <div className="md:col-span-2">
            <h3 className="font-serif text-2xl font-black mb-4 text-white">The Garden</h3>
            <p className="font-body text-sm text-white/50 leading-relaxed max-w-xs">
              A platform interested in the hands, not just the parcel. Free for writers. Forever.
            </p>
            <Link
              to="/garden"
              className="mt-6 inline-block font-mono text-xs uppercase tracking-widest border border-white/30 px-5 py-2.5 hover:bg-white hover:text-black transition-colors"
            >
              Enter the Garden
            </Link>
          </div>

          {/* Navigate */}
          <div>
            <h4 className="font-mono text-[10px] uppercase tracking-[0.25em] mb-5 text-white/30">Navigate</h4>
            <div className="space-y-2.5">
              {[
                { label: 'Writers', path: '/writers' },
                { label: 'Journals', path: '/journals' },
                { label: 'Editions', path: '/editions' },
                { label: 'Residency', path: '/residency' },
                { label: 'About', path: '/about' },
              ].map((link) => (
                <Link key={link.path} to={link.path} className="block font-mono text-xs text-white/50 hover:text-white transition-colors uppercase tracking-widest">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* More */}
          <div>
            <h4 className="font-mono text-[10px] uppercase tracking-[0.25em] mb-5 text-white/30">More</h4>
            <div className="space-y-2.5">
              {[
                { label: 'Pricing', path: '/pricing' },
                { label: 'Manifesto', path: '/manifesto' },
                { label: 'Garden', path: '/garden' },
              ].map((link) => (
                <Link key={link.path} to={link.path} className="block font-mono text-xs text-white/50 hover:text-white transition-colors uppercase tracking-widest">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <p className="font-mono text-[10px] text-white/30 tracking-widest uppercase">
            © {new Date().getFullYear()} The Page Gallery · Arrayan Ediciones
          </p>
          <p className="font-serif text-sm italic text-white/20">
            Not a feed, but a garden.
          </p>
        </div>
      </div>
    </footer>
  );
}