import React, { useState } from 'react';
import { ScrollArea } from './ui/scroll-area';
import { AMHARIC_MONTH_NAMES } from '../utils/ethiopianCalendar';
import { Calendar, Star, Utensils, Filter, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface HolidayListProps {
  holidays: any[];
  currentYear: number;
}

export const HolidayList: React.FC<HolidayListProps> = ({ holidays, currentYear }) => {
  const [filter, setFilter] = useState<'all' | 'fast' | 'feast'>('all');
  const [search, setSearch] = useState('');

  const filteredHolidays = holidays.filter(h => 
    (filter === 'all' || h.type === filter) &&
    (h.nameEth.includes(search) || h.name.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="bg-white/90 backdrop-blur-xl rounded-[2.5rem] shadow-2xl border border-amber-100 flex flex-col h-full overflow-hidden">
      <div className="p-8 border-b border-amber-50 space-y-6 bg-amber-50/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-amber-900 p-2.5 rounded-2xl shadow-lg">
              <Calendar className="w-6 h-6 text-amber-200" />
            </div>
            <div>
              <h3 className="text-2xl font-black text-amber-900">በዓላትና አጽዋማት</h3>
              <p className="text-[10px] font-black text-amber-600 uppercase tracking-widest mt-1">Yearly Fasts & Feasts</p>
            </div>
          </div>
          <div className="bg-white px-4 py-2 rounded-2xl border border-amber-100 shadow-sm">
            <span className="text-sm font-black text-amber-900">
              {currentYear} <span className="text-[10px] text-amber-600 uppercase">ዓ.ም</span>
            </span>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-400 transition-colors group-focus-within:text-amber-600" />
            <input 
              type="text"
              placeholder="በዓላትን ፈልግ... (Search holidays)"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white border border-amber-100 rounded-2xl py-3 pl-11 pr-4 text-sm font-medium outline-none focus:ring-4 focus:ring-amber-500/5 focus:border-amber-400 transition-all shadow-sm"
            />
          </div>
          
          <div className="flex gap-2 p-1.5 bg-white rounded-2xl border border-amber-100 shadow-sm">
            {(['all', 'fast', 'feast'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setFilter(t)}
                className={`px-5 py-2 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${
                  filter === t 
                  ? 'bg-amber-900 text-white shadow-lg' 
                  : 'text-amber-700/60 hover:text-amber-900 hover:bg-amber-50'
                }`}
              >
                {t === 'all' ? 'ሁሉም' : t === 'fast' ? 'አጽዋማት' : 'በዓላት'}
              </button>
            ))}
          </div>
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-8 space-y-4">
          <AnimatePresence mode="popLayout">
            {filteredHolidays.map((holiday, idx) => (
              <motion.div 
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                key={`${holiday.name}-${idx}`} 
                className="group flex items-center gap-5 p-5 rounded-[1.5rem] border border-amber-50 bg-white/50 hover:bg-white hover:border-amber-200 hover:shadow-xl hover:shadow-amber-900/5 transition-all cursor-default"
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110 group-hover:rotate-3 ${
                  holiday.type === 'fast' 
                    ? 'bg-red-50 text-red-600 border border-red-100' 
                    : 'bg-green-50 text-green-600 border border-green-100'
                }`}>
                  {holiday.type === 'fast' ? <Utensils className="w-6 h-6" /> : <Star className="w-6 h-6" />}
                </div>
                
                <div className="flex-1 min-w-0">
                  <h4 className="font-black text-amber-900 text-lg leading-tight">{holiday.nameEth}</h4>
                  <p className="text-[10px] font-black text-amber-600/50 uppercase tracking-widest mt-1">{holiday.name}</p>
                </div>

                <div className="text-right shrink-0">
                  <div className="bg-amber-50 px-4 py-2 rounded-xl border border-amber-100 group-hover:bg-amber-900 group-hover:border-amber-900 transition-all">
                    <p className="text-2xl font-black text-amber-900 leading-none group-hover:text-white transition-colors">{holiday.day}</p>
                    <p className="text-[9px] font-black text-amber-700 uppercase mt-1 group-hover:text-amber-200 transition-colors">{AMHARIC_MONTH_NAMES[holiday.month-1]}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {filteredHolidays.length === 0 && (
            <div className="py-20 text-center">
              <div className="w-20 h-20 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Filter className="w-8 h-8 text-amber-200" />
              </div>
              <p className="text-amber-800 font-black">ምንም ውጤት አልተገኘም (No results found)</p>
              <p className="text-[10px] text-amber-600 uppercase tracking-widest mt-2">Try adjusting your filters or search term</p>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};
