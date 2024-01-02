'use client';

import { FormControl, FormLabel, Input } from '@chakra-ui/react';
import { Alert, AlertIcon } from '@chakra-ui/react';
import { Textarea } from '@chakra-ui/react';
import { Button } from '@chakra-ui/react';
import { useState, useCallback } from 'react';
import Select from 'react-select';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const options = [
	{ value: 1, label: 'Programming' },
	{ value: 2, label: 'Finance' },
	{ value: 3, label: 'Gaming' },
	{ value: 4, label: 'React' },
];

export default function AddCoursePage() {
	const [title, setTitle] = useState('');
	const [desc, setDesc] = useState('');
	const [instructor, setInstructor] = useState('');
	const [price, setPrice] = useState(null);
	const [selectedOption, setSelectedOption] = useState(null);
	const [selectedThumbnail, setSelectedThumbnail] = useState(null);
	const [isSuccess, setIsSuccess] = useState(false);
	const router = useRouter();

	const onDrop = useCallback((acceptedFiles) => {
		// Do something with the files
		setSelectedThumbnail(acceptedFiles[0]);
	}, []);
	const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, maxFiles: 1 });

	const SuccesAlert = () => {
		return (
			<div className='fixed top-4 left-1/2 -translate-x-1/2 z-10'>
				<Alert status='success'>
					<AlertIcon />
					Successfully add new course
				</Alert>
			</div>
		);
	};

	const handleFormSubmit = async (e) => {
		try {
			e.preventDefault();

			const formData = new FormData();
			formData.append('thumbnail', selectedThumbnail);

			const thumbnailResponse = await axios.post('http://localhost:5000/course/thumbnail', formData);

			const thumbnail = thumbnailResponse.data.filename; // Get thumbnail url from response

			const courseResponse = await axios.post('http://localhost:5000/course', {
				title: title,
				desc: desc,
				instructor: instructor,
				price: price,
				thumbnail: thumbnail,
				category: JSON.stringify(selectedOption),
			});
			setIsSuccess(true);
			router.push('/admin/course');
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
						{/* Price */}
						<FormControl isRequired>
							<FormLabel>Course price</FormLabel>
							<Input onChange={(e) => setPrice(e.target.value)} />
						</FormControl>
						{/* Instructor */}
						<FormControl isRequired>
							<FormLabel>Course Instructor</FormLabel>
							<Input onChange={(e) => setInstructor(e.target.value)} />
						</FormControl>
						{/* Select */}
						<FormControl isRequired>
							<FormLabel>Course Category</FormLabel>
							<Select defaultValue={selectedOption} isMulti onChange={setSelectedOption} options={options} />
						</FormControl>
						{/* Thumbnail upload */}
						<FormControl isRequired>
							<FormLabel>Upload Thumbnail</FormLabel>
							<div {...getRootProps()}>
								<input {...getInputProps()} />
								{isDragActive ? <p>Drop the files here ...</p> : <p>Drag 'n' drop some files here, or click to select files</p>}
							</div>
							{selectedThumbnail ? <img src={URL.createObjectURL(selectedThumbnail)} alt='selected thumbnail' className='aspect-square w-[10rem]' /> : ''}
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
