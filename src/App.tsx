import React, { useState, useEffect, ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, Mail, Car, Bike, Zap, Landmark, HelpCircle, LogIn, Menu, ShieldCheck, Leaf, TrendingUp, User as UserIcon, LogOut, X } from 'lucide-react';
import { AuthProvider, useAuth } from './components/FirebaseProvider';
import { signInWithGoogle, logout } from './lib/firebase';

const NavLink = ({ href, children }: { href: string; children: ReactNode }) => (
  <a 
    href={href} 
    className="text-sm font-medium text-slate-600 hover:text-brand-green transition-colors px-3 py-2"
  >
    {children}
  </a>
);

const VEHICLES = [
  {
    type: "SEDAN",
    name: "CYBER-S",
    desc: "Elite performance meets zero emissions. 500km range on a single ultra-charge.",
    image: "https://images.unsplash.com/photo-1614200187524-dc4b892acf16?auto=format&fit=crop&q=80&w=1000",
    stats: { range: "520KM", speed: "2.8S" }
  },
  {
    type: "MOTORBIKE",
    name: "PHANTOM-E",
    desc: "Agile, silent, and lethal efficiency. The city is your playground.",
    image: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=1000",
    stats: { range: "240KM", speed: "3.5S" }
  },
  {
    type: "COMMUTER",
    name: "GLIDE-X",
    desc: "The ultimate last-mile solution. Dual motor power in a folding carbon frame.",
    image: "https://images.unsplash.com/photo-1595085732152-668b5779fdfa?auto=format&fit=crop&q=80&w=1000",
    stats: { range: "60KM", speed: "15KM/H" }
  }
];

