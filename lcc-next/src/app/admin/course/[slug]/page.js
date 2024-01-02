'use client';

import { Heading, SimpleGrid, Card, CardBody, Button } from '@chakra-ui/react';
import { getCourseByID } from '../../../../utils/course.util';
import { useEffect, useState } from 'react';
import { getSectionByCourseID } from '../../../../utils/section.util';
import Link from 'next/link';

export default function CourseDetail({ params }) {
	const id = params.slug;
	const [title, setTitle] = useState('');
	const [desc, setDesc] = useState('');
	const [instructor, setInstructor] = useState('');
	const [sections, setSections] = useState([]);

	const setCourseData = async () => {
		const data = await getCourseByID(id);
		const course = data.course;
		setTitle(course.title);
		setDesc(course.description);
		setInstructor(course.instructor);
	};

	const setSectionData = async () => {
		const data = await getSectionByCourseID(id);
		setSections(data.courseSections);
	};

	useEffect(() => {
		setCourseData();
		setSectionData();
	}, []);

	return (
		<div className='container mx-auto px-4'>
			<div className='space-y-4'>
				<Heading>{title}</Heading>
				<p>{desc}</p>
				<p className='font-medium'>Instructor: {instructor}</p>
			</div>
			<div className='mt-8 space-y-2'>
				<div className='flex justify-between items-center'>
					<p className='font-bold'>Course Content</p>
					<Link href={`/admin/add-section/${id}`}>
						<Button colorScheme='purple'>Add section</Button>
					</Link>
				</div>
				<SimpleGrid columns={1} spacing={4}>
					{sections.length > 0
						? sections.map((section, index) => (
								<Card key={index}>
									<CardBody>
										<p className='font-semibold'>
											Section {index + 1}: {section.title}
										</p>
									</CardBody>
								</Card>
						  ))
						: 'Tidak ada section'}
				</SimpleGrid>
			</div>
		</div>
	);
}
