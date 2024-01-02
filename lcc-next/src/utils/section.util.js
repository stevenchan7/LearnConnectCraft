import axios from 'axios';

export async function getSectionByCourseID(id) {
	try {
		const { data } = await axios.get(`http://localhost:5000/section/${id}`);
		return data;
	} catch (err) {
		console.log(err);
	}
}
