export interface EthiopianDate {
  year: number;
  month: number;
  day: number;
}

export const MONTH_NAMES = [
  "Meskerem", "Tikimt", "Hidar", "Tahsas", "Tir", "Yekatit",
  "Megabit", "Miazia", "Ginbot", "Sene", "Hamle", "Nehasse", "Pagume"
];

export const AMHARIC_MONTH_NAMES = [
  "መስከረም", "ጥቅምት", "ኅዳር", "ታኅሣሥ", "ጥር", "የካቲት",
  "መጋቢት", "ሚያዝያ", "ግንቦት", "ሰኔ", "ሐምሌ", "ነሐሴ", "ጳጉሜ"
];

export const WEEKDAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
export const AMHARIC_WEEKDAYS = ["እሁድ", "ሰኞ", "ማክሰኞ", "ረቡዕ", "ሐሙስ", "ዓርብ", "ቅዳሜ"];

export function isLeapYear(year: number): boolean {
  return (year + 1) % 4 === 0;
}

export function getDaysInMonth(month: number, year: number): number {
  if (month < 13) return 30;
  return isLeapYear(year) ? 6 : 5;
}

const ET_EPOCH = 1724221;

export function toGregorian(year: number, month: number, day: number): Date {
  const prevYears = year - 1;
  const jdn = ET_EPOCH + prevYears * 365 + Math.floor(year / 4) + (month - 1) * 30 + day - 1;
  return jdnToGregorian(jdn + 0.5);
}

function jdnToGregorian(jdn: number): Date {
  const z = Math.floor(jdn + 0.5);
  const a = z;
  const b = a + 1524;
  const c = Math.floor((b - 122.1) / 365.25);
  const d = Math.floor(365.25 * c);
  const e = Math.floor((b - d) / 30.6001);
  const day = b - d - Math.floor(30.6001 * e);
  const month = e < 14 ? e - 1 : e - 13;
  const year = month > 2 ? c - 4716 : c - 4715;
  return new Date(year, month - 1, day);
}

export function fromGregorian(date: Date): EthiopianDate {
  const jdn = gregorianToJDN(date.getFullYear(), date.getMonth() + 1, date.getDate());
  return jdnToEthiopian(jdn);
}

function gregorianToJDN(year: number, month: number, day: number): number {
  if (month <= 2) {
    year -= 1;
    month += 12;
  }
  const a = Math.floor(year / 100);
  const b = year > 1582 || (year === 1582 && (month > 10 || (month === 10 && day >= 15))) 
    ? 2 - a + Math.floor(a / 4) 
    : 0;
  return Math.floor(365.25 * (year + 4716)) + Math.floor(30.6001 * (month + 1)) + day + b - 1524;
}

function jdnToEthiopian(jdn: number): EthiopianDate {
  const n = Math.floor(jdn) - ET_EPOCH;
  const year = Math.floor((4 * n + 3) / 1461);
  const dayOfYear = n - Math.floor(365 * year + year / 4);
  const month = Math.floor(dayOfYear / 30) + 1;
  const day = (dayOfYear % 30) + 1;
  return { year: year + 1, month, day };
}

export interface Holiday {
  name: string;
  nameEth: string;
  month: number;
  day: number;
  type: 'fast' | 'feast';
}

