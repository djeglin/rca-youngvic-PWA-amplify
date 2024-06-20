import { format, isToday, parseISO } from 'date-fns';
import { enGB } from 'date-fns/locale';

export const formatMessageTime = (timestamp: string) => {
  const date = parseISO(timestamp);
  if (isToday(date)) {
    return format(date, 'HH:mm', { locale: enGB });
  } else {
    return format(date, 'dd MMMM yyyy, HH:mm', { locale: enGB });
  }
};
