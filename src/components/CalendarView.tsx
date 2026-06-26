import React from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { 
  MONTH_NAMES, 
  AMHARIC_MONTH_NAMES, 
  AMHARIC_WEEKDAYS, 
  getDaysInMonth, 
  toGregorian, 
  EthiopianDate
} from '../utils/ethiopianCalendar';
import { cn } from '../lib/utils';
import { motion } from 'framer-motion';

interface CalendarProps {
  year: number;
  month: number;
  onMonthChange: (month: number) => void;
  onYearChange: (year: number) => void;
  holidays: any[];
  currentDate: EthiopianDate;
}

export const CalendarView: React.FC<CalendarProps> = ({ 
  year, 
  month, 
  onMonthChange, 
  onYearChange, 
  holidays,
  currentDate
}) => {
  const daysInMonth = getDaysInMonth(month, year);
  const firstDayGreg = toGregorian(year, month, 1);
  const startDayOfWeek = firstDayGreg.getDay();

  const nextMonth = () => {
    if (month === 13) {
      onMonthChange(1);
      onYearChange(year + 1);
    } else {
      onMonthChange(month + 1);
    }
  };

  const prevMonth = () => {
    if (month === 1) {
      onMonthChange(13);
      onYearChange(year - 1);
    } else {
      onMonthChange(month - 1);
    }
  };

  const monthHolidays = holidays.filter(h => h.month === month);

  return (
    <div className="bg-white/90 backdrop-blur-xl rounded-[2.5rem] shadow-2xl overflow-hidden border border-amber-100 ring-1 ring-amber-900/5">
      {/* Calendar Header */}
      <div className="bg-amber-900 p-6 text-white flex items-center justify-between relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/papyros.png')]" />
        <div className="flex items-center gap-4 relative z-10">
          <div className="bg-white/10 p-2.5 rounded-2xl border border-white/10">
            <CalendarIcon className="w-6 h-6 text-amber-200" />
          </div>
          <div>
            <h2 className="text-2xl font-black leading-tight flex items-baseline gap-2">
              {AMHARIC_MONTH_NAMES[month - 1]} 
              <span className="text-amber-300/60 font-medium text-sm tracking-widest uppercase">({MONTH_NAMES[month - 1]})</span>
            </h2>
            <p className="text-amber-200/70 text-xs font-bold tracking-widest">{year} ዓመተ ምሕረት</p>
          </div>
        </div>
        <div className="flex gap-2 relative z-10">
          <button onClick={prevMonth} className="p-3 bg-white/5 hover:bg-white/15 rounded-2xl transition-all border border-white/5 active:scale-90">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button onClick={nextMonth} className="p-3 bg-white/5 hover:bg-white/15 rounded-2xl transition-all border border-white/5 active:scale-90">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Weekday Labels */}
      <div className="grid grid-cols-7 gap-px bg-amber-100/50 p-2">
        {AMHARIC_WEEKDAYS.map(day => (
          <div key={day} className="py-4 text-center text-[10px] font-black text-amber-900/40 uppercase tracking-[0.2em]">
            {day}
          </div>
        ))}
      </div>
      
      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-px bg-amber-50">
        {Array.from({ length: startDayOfWeek }).map((_, i) => (
          <div key={`empty-${i}`} className="bg-white/40 h-24 sm:h-32" />
        ))}
        
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const isToday = currentDate.year === year && currentDate.month === month && currentDate.day === day;
          const dayHoliday = monthHolidays.find(h => h.day === day);
          
          return (
            <motion.div 
              whileHover={{ backgroundColor: "rgba(255, 251, 235, 0.8)" }}
              key={day} 
              className={cn(
                "bg-white h-24 sm:h-32 p-3 border-t border-amber-50 flex flex-col relative transition-all group",
                isToday && "bg-amber-50/80"
              )}
            >
              <div className="flex items-start justify-between">
                <span className={cn(
                  "text-lg font-black transition-colors",
                  isToday ? "text-amber-600" : "text-stone-400 group-hover:text-amber-900"
                )}>
                  {day}
                </span>
                {isToday && (
                  <div className="w-1.5 h-1.5 bg-amber-500 rounded-full" />
                )}
              </div>
              
              <div className="mt-auto space-y-1">
                {dayHoliday && (
                  <div 
                    className={cn(
                      "text-[9px] sm:text-[10px] leading-tight font-black px-2 py-1 rounded-lg border shadow-sm transition-transform hover:scale-105",
                      dayHoliday.type === 'fast' 
                        ? "bg-red-50 text-red-700 border-red-100 shadow-red-900/5" 
                        : "bg-green-50 text-green-700 border-green-100 shadow-green-900/5"
                    )}
                    title={dayHoliday.nameEth}
                  >
                    <span className="line-clamp-2">{dayHoliday.nameEth}</span>
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
