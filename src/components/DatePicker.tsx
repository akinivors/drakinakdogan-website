'use client';

import { useState } from 'react';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';
import { Calendar as CalendarIcon } from 'lucide-react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { clsx } from 'clsx';

interface DatePickerProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  placeholder: string;
}

export default function DatePicker({ date, setDate, placeholder }: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        className={clsx(
          "w-full rounded-md border border-gray-300 shadow-sm bg-white px-3 py-2 text-left font-sans flex justify-between items-center",
          "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary",
          !date && "text-gray-500"
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        {date ? format(date, 'PPP', { locale: tr }) : <span>{placeholder}</span>}
        <CalendarIcon className="h-4 w-4 text-gray-400" />
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-2 bg-white rounded-md shadow-lg border">
          <DayPicker
            mode="single"
            selected={date}
            onSelect={(selectedDate) => {
              setDate(selectedDate);
              setIsOpen(false);
            }}
            initialFocus
            locale={tr}
          />
        </div>
      )}
    </div>
  );
} 