import { Globe, MessageCircle, Mail } from 'lucide-react';

function Footer() {
  return (
    <footer className="border-t border-zinc-800/50 bg-mainbg/50 mt-auto py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex flex-col items-center md:items-start gap-1">
          <span className="font-bold text-lg tracking-tight text-zinc-300">
            Med<span className="text-brand-400">AI</span>
          </span>
          <span className="text-xs text-zinc-500">
            Intelligent healthcare solutions.
          </span>
        </div>
        
        <div className="flex gap-4 text-zinc-500">
          <a href="#" className="hover:text-brand-400 transition-colors">
            <Globe className="w-5 h-5" />
          </a>
          <a href="#" className="hover:text-brand-400 transition-colors">
            <MessageCircle className="w-5 h-5" />
          </a>
          <a href="#" className="hover:text-brand-400 transition-colors">
            <Mail className="w-5 h-5" />
          </a>
        </div>
        
        <div className="text-sm text-zinc-500">
          &copy; {new Date().getFullYear()} MedAI. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
