import axios from 'axios'

const get = () => {
	const req = axios.get('https://data.gov.au/data/api/3/action/datastore_search?resource_id=c4163dc4-4f5a-4cae-b787-43ef0fcf8d8b')
	return req.then(res => res.data.result.records.map(holiday => {
		return {
			date: new Date(`${holiday["Date"].substring(0, 4)}-${holiday["Date"].substring(4, 6)}-${holiday["Date"].substring(6, 8)}`),
			name: holiday["Holiday Name"],
			jurisdiction: holiday["Jurisdiction"]
		}
	}))
}

export default { get }
