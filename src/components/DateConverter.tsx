import React, { useState, useEffect } from 'react';
import { 
  fromGregorian, 
  toGregorian, 
  AMHARIC_MONTH_NAMES, 
  MONTH_NAMES,
  EthiopianDate 
} from '../utils/ethiopianCalendar';
import { Calendar, RefreshCw, ArrowRightLeft } from 'lucide-react';

export const DateConverter: React.FC = () => {
  const [mode, setMode] = useState<'gToE' | 'eToG'>('gToE');
  const [gDate, setGDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [eDate, setEDate] = useState<{year: number, month: number, day: number}>(() => {
    const now = fromGregorian(new Date());
    return { year: now.year, month: now.month, day: now.day };
  });

  const [result, setResult] = useState<string>('');

  useEffect(() => {
    handleConvert();
  }, [gDate, eDate, mode]);

  const handleConvert = () => {
    if (mode === 'gToE') {
      const parts = gDate.split('-').map(Number);
      if (parts.length === 3) {
        const date = new Date(parts[0], parts[1] - 1, parts[2]);
        const eth = fromGregorian(date);
        setResult(`${AMHARIC_MONTH_NAMES[eth.month - 1]} ${eth.day}, ${eth.year}`);
      }
    } else {
      const greg = toGregorian(eDate.year, eDate.month, eDate.day);
      setResult(greg.toLocaleDateString('en-GB', { 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric' 
      }));
    }
  };

  const toggleMode = () => setMode(prev => prev === 'gToE' ? 'eToG' : 'gToE');

  return (
    <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl border border-amber-100 overflow-hidden h-full flex flex-col">
      <div className="bg-amber-800 p-4 text-white flex items-center justify-between">
        <h3 className="font-bold flex items-center gap-2">
          <ArrowRightLeft className="w-5 h-5" />
          ቀን መለወጫ (Date Converter)
        </h3>
        <button 
          onClick={toggleMode}
          className="p-2 hover:bg-amber-700 rounded-lg transition-colors flex items-center gap-2 text-xs font-bold"
        >
          <RefreshCw className="w-4 h-4" />
          ቀይር
        </button>
      </div>

      <div className="p-6 space-y-6 flex-1">
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs font-black text-amber-800 uppercase tracking-widest">
            <span>{mode === 'gToE' ? 'Gregorian (GC)' : 'Ethiopian (EC)'}</span>
            <ArrowRightLeft className="w-4 h-4 opacity-30" />
            <span>{mode === 'gToE' ? 'Ethiopian (EC)' : 'Gregorian (GC)'}</span>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {mode === 'gToE' ? (
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-500 uppercase">Select Gregorian Date</label>
                <input 
                  type="date" 
                  value={gDate}
                  onChange={(e) => setGDate(e.target.value)}
                  className="w-full bg-amber-50 border-amber-200 rounded-xl p-3 text-lg font-bold text-amber-900 outline-none focus:ring-2 focus:ring-amber-500 transition-all"
                />
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-2">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-500 uppercase text-center block">Day</label>
                  <input 
                    type="number" 
                    value={eDate.day}
                    min={1} max={30}
                    onChange={(e) => setEDate({...eDate, day: parseInt(e.target.value) || 1})}
                    className="w-full bg-amber-50 border-amber-200 rounded-xl p-3 text-lg font-bold text-amber-900 text-center outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-500 uppercase text-center block">Month</label>
                  <select 
                    value={eDate.month}
                    onChange={(e) => setEDate({...eDate, month: parseInt(e.target.value)})}
                    className="w-full bg-amber-50 border-amber-200 rounded-xl p-3 text-lg font-bold text-amber-900 text-center outline-none focus:ring-2 focus:ring-amber-500 appearance-none"
                  >
                    {AMHARIC_MONTH_NAMES.map((name, i) => (
                      <option key={i} value={i + 1}>{name}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-500 uppercase text-center block">Year</label>
                  <input 
                    type="number" 
                    value={eDate.year}
                    onChange={(e) => setEDate({...eDate, year: parseInt(e.target.value) || 2017})}
                    className="w-full bg-amber-50 border-amber-200 rounded-xl p-3 text-lg font-bold text-amber-900 text-center outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="bg-amber-50 border-2 border-dashed border-amber-200 rounded-2xl p-6 text-center space-y-2">
          <p className="text-[10px] font-black text-amber-700 uppercase tracking-tighter">የተገኘ ውጤት (Result)</p>
          <p className="text-2xl font-black text-amber-900">{result}</p>
        </div>
      </div>

      <div className="p-4 bg-amber-100/50 text-[10px] text-amber-800 leading-tight">
        * የኢትዮጵያ ቀን አቆጣጠር ከጎርጎርዮሳውያን አቆጣጠር በ7 ወይም በ8 ዓመታት ይለያያል።
      </div>
    </div>
  );
};
