import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function usePageTitle() {
  const location = useLocation();

  useEffect(() => {
    let title = 'a jornual'; // Default for home page

    if (location.pathname === '/about') {
      title = 'About Me';
    } else if (location.pathname === '/timeline') {
      title = 'Achievements';
    } else if (location.pathname.startsWith('/projects')) {
      title = 'Projects';
    }

    document.title = title;
  }, [location]);
}
