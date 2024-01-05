import { Button, Heading } from '@chakra-ui/react';
import CourseList from '../../../components/admin/CourseList';
import Link from 'next/link';

export default function CoursePage() {
	return (
		<div className='container px-4 mx-auto space-y-4'>
			<Heading>Course List</Heading>
			<div className='text-end'>
				<Link href='/admin/add-course'>
					<Button colorScheme='purple'>Add course</Button>
				</Link>
			</div>
			<CourseList />
		</div>
	);
}
