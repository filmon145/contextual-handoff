import React, { useState, useEffect, useMemo } from 'react';
import { 
  fromGregorian, 
  getBahireHassab, 
  AMHARIC_MONTH_NAMES,
  AMHARIC_WEEKDAYS
} from './utils/ethiopianCalendar';
import { CalendarView } from './components/CalendarView';
import { HolidayList } from './components/HolidayList';
import { DateConverter } from './components/DateConverter';
import { Toaster, toast } from 'sonner';
import { 
  History, 
  Calendar as CalendarIcon, 
  Info,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  X,
  LayoutDashboard,
  ArrowRightLeft,
  RefreshCw,
  Github
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const App: React.FC = () => {
  const [currentEthDate, setCurrentEthDate] = useState(() => fromGregorian(new Date()));
  const [viewYear, setViewYear] = useState(currentEthDate.year);
  const [viewMonth, setViewMonth] = useState(currentEthDate.month);
  const [activeTab, setActiveTab] = useState<'calendar' | 'holidays' | 'converter'>('calendar');
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  const holidays = useMemo(() => getBahireHassab(viewYear), [viewYear]);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = fromGregorian(new Date());
      if (now.day !== currentEthDate.day) {
        setCurrentEthDate(now);
      }
    }, 60000);
    return () => clearInterval(timer);
  }, [currentEthDate]);

  const goToToday = () => {
    const today = fromGregorian(new Date());
    setViewYear(today.year);
    setViewMonth(today.month);
    setCurrentEthDate(today);
    toast.success('ተመልሰናል ወደ ዛሬው ቀን!');
  };

  return (
    <div className="min-h-screen bg-fixed bg-cover bg-center font-sans selection:bg-amber-200 selection:text-amber-900" style={{ 
      backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.85), rgba(255, 248, 240, 0.95)), url('https://storage.googleapis.com/dala-prod-public-storage/generated-images/3b8530e0-a143-45b5-845f-a9377213e03b/app-background-a91702d7-1773953748041.webp')` 
    }}>
      <Toaster position="top-center" richColors />
      
      {/* Premium Navigation Header */}
      <header className="bg-white/70 backdrop-blur-xl border-b border-amber-100 sticky top-0 z-[60] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-amber-900 p-2 rounded-xl shadow-lg rotate-3 group-hover:rotate-0 transition-transform">
              <img 
                src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/3b8530e0-a143-45b5-845f-a9377213e03b/app-logo-55dba870-1773953746877.webp" 
                alt="Logo" 
                className="w-8 h-8 object-contain filter brightness-110"
              />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-black text-amber-900 tracking-tight leading-none">ባሕረ ሐሳብ</h1>
              <p className="text-[9px] text-amber-600 font-bold uppercase tracking-[0.2em] mt-1">Bahre Hassab Kemer</p>
            </div>
          </div>
          
          <nav className="flex items-center bg-amber-50 p-1 rounded-2xl border border-amber-100 shadow-inner">
            <button 
              onClick={() => setActiveTab('calendar')}
              className={`px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 transition-all ${
                activeTab === 'calendar' ? 'bg-white text-amber-900 shadow-md ring-1 ring-amber-100' : 'text-amber-700/60 hover:text-amber-800'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span className="hidden md:inline">ቀን መቁጠሪያ</span>
            </button>
            <button 
              onClick={() => setActiveTab('holidays')}
              className={`px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 transition-all ${
                activeTab === 'holidays' ? 'bg-white text-amber-900 shadow-md ring-1 ring-amber-100' : 'text-amber-700/60 hover:text-amber-800'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span className="hidden md:inline">በዓላትና አጽዋማት</span>
            </button>
            <button 
              onClick={() => setActiveTab('converter')}
              className={`px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 transition-all ${
                activeTab === 'converter' ? 'bg-white text-amber-900 shadow-md ring-1 ring-amber-100' : 'text-amber-700/60 hover:text-amber-800'
              }`}
            >
              <ArrowRightLeft className="w-4 h-4" />
              <span className="hidden md:inline">ቀን መለወጫ</span>
            </button>
          </nav>

          <div className="flex items-center gap-2">
            <button 
              onClick={goToToday}
              className="p-2.5 text-amber-900 hover:bg-amber-50 rounded-xl transition-colors border border-transparent hover:border-amber-100"
              title="ወደ ዛሬ ተመለስ"
            >
              <History className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setIsAboutOpen(true)}
              className="p-2.5 text-amber-900 hover:bg-amber-50 rounded-xl transition-colors border border-transparent hover:border-amber-100"
              title="ስለ መተግበሪያው"
            >
              <Info className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-4 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Dashboard Left Sidebar */}
          <aside className="lg:col-span-3 space-y-6">
            <div className="bg-white/80 backdrop-blur-md p-6 rounded-3xl shadow-xl border border-amber-100 overflow-hidden relative group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full -mr-8 -mt-8" />
              <label className="text-[10px] font-black text-amber-800 uppercase tracking-widest block mb-4">የዓመተ ምሕረት ምርጫ</label>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setViewYear(y => y - 1)}
                  className="p-3 bg-amber-50 hover:bg-amber-100 text-amber-900 rounded-2xl transition-all border border-amber-200"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <input 
                  type="number" 
                  value={viewYear} 
                  onChange={(e) => setViewYear(parseInt(e.target.value) || viewYear)}
                  className="w-full bg-amber-50 border-2 border-amber-200 rounded-2xl p-3 text-2xl font-black text-amber-900 focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 outline-none text-center transition-all"
                />
                <button 
                  onClick={() => setViewYear(y => y + 1)}
                  className="p-3 bg-amber-50 hover:bg-amber-100 text-amber-900 rounded-2xl transition-all border border-amber-200"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
              <div className="mt-4 p-3 bg-amber-50/50 rounded-xl border border-amber-100">
                <p className="text-[11px] text-amber-800 leading-relaxed font-medium">
                  የ <span className="text-amber-900 font-black">{viewYear}</span> ዓ.ም የበዓላትና አጽዋማት ማውጫ።
                </p>
              </div>
            </div>

            <div className="bg-amber-900 text-amber-50 p-6 rounded-3xl shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />
              <h3 className="text-[10px] font-black uppercase tracking-widest text-amber-200 mb-4 flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-pulse" />
                ዛሬ (Today)
              </h3>
              <div className="space-y-1">
                <p className="text-3xl font-black">{currentEthDate.day}</p>
                <p className="text-lg font-bold text-amber-200">{AMHARIC_MONTH_NAMES[currentEthDate.month - 1]}</p>
                <p className="text-sm font-medium opacity-80">{currentEthDate.year} ዓ.ም</p>
              </div>
              <div className="mt-6 pt-4 border-t border-white/10 text-[11px] font-medium opacity-70">
                {AMHARIC_WEEKDAYS[new Date().getDay()]} (ዕለተ {AMHARIC_WEEKDAYS[new Date().getDay()]})
              </div>
            </div>
          </aside>

          {/* Main Dynamic Area */}
          <section className="lg:col-span-9">
            <AnimatePresence mode="wait">
              {activeTab === 'calendar' && (
                <motion.div
                  key="calendar"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="space-y-8"
                >
                  <CalendarView 
                    year={viewYear} 
                    month={viewMonth} 
                    onMonthChange={setViewMonth}
                    onYearChange={setViewYear}
                    holidays={holidays}
                    currentDate={currentEthDate}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {holidays.filter(h => h.month === viewMonth).map((h, i) => (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        key={i} 
                        className="bg-white/80 backdrop-blur-sm p-5 rounded-2xl border border-amber-100 flex items-center justify-between shadow-sm hover:shadow-md transition-shadow group"
                      >
                        <div className="flex items-center gap-4">
                          <div className={`w-1 h-10 rounded-full ${h.type === 'fast' ? 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.4)]' : 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.4)]'}`} />
                          <div>
                            <p className="font-black text-amber-900 text-lg group-hover:translate-x-1 transition-transform">{h.nameEth}</p>
                            <p className="text-[10px] text-amber-600/60 font-black uppercase tracking-widest">{h.name}</p>
                          </div>
                        </div>
                        <div className="bg-amber-50 px-4 py-2 rounded-xl text-right border border-amber-100 group-hover:bg-amber-100 transition-colors">
                          <p className="text-2xl font-black text-amber-900 leading-none">{h.day}</p>
                          <p className="text-[9px] text-amber-700 font-black uppercase mt-1">{AMHARIC_MONTH_NAMES[h.month-1]}</p>
                        </div>
                      </motion.div>
                    ))}
                    {holidays.filter(h => h.month === viewMonth).length === 0 && (
                      <div className="col-span-full py-16 text-center bg-white/40 rounded-3xl border-2 border-dashed border-amber-200">
                        <CalendarIcon className="w-12 h-12 text-amber-200 mx-auto mb-4" />
                        <p className="text-amber-600 font-bold italic">በዚህ ወር ውስጥ የታወቁ በዓላት የሉም።</p>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {activeTab === 'holidays' && (
                <motion.div
                  key="holidays"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="h-[calc(100vh-220px)]"
                >
                  <HolidayList holidays={holidays} currentYear={viewYear} />
                </motion.div>
              )}

              {activeTab === 'converter' && (
                <motion.div
                  key="converter"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="max-w-xl mx-auto"
                >
                  <DateConverter />
                </motion.div>
              )}
            </AnimatePresence>
          </section>
        </div>
      </main>

      <footer className="mt-20 py-12 bg-stone-900 text-stone-400 border-t border-stone-800">
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">
          <div className="bg-stone-800 p-3 rounded-2xl mb-6">
            <img 
              src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/3b8530e0-a143-45b5-845f-a9377213e03b/app-logo-55dba870-1773953746877.webp" 
              className="w-8 h-8 opacity-50 filter grayscale"
              alt="Footer Logo"
            />
          </div>
          <p className="text-sm font-black text-stone-200 tracking-wider mb-2">ባሕረ ሐሳብ © {currentEthDate.year}</p>
          <p className="text-xs opacity-50 mb-8 max-w-md text-center">በኢትዮጵያ ኦርቶዶክስ ተዋሕዶ ቤተ ክርስቲያን ቀኖና እና ትውፊት መሠረት የተዘጋጀ የቀን መቁጠሪያ።</p>
          
          <div className="flex gap-8 text-[11px] font-bold uppercase tracking-widest">
            <button onClick={() => setIsAboutOpen(true)} className="hover:text-amber-500 transition-colors">ስለ መተግበሪያው</button>
            <button onClick={() => setIsAboutOpen(true)} className="hover:text-amber-500 transition-colors">መረጃ (Help)</button>
            <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-amber-500 transition-colors">GitHub</a>
          </div>
        </div>
      </footer>

      {/* About Modal */}
      <AnimatePresence>
        {isAboutOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAboutOpen(false)}
              className="absolute inset-0 bg-stone-950/80 backdrop-blur-md"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-2xl overflow-hidden relative z-10 border border-amber-100"
            >
              <div className="bg-amber-900 p-8 text-white flex items-center justify-between relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16" />
                <div>
                  <h2 className="text-3xl font-black tracking-tight">ባሕረ ሐሳብ</h2>
                  <p className="text-amber-300/80 text-[10px] font-black uppercase tracking-widest mt-1">ስለ መተግበሪያው (About)</p>
                </div>
                <button 
                  onClick={() => setIsAboutOpen(false)}
                  className="p-3 bg-white/10 hover:bg-white/20 rounded-2xl transition-all border border-white/10 group"
                >
                  <X className="w-6 h-6 group-hover:rotate-90 transition-transform" />
                </button>
              </div>
              <div className="p-10 space-y-8 max-h-[65vh] overflow-y-auto custom-scrollbar">
                <section>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
                      <CalendarIcon className="w-4 h-4 text-amber-900" />
                    </div>
                    <h3 className="text-xl font-black text-amber-900">ባሕረ ሐሳብ ምንድን ነው?</h3>
                  </div>
                  <p className="text-gray-600 leading-loose text-sm font-medium">
                    ባሕረ ሐሳብ ማለት የባሕር (የጊዜ) ስሌት ወይም ሂሳብ ማለት ነው። ይህ ቀመር በኢትዮጵያ ኦርቶዶክስ ተዋሕዶ ቤተ ክርስቲያን ለዘመናት ሲሠራበት የቆየና የሚንቀሳቀሱ በዓላትንና አጽዋማትን (አቢይ ጾም፣ ትንሣኤ፣ ዕርገት፣ ወዘተ) በትክክል ለማውጣት የሚያገለግል ድንቅ የጥበብ ውጤት ነው።
                  </p>
                </section>
                
                <section>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
                      <Github className="w-4 h-4 text-amber-900" />
                    </div>
                    <h3 className="text-xl font-black text-amber-900">GitHub አቀማመጥ (GitHub Readiness)</h3>
                  </div>
                  <div className="bg-amber-50/50 p-6 rounded-2xl border border-amber-100 space-y-4">
                    <p className="text-gray-600 text-sm font-medium leading-relaxed">
                      ይህ መተግበሪያ ለ GitHub ዝግጁ ሆኖ የተዘጋጀ ነው። የእርስዎን ኮድ ወደ GitHub ለመጫን የሚከተሉትን ደረጃዎች ይከተሉ፡
                    </p>
                    <ul className="space-y-3">
                      <li className="flex gap-3 text-xs font-bold text-amber-900">
                        <span className="w-5 h-5 bg-amber-900 text-white rounded-full flex items-center justify-center shrink-0">1</span>
                        <span>GitHub ላይ አዲስ 'Repository' ይክፈቱ።</span>
                      </li>
                      <li className="flex gap-3 text-xs font-bold text-amber-900">
                        <span className="w-5 h-5 bg-amber-900 text-white rounded-full flex items-center justify-center shrink-0">2</span>
                        <span>በመተግበሪያው ውስጥ ያለውን 'Sync to GitHub' ቁልፍ በመጫን ኮዱን ያገናኙ።</span>
                      </li>
                      <li className="flex gap-3 text-xs font-bold text-amber-900">
                        <span className="w-5 h-5 bg-amber-900 text-white rounded-full flex items-center justify-center shrink-0">3</span>
                        <span>README.md ፋይሉ ሁሉንም አስፈላጊ መመሪያዎች ይዟል።</span>
                      </li>
                    </ul>
                  </div>
                </section>
                
                <section>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
                      <RefreshCw className="w-4 h-4 text-amber-900" />
                    </div>
                    <h3 className="text-xl font-black text-amber-900">አሠራሩና ስሌቱ</h3>
                  </div>
                  <p className="text-gray-600 leading-loose text-sm font-medium">
                    ይህ መተግበሪያ የባሕረ ሐሳብ ቀመርን (ወንበር፣ መጥቅዕ፣ አበቅቴና ቶሳክን) መሠረት በማድረግ ማንኛውንም የዓመተ ምሕረት ዓመት በማስገባት በዚያ ዓመት የሚውሉ በዓላትንና አጽዋማትን በሰከንዶች ውስጥ ያወጣል። የቀን መለወጫውም በኢትዮጵያና በጎርጎርዮሳውያን አቆጣጠር መካከል ያለውን የ7 እና 8 ዓመታት ልዩነት ጠብቆ ይሠራል።
                  </p>
                </section>

                <div className="bg-amber-50 p-6 rounded-[2rem] border border-amber-100 flex items-start gap-4">
                  <div className="bg-amber-900/10 p-2 rounded-lg">
                    <Info className="w-5 h-5 text-amber-900" />
                  </div>
                  <p className="text-xs text-amber-900/70 font-bold leading-relaxed italic">
                    ይህ መተግበሪያ የኢትዮጵያን ጥንታዊ የዘመን አቆጣጠር ጥበብ ለዘመኑ ትውልድ በቀላሉ እንዲደርስ ለማድረግ የታለመ ነው።
                  </p>
                </div>
              </div>
              <div className="p-8 border-t border-amber-50 flex justify-end bg-amber-50/30">
                <button 
                  onClick={() => setIsAboutOpen(false)}
                  className="bg-amber-900 text-white px-8 py-3 rounded-2xl font-black text-sm hover:bg-amber-800 shadow-xl shadow-amber-900/20 active:scale-95 transition-all"
                >
                  ተረድቻለሁ (Close)
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
