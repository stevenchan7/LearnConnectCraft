import axios from 'axios';

export async function getCourseByID(id) {
	try {
		const { data } = await axios.get(`http://localhost:5000/course/${id}`);

		return data;
	} catch (err) {
		console.log(err);
	}
}

export async function getCourse() {
	try {
		const { data } = await axios.get('http://localhost:5000/course');

		return data;
	} catch (err) {
		console.log(err);
	}
}

export async function deleteCourseByID(id) {
	try {
		const res = await axios.delete('http://localhost:5000/course', {
			id: id,
		});
		console.log(res);
	} catch (err) {
		console.log(err);
		throw new Error();
	}
}
