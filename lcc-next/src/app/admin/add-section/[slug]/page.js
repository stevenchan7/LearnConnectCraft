'use client';

import { FormControl, FormLabel, Input } from '@chakra-ui/react';
import { Alert, AlertIcon } from '@chakra-ui/react';
import { Textarea } from '@chakra-ui/react';
import { Button } from '@chakra-ui/react';
import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function AddSectionPage({ params }) {
	const courseId = params.slug;
	const [title, setTitle] = useState('');
	const [desc, setDesc] = useState('');
	const [selectedVideo, setSelectedVideo] = useState(null);
	const [isSuccess, setIsSuccess] = useState(false);
	const router = useRouter();

	const onDrop = useCallback((acceptedFiles) => {
		// Do something with the files
		setSelectedVideo(acceptedFiles[0]);
	}, []);
	const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, maxFiles: 1 });

	const SuccesAlert = () => {
		return (
			<div className='fixed top-4 left-1/2 -translate-x-1/2 z-10'>
				<Alert status='success'>
					<AlertIcon />
					Successfully add new section
				</Alert>
			</div>
		);
	};

	const handleFormSubmit = async (e) => {
		try {
			e.preventDefault();

			const formData = new FormData();
			formData.append('video', selectedVideo);

			const videoResponse = await axios.post('http://localhost:5000/section/video', formData);

			const video = videoResponse.data.filename; // Get thumbnail url from response

			const sectionResponse = await axios.post('http://localhost:5000/section', {
				title: title,
				desc: desc,
				video: video,
				courseId: courseId,
			});
			console.log(sectionResponse);
			setIsSuccess(true);
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
					<h1 className='text-4xl text-center'>New Course Form</h1>
					<h2 className='text-xl mt-8'>Course Information</h2>
					<form onSubmit={(e) => handleFormSubmit(e)} className='space-y-2 mt-4'>
						{/* Course title */}
						<FormControl isRequired>
							<FormLabel>Course Title</FormLabel>
							<Input onChange={(e) => setTitle(e.target.value)} />
						</FormControl>
						{/* Course desc */}
						<FormControl isRequired>
							<FormLabel>Course Description</FormLabel>
							<Textarea onChange={(e) => setDesc(e.target.value)} />
						</FormControl>
						{/* Thumbnail upload */}
						<FormControl isRequired>
							<FormLabel>Upload Thumbnail</FormLabel>
							<div {...getRootProps()}>
								<input {...getInputProps()} />
								{isDragActive ? <p>Drop the files here ...</p> : <p>Drag 'n' drop some files here, or click to select files</p>}
							</div>
							{selectedVideo ? (
								<video width='320' height='240' controls>
									<source src={URL.createObjectURL(selectedVideo)} type='video/mp4' />
									Your browser does not support the video tag.
								</video>
							) : (
								''
							)}
						</FormControl>

						<div className='text-center'>
							<Button colorScheme='purple' type='submit' className='mx-auto'>
								Add
							</Button>
						</div>
					</form>
				</div>
			</div>
		</>
	);
}
