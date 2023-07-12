const timeNow = new Date();
const validated = false;

/*-- Get # of days in a month --*/
function daysInMonth(month, year) {
  return new Date(year, month, 0).getDate();
}

/*-- Functions which show & hide error messages --*/
function styleError(errorId, inputId, labelId){
  document.getElementById(errorId).style.visibility = "visible";
  document.getElementById(inputId).style.borderColor = "hsl(0, 100%, 67%)";
  document.getElementById(labelId).style.color = "hsl(0, 100%, 67%)";
}
function unStyleError(errorId, inputId, labelId){
  document.getElementById(errorId).style.visibility = "hidden";
  document.getElementById(inputId).style.borderColor = "hsl(0, 0%, 86%)";
  document.getElementById(labelId).style.color = "hsl(0, 1%, 44%)";
}

/*-- Check for valid inputs --*/
function validate(day, month, year){
  //validate empty inputs
  if (day.length == 0){
    styleError('dayerr', 'day-input', 'day-label');
    return false;
  }
  else {
    unStyleError('dayerr', 'day-input', 'day-label');
  }
  if (month.length == 0){
    styleError('montherr', 'month-input', 'month-label');
    return false;
  }
  else {
    unStyleError('montherr', 'month-input', 'month-label');
  }
  if (year.length == 0){
    styleError('yearerr', 'year-input', 'year-label');
    return false;
  }
  else {
    unStyleError('yearerr', 'year-input', 'year-label');
  }

  //validate out of bounds inputs
  if (parseInt(day) > 31){
    styleError('dayerr', 'day-input', 'day-label');
    document.getElementById("dayerr").textContent = "Must be a valid day";
    return false;
  }
  else {
    unStyleError('dayerr', 'day-input', 'day-label');
  }
  if (parseInt(month) > 12){
    document.getElementById("montherr").textContent = "Must be a valid month";
    styleError('montherr', 'month-input', 'month-label');
    return false;
  }
  else {
    unStyleError('montherr', 'month-input', 'month-label');
  }
  if (parseInt(year) > timeNow.getFullYear()){
    document.getElementById("yearerr").textContent = "Must be in the past";
    styleError('yearerr', 'year-input', 'year-label');
    return false;
  }
  else {
    unStyleError('yearerr', 'year-input', 'year-label');
  }

  //validate months with a weird number of days in the year
  if (parseInt(day) > daysInMonth(month, year)){
    document.getElementById("dayerr").textContent = "Must a valid date";
    styleError('dayerr', 'day-input', 'day-label');
    return false;

  }
  else {
    unStyleError('dayerr', 'day-input', 'day-label');
  }
  return true;
}

/*-- Called on button press, date calculations --*/
function getNewTime(){
  let day = document.getElementById('day-input').value;
  let month = document.getElementById('month-input').value;
  let year = document.getElementById('year-input').value;

  let isValidated = validate(day, month, year);
  if (isValidated){
    let timeTarget = new Date(year, (month-1), day);

    let yearsElapsed = Math.round(timeNow.getFullYear() - timeTarget.getFullYear());
    let monthsElapsed = timeNow.getMonth() - timeTarget.getMonth();
    let daysElapsed = timeNow.getDate() - timeTarget.getDate();
    if (monthsElapsed < 0){
      yearsElapsed -= 1;
      monthsElapsed = 12 + monthsElapsed;
    }
    if (daysElapsed < 0) {
      monthsElapsed -= 1;
      daysElapsed = 30 + daysElapsed;

      var copy1 = new Date(timeTarget.getTime());
      copy1.setDate(32);
      daysElapsed = 32-timeTarget.getDate()-copy1.getDate()+timeNow.getDate();

    }

    document.getElementById("year-num").textContent = yearsElapsed;
    document.getElementById("month-num").textContent = monthsElapsed;
    document.getElementById("day-num").textContent = daysElapsed;
  }


}