export function getBahireHassab(year: number): Holiday[] {
  const ameteAlem = year + 5500;
  const wenber = (ameteAlem % 19) - 1 < 0 ? 18 : (ameteAlem % 19) - 1;
  const metke = (wenber * 19) % 30;
  
  let metkeMonth = metke > 14 ? 1 : 2; // Meskerem (1) or Tikimt (2)
  let metkeDay = metke === 0 ? 30 : metke;

  // Find day of week for Metke
  const firstDayGreg = toGregorian(year, 1, 1);
  const amde = (firstDayGreg.getDay() + 5) % 7; // Map 0-6 Sun-Sat to 0-6 Tue-Mon
  
  const daysFromMesk1 = (metkeMonth === 1 ? metkeDay - 1 : 30 + metkeDay - 1);
  const metkeDayOfWeekTraditional = (amde + daysFromMesk1) % 7;
  
  const tewsakMapTraditional: Record<number, number> = {
    6: 6, // Mon
    0: 5, // Tue
    1: 4, // Wed
    2: 3, // Thu
    3: 2, // Fri
    4: 8, // Sat
    5: 7  // Sun
  };
  
  const tewsak = tewsakMapTraditional[metkeDayOfWeekTraditional];
  
  let neneweMonth = metkeMonth === 1 ? 5 : 6; // Tir if metke in Meskerem, else Yekatit
  let neneweDay = metkeDay + tewsak;
  if (neneweDay > 30) {
    neneweDay -= 30;
    neneweMonth += 1;
  }

  const holidays: Holiday[] = [
    { name: "Fast of Nineveh", nameEth: "ጾመ ነነዌ", month: neneweMonth, day: neneweDay, type: "fast" },
    { name: "Great Fast", nameEth: "ዐቢይ ጾም", ...addDays(neneweMonth, neneweDay, 14, year), type: "fast" },
    { name: "Mount of Olives", nameEth: "ደብረ ዘይት", ...addDays(neneweMonth, neneweDay, 41, year), type: "feast" },
    { name: "Hosanna (Palm Sunday)", nameEth: "ሆሣዕና", ...addDays(neneweMonth, neneweDay, 62, year), type: "feast" },
    { name: "Good Friday", nameEth: "ስቅለት", ...addDays(neneweMonth, neneweDay, 67, year), type: "fast" },
    { name: "Easter (Fasika)", nameEth: "ትንሣኤ", ...addDays(neneweMonth, neneweDay, 69, year), type: "feast" },
    { name: "Assembly of Priests", nameEth: "ርክበ ካህናት", ...addDays(neneweMonth, neneweDay, 93, year), type: "feast" },
    { name: "Ascension", nameEth: "ዕርገት", ...addDays(neneweMonth, neneweDay, 108, year), type: "feast" },
    { name: "Pentecost", nameEth: "በዓለ ሐምሳ", ...addDays(neneweMonth, neneweDay, 118, year), type: "feast" },
    { name: "Fast of Apostles", nameEth: "ጾመ ሐዋርያት", ...addDays(neneweMonth, neneweDay, 119, year), type: "fast" },
    { name: "Fast of Salvation", nameEth: "ጾመ ድኅነት", ...addDays(neneweMonth, neneweDay, 121, year), type: "fast" },
  ];

  const fixedHolidays: Holiday[] = [
    { name: "New Year (Enkutatash)", nameEth: "እንቁጣጣሽ", month: 1, day: 1, type: "feast" },
    { name: "Finding of True Cross", nameEth: "መስቀል", month: 1, day: 17, type: "feast" },
    { name: "Advent Fast (Nebiyat)", nameEth: "ጾመ ነቢያት", month: 3, day: 15, type: "fast" },
    { name: "Zion Mariam", nameEth: "ኅዳር ጽዮን", month: 3, day: 21, type: "feast" },
    { name: "Christmas (Gena)", nameEth: "ልደት", month: 4, day: isLeapYear(year - 1) ? 28 : 29, type: "feast" },
    { name: "Epiphany (Timket)", nameEth: "ጥምቀት", month: 5, day: 11, type: "feast" },
    { name: "Marriage of Cana", nameEth: "ቃና ዘገሊላ", month: 5, day: 12, type: "feast" },
    { name: "Covenant of Mercy", nameEth: "ኪዳነ ምሕረት", month: 6, day: 16, type: "feast" },
    { name: "Victory of Adwa", nameEth: "የዓድዋ ድል", month: 7, day: 23, type: "feast" },
    { name: "Fast of Assumption", nameEth: "ጾመ ፍልሰታ (መጀመሪያ)", month: 12, day: 1, type: "fast" },
    { name: "Transfiguration", nameEth: "ደብረ ታቦር", month: 12, day: 13, type: "feast" },
    { name: "Assumption of Mary", nameEth: "ፍልሰታ (መጨረሻ)", month: 12, day: 16, type: "feast" },
  ];

  return [...holidays, ...fixedHolidays].sort((a, b) => (a.month * 31 + a.day) - (b.month * 31 + b.day));
}

function addDays(m: number, d: number, days: number, year: number) {
  let currentMonth = m;
  let currentDay = d + days;
  
  while (currentDay > getDaysInMonth(currentMonth, year)) {
    currentDay -= getDaysInMonth(currentMonth, year);
    currentMonth++;
    if (currentMonth > 13) {
      currentMonth = 1;
    }
  }
  
  return { month: currentMonth, day: currentDay };
}
