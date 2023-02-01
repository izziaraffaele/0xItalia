import format from 'date-fns/format';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import getTime from 'date-fns/getTime';

// ----------------------------------------------------------------------

export function fDate(date: Date | string | number, target = 'dd MMMM yyyy') {
  return format(new Date(date), target);
}

export function fDateTime(date: Date | string | number) {
  return format(new Date(date), 'dd MMM yyyy p');
}

export function fTimestamp(date: Date | string | number) {
  return getTime(new Date(date));
}

export function fDateTimeSuffix(date: Date | string | number) {
  return format(new Date(date), 'dd/MM/yyyy hh:mm p');
}

export function fToNow(date: Date | string | number) {
  return formatDistanceToNow(new Date(date), {
    addSuffix: true,
  });
}
