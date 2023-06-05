import moment from 'moment'
import momentTimeZone from 'moment-timezone'

export default {
  getCurrentDate() {
    return new Date().toISOString().slice(0, 10)
  },
  toDate(dateStr: string) {
    return dateStr ?? new Date(dateStr)
  },

  toMonth(dateStr: string) {
    return dateStr ?? moment(new Date(dateStr)).format('YYYY/MM')
  },
  //convert date data form string
  formatDate(input: string) {
    return input ? new Date(input).toISOString().slice(0, 10) : null
  },
  formatDateTime(input: string) {
    return input
      ? new Date(input).toISOString().replace(/T/, ' ').replace(/\..+/, '')
      : null
  },
  convertToCurrentTimeZone(dateStr: string, dateFormat: string) {
    const tz = momentTimeZone.tz.guess()
    return moment.tz(dateStr, dateFormat, tz).utc().format(dateFormat)
  },
   //convert date data form string
   formatDateBackSlash(input: string) {
    return input ? moment(new Date(input)).format('YYYY/MM/DD') : null
  },
  formatDateWithValue(date:any) {
    return moment(new Date(date)).format('YYYY/MM/DD')
  },
  formatDateTimeBackSlash(input: string) {
    return input ? moment(new Date(input)).format('YYYY/MM/DD HH:mm') : null
  },
  formatDateAvoidWarning(date:any) {
    return moment(new Date(date)).format('YYYY/MM/DD')
  },
  getMaxDateInMonth(date:Date){
    const getAllDayInMonth = moment(moment(date).format('YYYY/MM/DD'), 'YYYY-MM').daysInMonth();
    return moment(date).format(`YYYY/MM/${getAllDayInMonth}`)
  }
}
