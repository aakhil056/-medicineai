import { Link, useLocation } from 'react-router-dom';
import { Stethoscope, Activity, FileText } from 'lucide-react';
import { motion } from 'framer-motion';

function Navbar() {
  const location = useLocation();

  const links = [
    { name: 'Home', path: '/', icon: Activity },
    { name: 'Predict', path: '/predict', icon: Stethoscope },
    { name: 'Scanner', path: '/scanner', icon: FileText },
  ];

  return (
    <nav className="sticky top-0 z-50 glass-card border-b border-zinc-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-brand-500/10 p-2 rounded-xl group-hover:bg-brand-500/20 transition-colors">
              <Stethoscope className="w-6 h-6 text-brand-400" />
            </div>
            <span className="font-bold text-xl tracking-tight">
              Med<span className="text-brand-400">AI</span>
            </span>
          </Link>

          <div className="flex space-x-1">
            {links.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.path;

              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2
                    ${isActive ? 'text-brand-400' : 'text-zinc-400 hover:text-zinc-100 hover:bg-white/5'}`}
                >
                  <Icon className="w-4 h-4" />
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute inset-0 border border-brand-500/30 bg-brand-500/10 rounded-lg -z-10"
                      initial={false}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
