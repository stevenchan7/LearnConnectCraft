'use client';

import { Heading, SimpleGrid, Button, Link, Card, CardBody } from '@chakra-ui/react';
import { getCourseByID } from '../../../../utils/course.util';
import { useEffect, useState } from 'react';
import { getSectionByCourseID } from '../../../../utils/section.util';
import NextLink from 'next/link';
import SectionCard from '../../../../components/admin/SectionCard';

export default function CoursePage({ params }) {
	const id = params.id;
	const [title, setTitle] = useState('');
	const [desc, setDesc] = useState('');
	const [instructor, setInstructor] = useState('');
	const [sections, setSections] = useState([]);

	const setCourseData = async () => {
		try {
			const data = await getCourseByID(id);
			const course = data.course;
			setTitle(course.title);
			setDesc(course.description);
			setInstructor(course.instructor);
		} catch (err) {
			console.log(err);
		}
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
		<div className='container mx-auto px-4 my-[128px]'>
			<Link colorScheme='purple' as={NextLink} href='/course'>
				Course
			</Link>
			<div className='mt-8 space-y-4'>
				<Heading>{title}</Heading>
				<p>{desc}</p>
				<p className='font-medium'>Instructor: {instructor}</p>
			</div>
			<div className='mt-8 space-y-2'>
				<p className='font-bold'>Course Content</p>
				<SimpleGrid columns={1} spacing={4}>
					{sections.length > 0
						? sections.map((section, index) => (
								<Link as={NextLink} href={`/course/${id}/section/${section.id}`}>
									<Card direction={'row'} className='items-center'>
										<CardBody>
											<p className='font-semibold'>
												Section {index + 1}: {section.title}
											</p>
										</CardBody>
									</Card>
								</Link>
						  ))
						: 'Tidak ada section'}
				</SimpleGrid>
			</div>
		</div>
	);
}
