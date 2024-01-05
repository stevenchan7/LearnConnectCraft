import axios from 'axios';

export async function getSectionByCourseID(id) {
	try {
		const { data } = await axios.get(`http://localhost:5000/section/course/${id}`);
		return data;
	} catch (err) {
		console.log(err);
	}
}

export async function getSectionByID(id) {
	try {
		const { data } = await axios.get(`http://localhost:5000/section/${id}`);
		return data;
	} catch (err) {
		console.log(err);
	}
}

export async function deleteSectionByID(id) {
	try {
		const { data } = await axios.post('http://localhost:5000/section/delete', {
			id: id,
		});
		return data;
	} catch (err) {
		console.log(err);
	}
}
