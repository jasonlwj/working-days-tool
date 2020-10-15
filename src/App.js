import React, { useState, useEffect } from 'react'
import DateForm from './components/DateForm'
import Result from './components/Result'
import holidayService from './services/holidays'

const App = () => {
	const [ dayCount, setDayCount ] = useState(null)
	const [ fromDate, setFromDate ] = useState(null)
	const [ toDate, setToDate ] = useState(null)
	const [ state, setState ] = useState('vic')
	const [ publicHolidays, setPublicHolidays ] = useState([])

	// call the holiday service
	useEffect(() => {
		holidayService
			.get()
			.then(returnedHolidays => setPublicHolidays(returnedHolidays))
	}, [])

	// form input handlers
	const handleFromDateChange = event => setFromDate(new Date(event.target.value))
	const handleToDateChange = event => setToDate(new Date(event.target.value))
	const handleStateChange = event => setState(event.target.value)

	const handleCalculate = event => {
		event.preventDefault()

		if (fromDate && toDate) {
			const filteredHolidays = publicHolidays.filter(holiday => holiday.jurisdiction === state)
			let workDayCount = 0
			let currentDate = new Date(fromDate)

			while (currentDate <= toDate) {
				if (
					currentDate.getDay() !== 0 
					&& currentDate.getDay() !== 6
					&& !filteredHolidays.map(holiday => holiday.date.getTime()).includes(currentDate.getTime())
				)
					workDayCount++

				currentDate.setDate(currentDate.getDate() + 1)
			}

			setDayCount(workDayCount)
		}
		else 
			alert('Please select a value for both dates')
	}
	
	// render to screen
	return (
		<div className="App">
			<div>
				<i>note: works for 2021, australia vic</i>
				<DateForm 
					handleCalculate={handleCalculate} 
					handleFromDateChange={handleFromDateChange} 
					handleToDateChange={handleToDateChange} 
					state={state} 
					handleStateChange={handleStateChange} 
				/>
				<Result dayCount={dayCount} />
			</div>
		</div>
	)
}

export default App
