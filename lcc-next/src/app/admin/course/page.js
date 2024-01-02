import { Heading } from '@chakra-ui/react';
import CourseList from '../../../components/admin/CourseList';

export default function CoursePage() {
	return (
		<div className='container px-4 mx-auto space-y-4'>
			<Heading>Course List</Heading>
			<CourseList />
		</div>
	);
}
