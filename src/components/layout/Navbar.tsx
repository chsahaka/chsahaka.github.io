import { NavLink, useLocation } from 'react-router-dom';
import { cn } from '../../lib/utils';
import { navLinks } from '../../data';

export default function Navbar() {
  const location = useLocation();

  return (
    <nav className="fixed top-8 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-max flex justify-center">
      <div className="flex items-center gap-1 px-1 py-1 rounded-full border border-white/10 bg-black/40 backdrop-blur-md overflow-x-auto no-scrollbar">
        {navLinks.map((item) => {
          // Only highlight if it's an exact match AND we aren't on the landing page.
          // This ensures the nav is completely unhighlighted when the user is on '/'
          const isActive = location.pathname === item.path && location.pathname !== '/';

          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={cn(
                "px-3 md:px-5 py-2 rounded-full text-[10px] md:text-xs font-medium tracking-wider transition-all duration-300 whitespace-nowrap",
                isActive 
                  ? "bg-white/10 text-white" 
                  : "text-white/50 hover:text-white hover:bg-white/5"
              )}
            >
              {item.name}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}
