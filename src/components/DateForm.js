import React from 'react'

const DateForm = ({ handleCalculate, handleFromDateChange, handleToDateChange, state, handleStateChange }) => {
	return (
		<form onSubmit={handleCalculate}>
			<div>
				get number working of days between <br />
				<input type="date" onChange={handleFromDateChange} />
			</div>
			<div>
				and <br />
				<input type="date" onChange={handleToDateChange} />
			</div>
			<div>
				<select value={state} onChange={handleStateChange}>
					<option value="act">Australian Capital Territory</option>
					<option value="nsw">New South Wales</option>
					<option value="nt">Northern Territory</option>
					<option value="qld">Queensland</option>
					<option value="sa">South Australia</option>
					<option value="tas">Tasmania</option>
					<option value="vic">Victoria</option>
					<option value="wa">Western Australia</option>
				</select>
			</div>
			<button type="submit">calculate</button>
		</form>
	)
}

export default DateForm 
