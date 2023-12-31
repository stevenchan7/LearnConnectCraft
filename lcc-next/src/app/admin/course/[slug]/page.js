'use client';

import { Heading, SimpleGrid, Button, Link } from '@chakra-ui/react';
import { getCourseByID } from '../../../../utils/course.util';
import { useEffect, useState } from 'react';
import { getSectionByCourseID } from '../../../../utils/section.util';
import NextLink from 'next/link';
import SectionCard from '../../../../components/admin/SectionCard';

export default function CourseDetail({ params }) {
	const id = params.slug;
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
		<div className='container mx-auto px-4'>
			<Link colorScheme='purple' as={NextLink} href='/admin/course'>
				Course
			</Link>
			<div className='mt-8 space-y-4'>
				<Heading>{title}</Heading>
				<p>{desc}</p>
				<p className='font-medium'>Instructor: {instructor}</p>
			</div>
			<div className='mt-8 space-y-2'>
				<div className='flex justify-between items-center'>
					<p className='font-bold'>Course Content</p>
					<Link as={NextLink} href={`/admin/add-section/${id}`}>
						<Button colorScheme='purple'>Add section</Button>
					</Link>
				</div>
				<SimpleGrid columns={1} spacing={4}>
					{sections.length > 0 ? sections.map((section, index) => <SectionCard key={index} section={section} setSectionData={setSectionData} index={index} courseId={id} />) : 'Tidak ada section'}
				</SimpleGrid>
			</div>
		</div>
	);
}
