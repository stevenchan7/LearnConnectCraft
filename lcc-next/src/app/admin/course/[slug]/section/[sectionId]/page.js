'use client';

import { FormControl, FormLabel, Input } from '@chakra-ui/react';
import { Alert, AlertIcon } from '@chakra-ui/react';
import { Textarea } from '@chakra-ui/react';
import { Button, ButtonGroup } from '@chakra-ui/react';
import { useState, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { getSectionByID } from '../../../../../../utils/section.util';

export default function EditSectionPage({ params }) {
	const id = params.sectionId;
	const courseId = params.slug;
	const [title, setTitle] = useState('');
	const [desc, setDesc] = useState('');
	const [selectedVideo, setSelectedVideo] = useState(null);
	const [updatedVideo, setUpdatedVideo] = useState(null);
	const [isSuccess, setIsSuccess] = useState(false);
	const [isDropzoneFile, setIsDropzoneFile] = useState(false);
	const router = useRouter();

	const onDrop = useCallback((acceptedFiles) => {
		// Do something with the files
		setSelectedVideo(acceptedFiles[0]);
		setIsDropzoneFile(true);
	}, []);
	const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, maxFiles: 1 });

	const SuccesAlert = () => {
		return (
			<div className='fixed top-4 left-1/2 -translate-x-1/2 z-10'>
				<Alert status='success'>
					<AlertIcon />
					Successfully update section
				</Alert>
			</div>
		);
	};

	const setSectionData = async () => {
		const data = await getSectionByID(id);
		const section = data.section;
		setTitle(section.title);
		setDesc(section.description);
		setSelectedVideo(section.video);
	};

	useEffect(() => {
		setSectionData();
	}, []);

	const handleFormSubmit = async (e) => {
		try {
			e.preventDefault();

			if (isDropzoneFile) {
				const formData = new FormData();
				formData.append('video', selectedVideo);

				const videoResponse = await axios.post('http://localhost:5000/section/video', formData);

				setUpdatedVideo(videoResponse.data.filename); // Get thumbnail url from response
			}

			const sectionResponse = await axios.post('http://localhost:5000/section/edit', {
				id: id,
				title: title,
				desc: desc,
				video: isDropzoneFile ? updatedVideo : selectedVideo,
			});
			console.log(sectionResponse);
			setIsSuccess(true);
			setTimeout(() => {
				router.push(`/admin/course/${courseId}`);
			}, 1000);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<>
			{/* Success alert */}
			{isSuccess ? <SuccesAlert /> : ''}
			{/* Success alert end */}
			<div className='container px-4 mx-auto flex flex-col justify-center items-center'>
				<div className='max-w-4xl w-full border rounded p-4'>
					<h1 className='text-4xl text-center'>Section Form</h1>
					<h2 className='text-xl mt-8'>Section Information</h2>
					<form onSubmit={(e) => handleFormSubmit(e)} className='space-y-2 mt-4'>
						{/* Course title */}
						<FormControl isRequired>
							<FormLabel>Course Title</FormLabel>
							<Input value={title} onChange={(e) => setTitle(e.target.value)} />
						</FormControl>
						{/* Course desc */}
						<FormControl isRequired>
							<FormLabel>Course Description</FormLabel>
							<Textarea value={desc} onChange={(e) => setDesc(e.target.value)} />
						</FormControl>
						{/* Video upload */}
						<FormControl isRequired>
							<FormLabel>Upload Video</FormLabel>
							<div {...getRootProps()}>
								<input {...getInputProps()} />
								{isDragActive ? <p>Drop the files here ...</p> : <p>Drag 'n' drop some files here, or click to select files</p>}
							</div>
							{selectedVideo ? (
								<video width='320' height='240' controls>
									<source src={isDropzoneFile ? URL.createObjectURL(selectedVideo) : `http://localhost:5000/${selectedVideo}`} type='video/mp4' />
									Your browser does not support the video tag.
								</video>
							) : (
								''
							)}
						</FormControl>

						<ButtonGroup className='w-full justify-center'>
							<Button colorScheme='purple' type='submit'>
								Update
							</Button>
							<Button onClick={() => router.back()} colorScheme='red'>
								Cancel
							</Button>
						</ButtonGroup>
					</form>
				</div>
			</div>
		</>
	);
}
