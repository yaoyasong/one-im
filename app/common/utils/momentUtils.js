import moment from 'moment';

export function formatTime(time) {
  if (isSameDay(time,moment().valueOf())) {
    return moment(time).format('HH:mm')
  } else {
    return moment(time).format('MM/DD')
  }
}

export function formatMsgTime(time) {
  if (isSameDay(time,moment().valueOf())) {
    return moment(time).format('HH:mm')
  } else {
    return moment(time).format('MM/DD HH:mm')
  }
}

export function isSameDay(time1,time2) {
  return moment(time1).isSame(moment(time2),'day');
}

export function isSameMinute(time1,time2) {
  return moment(time1).isSame(moment(time2),'minute');
}

export function isToday(time) {
  return moment(time).isSame(momnet(),'day');
}
