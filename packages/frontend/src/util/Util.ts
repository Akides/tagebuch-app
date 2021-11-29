export function mapDayToWeekday(dayNum: number):string {
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

export function mapDateToWeekday(date: string):string {
    let dayStr = "";
    let weekday = new Date(date).getDay()-1;
    weekday = ((weekday % 7) + 7) % 7
    switch (weekday) {
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

  export function mapMonthToStr(month: string):string {
    let dayStr = "";
    //console.log(new Date(date).getDay());
    switch (month) {
        case "01":
            dayStr = 'January';
            break;
        case "02":
            dayStr = 'February';
            break;
        case "03":
            dayStr = 'March';
            break;
        case "04":
            dayStr = 'April';
            break;
        case "05":
            dayStr = 'May';
            break;
        case "06":
            dayStr = 'June';
            break;
            case "07":
            dayStr = 'July';
            break;
        case "08":
            dayStr = 'August';
            break;
        case "09":
            dayStr = 'September';
            break;
        case "10":
            dayStr = 'October';
            break;
        case "11":
            dayStr = 'November';
            break;
        case "12":
            dayStr = 'December';
            break;
      default:
        dayStr = 'NOT_AVAILABLE';
        break;
    }
    return dayStr;
  }