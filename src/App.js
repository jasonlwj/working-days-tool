import React, { useState, useEffect } from 'react'
import holidayService from './services/holidays'

const DayView = ({ dayCount }) => {
	if (!dayCount) return null

	return (
		<div>number of working days: {dayCount}</div>
	)
}

const App = () => {
	const [ dayCount, setDayCount ] = useState(null)
	const [ fromDate, setFromDate ] = useState(null)
	const [ toDate, setToDate ] = useState(null)
	const [ publicHolidays, setPublicHolidays ] = useState([])

	useEffect(() => {
		holidayService
			.get()
			.then(returnedHolidays => setPublicHolidays(returnedHolidays))
	}, [])

	const handleFromDateChange = event => setFromDate(new Date(event.target.value))
	const handleToDateChange = event => setToDate(new Date(event.target.value))

	const handleCalculate = () => {

		if (fromDate && toDate) {
			let workDayCount = 0
			let currentDate = new Date(fromDate)

			while (currentDate <= toDate) {
				if (
					currentDate.getDay() !== 0 
					&& currentDate.getDay() !== 6
				)
					workDayCount++
				
				currentDate.setDate(currentDate.getDate() + 1)
			}

			setDayCount(workDayCount)
		}
		else 
			console.log(':(')
	}
	
	return (
		<div className="App">
			<div>
				<i>note: works for 2021, australia vic</i>
				<p>get number working of days between <br />
				<input type="date" onChange={handleFromDateChange} /></p>
				<p>and <br />
				<input type="date" onChange={handleToDateChange} /></p>
				<button onClick={handleCalculate}>calculate</button>
				<DayView dayCount={dayCount} />
			</div>
		</div>
	)
}

export default App
