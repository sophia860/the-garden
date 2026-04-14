import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="border-t-2 border-foreground bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16">
        {/* Top row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          <div>
            <h3 className="font-serif text-2xl font-bold mb-4">The Garden</h3>
            <p className="font-body text-sm text-muted-foreground leading-relaxed max-w-xs">
              A platform interested in the hands, not just the parcel.
            </p>
          </div>

          <div>
            <h4 className="font-mono text-xs uppercase tracking-widest mb-4 text-muted-foreground">Navigate</h4>
            <div className="space-y-2">
              {[
                { label: 'Writers', path: '/writers' },
                { label: 'Journals', path: '/journals' },
                { label: 'Editions', path: '/editions' },
                { label: 'Residency', path: '/residency' },
                { label: 'About', path: '/about' },
              ].map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="block font-body text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-mono text-xs uppercase tracking-widest mb-4 text-muted-foreground">Join</h4>
            <div className="space-y-3">
              <Link
                to="/writers"
                className="block font-body text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Join as a writer
              </Link>
              <Link
                to="/journals"
                className="block font-body text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Join as a journal
              </Link>
              <Link
                to="/pricing"
                className="block font-body text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Pricing
              </Link>
              <Link
                to="/manifesto"
                className="block font-body text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Read the Manifesto
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom rule + colophon */}
        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <p className="font-mono text-xs text-muted-foreground tracking-wide">
            © {new Date().getFullYear()} The Page Gallery. All rights reserved.
          </p>
          <p className="font-mono text-xs text-muted-foreground tracking-wide italic">
            Not a feed, but a garden.
          </p>
        </div>
      </div>
    </footer>
  );
}