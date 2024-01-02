'use client';

import { SimpleGrid } from '@chakra-ui/react';
import CourseCard from './CourseCard';
import { useEffect, useState } from 'react';
import { getCourse } from '../../utils/course.util';

export default function CourseList() {
	const [courses, setCourses] = useState([]);

	const setCoursesData = async () => {
		const data = await getCourse();
		setCourses(data.courses);
	};

	useEffect(() => {
		setCoursesData();
	}, []);

	return (
		<SimpleGrid columns={1} spacing={4}>
			{courses.length > 0 ? courses.map((course, index) => <CourseCard key={index} course={course} setCoursesData={setCoursesData} />) : ''}
		</SimpleGrid>
	);
}
