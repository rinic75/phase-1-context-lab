/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */
const createEmployeeRecord = (recArray) => { 
    return {
        firstName: recArray[0],
        familyName : recArray[1],
        title: recArray[2],
        payPerHour: recArray[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

const createEmployeeRecords = (recordsArray) => {
    return recordsArray.map(rec => createEmployeeRecord(rec))
}

const createTimeInEvent = function(dataStamp) {
    const [date, hour] = dataStamp.split(" ");
    const timeIn = {
        type : "TimeIn",
        hour : parseInt(hour),
        date : date
    }
    this.timeInEvents.push(timeIn); 
    return this;
}

const createTimeOutEvent = function(dataStamp) {
    const [date, hour] = dataStamp.split(" ");
    const timeOut = {
        type : "TimeOut",
        hour : parseInt(hour),
        date : date
    }
    this.timeOutEvents.push(timeOut); 
    return this;
}

const hoursWorkedOnDate = function(givenDate) {
    let timeIn = this.timeInEvents.find(e => e.date === givenDate);
    let timeOut = this.timeOutEvents.find(e => e.date === givenDate);
    return (timeOut.hour - timeIn.hour)/100;
}

const wagesEarnedOnDate = function(givenDate) {
    return hoursWorkedOnDate.call(this, givenDate) * this.payPerHour;
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

const findEmployeeByFirstName = function(srcArray, firstName) {
    return srcArray.find(e => e.firstName === firstName)
}

const calculatePayroll = function (array) {
    return array.reduce((total, rec) => total + allWagesFor.call(rec), 0)
}