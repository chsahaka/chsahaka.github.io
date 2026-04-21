import { Mail, Github, Linkedin, Send } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="fixed bottom-8 left-0 w-full px-12 flex justify-between items-center z-50 pointer-events-none">
      <div className="font-mono text-xs tracking-widest text-white/40 pointer-events-auto hover:text-[#00F0FF] transition-colors cursor-default">
        CONNECT_
      </div>
      
      <div className="flex items-center gap-6 pointer-events-auto">
        <a href="mailto:hello@example.com" className="text-white/40 hover:text-[#00F0FF] hover:shadow-[0_0_10px_#00F0FF] transition-all duration-300 rounded-full p-1">
          <Mail className="w-4 h-4" />
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-white/40 hover:text-[#00F0FF] hover:shadow-[0_0_10px_#00F0FF] transition-all duration-300 rounded-full p-1">
          <Linkedin className="w-4 h-4" />
        </a>
        <a href="https://github.com" target="_blank" rel="noreferrer" className="text-white/40 hover:text-[#00F0FF] hover:shadow-[0_0_10px_#00F0FF] transition-all duration-300 rounded-full p-1">
          <Github className="w-4 h-4" />
        </a>
        <a href="https://t.me/yourusername" target="_blank" rel="noreferrer" className="text-white/40 hover:text-[#00F0FF] hover:shadow-[0_0_10px_#00F0FF] transition-all duration-300 rounded-full p-1">
          <Send className="w-4 h-4" />
        </a>
      </div>
    </footer>
  );
}
