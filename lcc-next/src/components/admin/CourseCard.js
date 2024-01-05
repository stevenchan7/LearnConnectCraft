import { Card, CardBody, CardFooter, Image, Stack, Heading, Text, Button, ButtonGroup } from '@chakra-ui/react';
import Link from 'next/link';
import { deleteCourseByID } from '../../utils/course.util';
import DeleteButtonDialog from './DeleteButtonDialog';

export default function CourseCard({ course, setCoursesData }) {
	const handleDeleteButton = async () => {
		try {
			await deleteCourseByID(course.id);
			setCoursesData();
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<Card direction={{ base: 'column', sm: 'row' }} overflow='hidden' variant='outline' size='sm'>
			<Image objectFit='cover' maxW={{ base: '100%', sm: '200px' }} src={`http://localhost:5000/${course.thumbnail}`} alt='course image' />

			<Stack>
				<CardBody>
					<Heading size='md'>{course.title}</Heading>
					<Text>{course.description.split(' ').length > 10 ? course.description.split(' ').slice(0, 9).join(' ') + '...' : course.description}</Text>
					<Text className='pt-2 font-medium'>{course.instructor}</Text>
				</CardBody>

				<CardFooter>
					<ButtonGroup>
						<Link href={`/admin/edit-course/${course.id}`}>
							<Button colorScheme='purple'>Edit</Button>
						</Link>
						<Link href={`/admin/course/${course.id}`}>
							<Button colorScheme='purple'>Detail</Button>
						</Link>
						<DeleteButtonDialog handleDeleteButton={handleDeleteButton} />
					</ButtonGroup>
				</CardFooter>
			</Stack>
		</Card>
	);
}
