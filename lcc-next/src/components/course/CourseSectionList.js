'use client';

import { useEffect, useState } from 'react';
import { getSectionByCourseID } from '../../utils/section.util';
import Link from 'next/link';
import { Card, CardBody } from '@chakra-ui/react';

export default function CourseSectionList({ id }) {
	const [sections, setSections] = useState([]);

	const setSectionData = async () => {
		const data = await getSectionByCourseID(id);
		setSections(data.courseSections);
	};

	useEffect(() => {
		setSectionData();
	}, []);

	return (
		<div>
			{sections &&
				sections.map((section, index) => (
					<Link key={index} href={`/course/${id}/section/${section.id}`}>
						<Card className='!rounded-none'>
							<CardBody>
								<p className='font-bold text-xs'>
									Section {index + 1}: {section.title}
								</p>
							</CardBody>
						</Card>
					</Link>
				))}
		</div>
	);
}
