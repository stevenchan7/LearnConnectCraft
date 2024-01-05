'use client';

import { Card, CardBody, Heading, Text } from '@chakra-ui/react';
import CourseSectionList from '../../../../../../components/course/CourseSectionList';
import { useEffect, useState } from 'react';
import { getSectionByID } from '../../../../../../utils/section.util';

export default function CourseSectionPage({ params }) {
	const courseId = params.id;
	const sectionId = params.sectionId;
	const [title, setTitle] = useState('');
	const [desc, setDesc] = useState('');
	const [selectedVideo, setSelectedVideo] = useState(null);
	console.log(selectedVideo);

	const setSectionData = async () => {
		const data = await getSectionByID(sectionId);
		const section = data.section;
		setTitle(section.title);
		setDesc(section.description);
		setSelectedVideo(section.video);
	};

	useEffect(() => {
		setSectionData();
	}, []);

	return (
		<div className='container mx-auto my-[128px] px-4'>
			<div className='flex'>
				{/* Main frame / video frame */}
				<div className='basis-3/4 p-4'>
					{selectedVideo && (
						<video controls className='w-full'>
							<source src={`http://localhost:5000/${selectedVideo}`} type='video/mp4' />
							Your browser does not support the video tag.
						</video>
					)}
					<Heading>{title}</Heading>
					<Text>{desc}</Text>
				</div>
				<div className='basis-1/4'>
					<CourseSectionList id={courseId} />
				</div>
			</div>
		</div>
	);
}