function AppContent() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, loading } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  const handleLogin = async () => {
    setLoginError(null);
    try {
      await signInWithGoogle();
      setShowLoginModal(false);
    } catch (err: any) {
      if (err?.code === 'auth/popup-closed-by-user') {
        setLoginError("Login window was closed. Please try again.");
      } else if (err?.code === 'auth/blocked-at-popup-request') {
        setLoginError("Popup was blocked by your browser. Please allow popups for this site.");
      } else {
        setLoginError("An unexpected error occurred. Please try again.");
      }
      console.error(err);
    }
  };

  // Reset error when modal closes
  useEffect(() => {
    if (!showLoginModal) setLoginError(null);
  }, [showLoginModal]);

  return (
    <div className="min-h-screen flex flex-col selection:bg-brand-electric selection:text-black">
      {/* Dynamic Background Effect */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-electric/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-brand-electric/10 rounded-full blur-[100px]" />
      </div>

      {/* Modern Navigation */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-5xl">
        <div className="glass-card px-6 py-4 flex justify-between items-center shadow-2xl">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-brand-electric rounded-xl flex items-center justify-center text-black rotate-3">
              <Zap size={24} fill="currentColor" />
            </div>
            <span className="text-xl font-extrabold tracking-tighter uppercase italic">
              pave<span className="text-brand-electric font-black">.</span>
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#" className="text-sm font-semibold text-white/60 hover:text-brand-electric transition-colors">Vehicles</a>
            <a href="#" className="text-sm font-semibold text-white/60 hover:text-brand-electric transition-colors">Charging</a>
            <a href="#" className="text-sm font-semibold text-white/60 hover:text-brand-electric transition-colors">Ecosystem</a>
            
            <div className="h-6 w-[1px] bg-white/10" />

            {loading ? (
              <div className="w-8 h-8 rounded-full bg-white/5 animate-pulse" />
            ) : user ? (
              <div className="flex items-center gap-3">
                <div className="flex flex-col items-end leading-none">
                  <span className="text-xs font-bold text-white uppercase tracking-wider">{user.displayName?.split(' ')[0]}</span>
                  <button onClick={logout} className="text-[9px] text-white/40 hover:text-red-400 transition-colors">SIGNOUT</button>
                </div>
                {user.photoURL ? (
                  <img src={user.photoURL} alt="" className="w-9 h-9 rounded-full border border-brand-electric p-0.5" />
                ) : (
                  <div className="w-9 h-9 rounded-full bg-brand-electric/10 flex items-center justify-center text-brand-electric">
                    <UserIcon size={18} />
                  </div>
                )}
              </div>
            ) : (
              <button 
                onClick={() => setShowLoginModal(true)}
                className="btn-electric py-2 px-5 text-sm"
              >
                JOIN THE REVOLUTION
              </button>
            )}
          </div>

          <button className="md:hidden p-2 text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <Menu size={24} />
          </button>
        </div>
      </nav>

      <main className="relative z-10 pt-32 flex-grow">
        {/* Hero Section - Magazine Style */}
        <section className="px-6 py-20 lg:py-40">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-electric/10 text-brand-electric text-[10px] font-bold tracking-[0.2em] uppercase mb-6 border border-brand-electric/20">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-electric animate-pulse" />
                Next Gen Mobility
              </div>
              <h1 className="text-6xl sm:text-8xl font-black leading-[0.85] mb-8 uppercase tracking-tighter">
                ELECTRIC <br />
                <span className="text-brand-electric italic">VIBES.</span> <br />
                PURE POWER.
              </h1>
              <p className="text-white/50 text-lg max-w-lg mb-10 font-light leading-relaxed">
                We're not just changing how you move. We're changing how you live. Join thousands transitioning to sustainable electric mobility across Pakistan.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <button className="btn-electric px-10 py-5">
                  RESERVE YOUR DRIVE
                </button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative aspect-square lg:aspect-video rounded-[3rem] overflow-hidden group"
            >
              <img 
                src="https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&q=80&w=2070" 
                alt="Electric Car" 
                className="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-transparent" />
              <div className="absolute bottom-8 left-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20">
                    <Zap size={20} className="text-brand-electric" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-white/50 uppercase tracking-widest">Model X-E</p>
                    <p className="text-sm font-bold">READY TO DEPLOY</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Stats / Features - Technical Pattern */}
        <section className="py-32 border-t border-white/5 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: "EMISSIONS", value: "0.00%", sub: "Net zero goal" },
                { label: "SAVINGS", value: "85%", sub: "Avg fuel reduction" },
                { label: "CHARGERS", value: "2.4k+", sub: "Nationwide grid" },
                { label: "TRANSITIONED", value: "12k+", sub: "New EV owners" }
              ].map((s, i) => (
                <div key={i} className="glass-card p-8 border-white/[0.03] group hover:border-brand-electric/30 transition-colors">
                  <p className="text-[10px] font-bold text-brand-electric tracking-[0.3em] mb-4 uppercase">{s.label}</p>
                  <p className="text-5xl font-black mb-2 tracking-tighter">{s.value}</p>
                  <p className="text-white/40 text-xs">{s.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Core Features: The Fleet */}
        <section className="py-32 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
              <div className="max-w-xl">
                <div className="flex items-center gap-2 text-brand-electric font-bold text-[10px] tracking-[0.3em] uppercase mb-4">
                   <div className="w-10 h-[1px] bg-brand-electric" /> Product Lineup
                </div>
                <h2 className="text-5xl font-black uppercase tracking-tighter leading-none">
                  THE <span className="text-brand-electric">PAVE</span> CORE LINEUP.
                </h2>
              </div>
              <div className="text-white/40 text-sm font-medium tracking-widest uppercase flex items-center gap-4">
                01 / 03 Categories <TrendingUp size={16} />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {VEHICLES.map((v, i) => (
                <motion.div 
                  key={v.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="glass-card group overflow-hidden border-white/[0.03] hover:border-brand-electric/30 transition-all duration-500"
                >
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={v.image} 
                      alt={v.name} 
                      className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-surface to-transparent" />
                    <div className="absolute top-6 right-6">
                      <div className="px-3 py-1 bg-black/50 backdrop-blur-md rounded-full border border-white/10 text-[10px] font-bold tracking-widest text-white/50">
                        {v.type}
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-8">
                    <h3 className="text-2xl font-black mb-3 tracking-tight group-hover:text-brand-electric transition-colors">{v.name}</h3>
                    <p className="text-white/40 text-sm leading-relaxed mb-8">
                      {v.desc}
                    </p>
                    
                    <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/[0.05]">
                      <div>
                        <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest mb-1">Max Range</p>
                        <p className="text-xl font-black text-brand-electric">{v.stats.range}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest mb-1">0-100 KM/H</p>
                        <p className="text-xl font-black">{v.stats.speed}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Bento Grid Features */}
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 glass-card h-[400px] relative overflow-hidden group">
              <img src="https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&q=80&w=2070" className="absolute inset-0 w-full h-full object-cover opacity-20 transition-transform duration-1000 group-hover:scale-110" alt="" />
              <div className="absolute inset-0 bg-gradient-to-r from-brand-surface to-transparent" />
              <div className="relative z-10 p-12 h-full flex flex-col justify-end">
                <h3 className="text-4xl font-black mb-4">THE CHARGING <br/> <span className="text-brand-electric">ECOSYSTEM.</span></h3>
                <p className="text-white/50 max-w-sm mb-6">Access our ultra-fast charging network integrated with the PAVE smart mobile application.</p>
                <button className="flex items-center gap-2 text-brand-electric font-bold text-sm uppercase tracking-widest hover:gap-4 transition-all">
                  Explrore Maps <TrendingUp size={16} />
                </button>
              </div>
            </div>
            <div className="glass-card h-[400px] p-12 flex flex-col justify-between border-brand-electric/10">
              <div className="w-16 h-16 bg-brand-electric rounded-3xl flex items-center justify-center text-black">
                <ShieldCheck size={32} />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-4">SMART FINANCE.</h3>
                <p className="text-white/50 text-sm leading-relaxed">Lease your dream electric vehicle with 0% markup programs designed for everyone.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Minimal Footer */}
      <footer className="py-20 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
          <div>
            <div className="flex items-center gap-2 mb-6 pointer-events-none">
              <div className="w-8 h-8 bg-brand-electric rounded-lg flex items-center justify-center text-black">
                <Zap size={18} fill="currentColor" />
              </div>
              <span className="text-lg font-black tracking-tighter uppercase italic">
                pave<span className="text-brand-electric">.</span>
              </span>
            </div>
            <p className="text-white/30 text-sm max-w-[200px]">Accelerating the future of mobility in Pakistan.</p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-12 sm:gap-24">
            <div>
              <p className="text-[10px] font-bold text-white/20 tracking-[0.2em] mb-6 uppercase">Legal</p>
              <ul className="space-y-4 text-xs font-semibold text-white/50">
                <li><a href="#" className="hover:text-brand-electric transition-colors uppercase">Privacy</a></li>
                <li><a href="#" className="hover:text-brand-electric transition-colors uppercase">Terms</a></li>
              </ul>
            </div>
            <div>
              <p className="text-[10px] font-bold text-white/20 tracking-[0.2em] mb-6 uppercase">Connect</p>
              <ul className="space-y-4 text-xs font-semibold text-white/50">
                <li><a href="#" className="hover:text-brand-electric transition-colors uppercase">Twitter</a></li>
                <li><a href="#" className="hover:text-brand-electric transition-colors uppercase">Support</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/[0.02] flex justify-between items-center text-[10px] font-bold text-white/20 tracking-widest uppercase">
          <p>© 2026 PAVE OPERATIONS</p>
          <div className="flex gap-4">
            <span>VERSION 4.1.0</span>
            <span className="text-brand-electric">ACTIVE_STATE</span>
          </div>
        </div>
      </footer>

      {/* Modern Login Modal */}
      <AnimatePresence>
        {showLoginModal && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center px-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowLoginModal(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, rotateX: 20 }}
              animate={{ scale: 1, opacity: 1, rotateX: 0 }}
              exit={{ scale: 0.9, opacity: 0, rotateX: 20 }}
              className="relative glass-card w-full max-w-sm p-10 shadow-[0_0_50px_rgba(204,255,0,0.1)] overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-brand-electric animate-pulse" />
              
              <div className="text-center mb-10">
                <div className="w-16 h-16 bg-brand-electric rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(204,255,0,0.4)]">
                  <Zap size={32} fill="currentColor" className="text-black" />
                </div>
                <h3 className="text-2xl font-black uppercase tracking-tighter italic">AUTHENTICATION<span className="text-brand-electric">.</span></h3>
                <p className="text-white/40 text-xs mt-3 uppercase tracking-widest font-bold">Secure Access Required</p>
              </div>

              {loginError && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-[10px] font-bold uppercase tracking-wider text-center"
                >
                  {loginError}
                </motion.div>
              )}

              <button 
                onClick={handleLogin}
                className="w-full flex items-center justify-center gap-3 bg-white text-black p-4 rounded-2xl font-extrabold hover:scale-[1.02] active:scale-95 transition-all text-xs tracking-widest uppercase shadow-xl"
              >
                <img src="https://www.google.com/favicon.ico" className="w-4 h-4" alt="" />
                CONTINUE WITH GOOGLE
              </button>

              <button 
                onClick={() => setShowLoginModal(false)}
                className="w-full mt-4 p-4 text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] hover:text-white transition-colors"
              >
                ABORT_MISSION
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
