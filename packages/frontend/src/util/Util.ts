export function mapDayToWeekday(dayNum: number) {
  let dayStr = "";
  switch (dayNum) {
    case 0:
      dayStr = 'MON';
      break;
    case 1:
      dayStr = 'TUE';
      break;
    case 2:
      dayStr = 'WED';
      break;
    case 3:
      dayStr = 'THU';
      break;
    case 4:
      dayStr = 'FRI';
      break;
    case 5:
      dayStr = 'SAT';
      break;
    case 6:
      dayStr = 'SUN';
      break;
    default:
      dayStr = 'NOT_AVAILABLE';
      break;
  }
  return dayStr;
}

export function mapDateToWeekday(date: string) {
    let dayStr = "";
    //console.log(new Date(date).getDay());
    switch (new Date(date).getDay()) {
      case 0:
        dayStr = 'MON';
        break;
      case 1:
        dayStr = 'TUE';
        break;
      case 2:
        dayStr = 'WED';
        break;
      case 3:
        dayStr = 'THU';
        break;
      case 4:
        dayStr = 'FRI';
        break;
      case 5:
        dayStr = 'SAT';
        break;
      case 6:
        dayStr = 'SUN';
        break;
      default:
        dayStr = 'NOT_AVAILABLE';
        break;
    }
    return dayStr;
  }