// Your code here

function createEmployeeRecord (employee) {
    return {
        firstName: employee[0],
        familyName: employee[1],
        title: employee[2],
        payPerHour: employee[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords (employees) {
    return employees.map( employee => {
        return createEmployeeRecord(employee)})
}

function createTimeInEvent (employee, dateStamp) {
    let [date, hour] = dateStamp.split(' ')

    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date: date
    })

    return employee
}

function createTimeOutEvent (employee, dateStamp) {
    let [date, hour] = dateStamp.split(' ')

    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date: date
    })

    return employee
}

function hoursWorkedOnDate (employee, dateStamp) {
    let timeIn = employee.timeInEvents.find( e => {
        return e.date === dateStamp
    })

    let timeOut = employee.timeOutEvents.find( e => {
        return e.date === dateStamp
    })

    return (timeOut.hour - timeIn.hour) / 100
}

function wagesEarnedOnDate (employee, dateStamp) {
    return hoursWorkedOnDate(employee, dateStamp) * employee.payPerHour
}

function allWagesFor (employee) {
    let allDates = employee.timeInEvents.map( e => {
        return e.date
    })
    let payDates = allDates.reduce( (memo, d) => {
        return memo + wagesEarnedOnDate(employee, d)
    }, 0)

    return payDates
}

function findEmployeeByFirstName(employees, name) {
    return employees.find(employee => {
        return employee.firstName === name
    })
}

function calculatePayroll(employee) {
    return employee.reduce( (memo, rec) => {
        return memo + allWagesFor(rec)
    }, 0)
}