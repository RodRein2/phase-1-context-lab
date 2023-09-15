function createEmployeeRecord(arr) {
    const [firstName, familyName, title, payPerHour] = arr;
    return {
      firstName,
      familyName,
      title,
      payPerHour,
      timeInEvents: [],
      timeOutEvents: [],
    };
  }

  function createEmployeeRecords(arr) {
    return arr.map(createEmployeeRecord);
}

function createTimeInEvent(timestamp) {
    if (typeof timestamp !== 'string') {
      throw new Error('Timestamp must be a string');
    }
  
    const [date, hour] = timestamp.split(" ");
    const timeInEvent = {
      type: "TimeIn",
      date,
      hour: parseInt(hour, 10),
    };
  
    this.timeInEvents.push(timeInEvent);
    return this;
  }
  
  function createTimeOutEvent(timestamp) {
    if (typeof timestamp !== 'string') {
      throw new Error('Timestamp must be a string');
    }
  
    const [date, hour] = timestamp.split(" ");
    const timeOutEvent = {
      type: "TimeOut",
      date,
      hour: parseInt(hour, 10),
    };
  
    this.timeOutEvents.push(timeOutEvent);
    return this;
  }  
function hoursWorkedOnDate(date) {
  const timeInEvent = this.timeInEvents.find((event) => event.date === date);
  const timeOutEvent = this.timeOutEvents.find((event) => event.date === date);

  if (!timeInEvent || !timeOutEvent) {
    throw new Error(`No matching timeIn/timeOut events found for date ${date}`);
  }

  const hoursWorked = (timeOutEvent.hour - timeInEvent.hour) / 100; 

  return hoursWorked;
}
function wagesEarnedOnDate(date) {
    const hoursWorked = hoursWorkedOnDate.call(this, date); 
    const payRate = this.payPerHour; 
  
    if (typeof hoursWorked === 'undefined') {
      throw new Error(`No hours worked found for date ${date}`);
    }
  
    const earnings = hoursWorked * payRate;
  
    return earnings;
}

function findEmployeeByFirstName(collection, firstNameString) {
    return collection.find((employee) => employee.firstName === firstNameString);
  }

  function calculatePayroll(employeeRecords) {
    const totalPayroll = employeeRecords.reduce((total, employee) => {
      return total + allWagesFor.call(employee);
    }, 0);
  
    return totalPayroll;
  }

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

