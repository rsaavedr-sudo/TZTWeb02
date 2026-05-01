
import React from 'react';
import { 
  LayoutDashboard, 
  MessageSquare, 
  Trophy, 
  Map, 
  Layers, 
  History, 
  ChevronRight,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle,
  LogOut,
  User as UserIcon,
  Shield
} from 'lucide-react';
import { ProductID, features, changelog, Status, Priority, User } from '../../data/hubData';

interface HubSidebarProps {
  activeView: string;
  setActiveView: (view: string) => void;
  onLogout: () => void;
  currentUser: User | null;
}

const Sidebar: React.FC<HubSidebarProps> = ({ activeView, setActiveView, onLogout, currentUser }) => {
  const menuItems = [
    { id: 'home', label: 'Overview', icon: LayoutDashboard },
    { id: 'flow360', label: 'Flow360', icon: MessageSquare },
    { id: 'indika', label: 'Indika', icon: Trophy },
    { id: 'roadmap', label: 'Roadmap', icon: Map },
    { id: 'shared', label: 'Shared Modules', icon: Layers },
    { id: 'changelog', label: 'Changelog', icon: History },
  ];

  return (
    <div className="w-64 bg-slate-900 text-white min-h-screen flex flex-col fixed left-0 top-0">
      <div className="p-6 border-b border-slate-800">
        <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-sm">T0</div>
          Product Hub
        </h1>
        <p className="text-xs text-slate-400 mt-2">Internal Command Center</p>
      </div>

      {currentUser && (
        <div className="p-4 border-b border-slate-800 bg-slate-900/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center text-blue-400 border border-slate-700">
              <UserIcon size={20} />
            </div>
            <div>
              <p className="text-sm font-bold text-white capitalize">{currentUser.username}</p>
              <div className="flex items-center gap-1 mt-0.5">
                <Shield size={10} className={currentUser.role === 'admin' ? 'text-blue-400' : 'text-slate-500'} />
                <p className={`text-[10px] uppercase font-bold tracking-wider ${
                  currentUser.role === 'admin' ? 'text-blue-400' : 'text-slate-500'
                }`}>
                  {currentUser.role}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <nav className="flex-grow p-4 space-y-1">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveView(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
              activeView === item.id 
                ? 'bg-blue-600 text-white' 
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <item.icon size={18} />
            {item.label}
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-800 space-y-4">
        <button 
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-slate-400 hover:bg-rose-500/10 hover:text-rose-500 transition-all"
        >
          <LogOut size={18} />
          Sign Out
        </button>

        <div className="bg-slate-800/50 p-3 rounded-lg">
          <p className="text-[10px] uppercase font-bold text-slate-500 mb-2">Build Status</p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-xs text-slate-300">Operations Stable</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export const StatusBadge: React.FC<{ status: Status }> = ({ status }) => {
  const styles = {
    'done': 'bg-emerald-100 text-emerald-700 border-emerald-200',
    'in-progress': 'bg-amber-100 text-amber-700 border-amber-200',
    'planned': 'bg-slate-100 text-slate-600 border-slate-200',
  };
  
  const labels = {
    'done': 'Done',
    'in-progress': 'In Progress',
    'planned': 'Planned',
  };

  return (
    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${styles[status]}`}>
      {labels[status]}
    </span>
  );
};

export const PriorityBadge: React.FC<{ priority: Priority }> = ({ priority }) => {
  const styles = {
    'high': 'text-rose-600',
    'medium': 'text-amber-600',
    'low': 'text-slate-400',
  };

  return (
    <span className={`text-[10px] uppercase font-heavy tracking-wider ${styles[priority]}`}>
      {priority}
    </span>
  );
};

export default Sidebar;
