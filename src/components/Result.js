import React from 'react'

const Result = ({ dayCount }) => {
	if (dayCount === null) return null

	return (
		<div>number of working days: {dayCount}</div>
	)
}

export default Result 
