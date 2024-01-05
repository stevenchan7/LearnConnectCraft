'use client';

import { useEffect, useState, useCallback } from 'react';
import { getCourseByID } from '../../../../utils/course.util';
import { ButtonGroup, FormControl, FormLabel, Input } from '@chakra-ui/react';
import { Alert, AlertIcon } from '@chakra-ui/react';
import { Textarea } from '@chakra-ui/react';
import { Button } from '@chakra-ui/react';
import Select from 'react-select';
import { useDropzone } from 'react-dropzone';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const options = [
	{ value: 1, label: 'Programming' },
	{ value: 2, label: 'Finance' },
	{ value: 3, label: 'Gaming' },
	{ value: 4, label: 'React' },
];

export default function EditCoursePage({ params }) {
	const id = params.slug;
	const [title, setTitle] = useState('');
	const [desc, setDesc] = useState('');
	const [instructor, setInstructor] = useState('');
	const [price, setPrice] = useState(null);
	const [selectedOption, setSelectedOption] = useState(null);
	const [selectedThumbnail, setSelectedThumbnail] = useState(null);
	const [updatedThumbnail, setUpdatedThumbnail] = useState(null);
	const [isDropzoneFile, setIsDropzoneFile] = useState(false);
	const [isSuccess, setIsSuccess] = useState(false);
	const router = useRouter();

	const onDrop = useCallback((acceptedFiles) => {
		// Do something with the files
		setSelectedThumbnail(acceptedFiles[0]);
		setIsDropzoneFile(true);
	}, []);
	const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, maxFiles: 1 });

	const SuccesAlert = () => {
		return (
			<div className='fixed top-4 left-1/2 -translate-x-1/2 z-10'>
				<Alert status='success'>
					<AlertIcon />
					Successfully update course
				</Alert>
			</div>
		);
	};

	const handleFormSubmit = async (e) => {
		try {
			e.preventDefault();

			if (isDropzoneFile) {
				const formData = new FormData();
				formData.append('thumbnail', selectedThumbnail);

				const thumbnailResponse = await axios.post('http://localhost:5000/course/thumbnail', formData);

				setUpdatedThumbnail(thumbnailResponse.data.filename); // Get thumbnail url from response
			}

			const courseResponse = await axios.post('http://localhost:5000/course/edit', {
				id: id,
				title: title,
				desc: desc,
				instructor: instructor,
				price: price,
				thumbnail: isDropzoneFile ? updatedThumbnail : selectedThumbnail,
				category: JSON.stringify(selectedOption),
			});

			console.log(courseResponse.data);
			setIsSuccess(true);
			setTimeout(() => {
				router.push('/admin/course');
			}, 1000);
		} catch (err) {
			console.log(err);
		}
	};

	const setCourseData = async () => {
		const data = await getCourseByID(id);
		const course = data.course;
		setTitle(course.title);
		setDesc(course.description);
		setPrice(course.price.toString());
		setInstructor(course.instructor);
		setSelectedOption(JSON.parse(course.category));
		setSelectedThumbnail(course.thumbnail);
	};

	useEffect(() => {
		setCourseData();
	}, []);

	return (
		<>
			{/* Success alert */}
			{isSuccess ? <SuccesAlert /> : ''}
			{/* Success alert end */}
			<div className='container px-4 mx-auto flex flex-col justify-center items-center'>
				<div className='max-w-4xl w-full border rounded p-4'>
					<h1 className='text-4xl text-center'>Course Form</h1>
					<h2 className='text-xl mt-8'>Course Information</h2>
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
						{/* Price */}
						<FormControl isRequired>
							<FormLabel>Course price</FormLabel>
							<Input value={price} onChange={(e) => setPrice(e.target.value)} />
						</FormControl>
						{/* Instructor */}
						<FormControl isRequired>
							<FormLabel>Course Instructor</FormLabel>
							<Input value={instructor} onChange={(e) => setInstructor(e.target.value)} />
						</FormControl>
						{/* Select */}
						<FormControl isRequired>
							<FormLabel>Course Category</FormLabel>
							{/* Select does not rerender when selectedOption state change. So dont render it until state value is set */}
							{selectedOption && <Select defaultValue={selectedOption} isMulti onChange={setSelectedOption} options={options} />}
						</FormControl>
						{/* Thumbnail upload */}
						<FormControl isRequired>
							<FormLabel>Upload Thumbnail</FormLabel>
							<div {...getRootProps()}>
								<input {...getInputProps()} />
								{isDragActive ? <p>Drop the files here ...</p> : <p>Drag 'n' drop some files here, or click to select files</p>}
							</div>
							<img src={isDropzoneFile ? URL.createObjectURL(selectedThumbnail) : `http://localhost:5000/${selectedThumbnail}`} alt='selected thumbnail' className='aspect-square w-[10rem]' />
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
