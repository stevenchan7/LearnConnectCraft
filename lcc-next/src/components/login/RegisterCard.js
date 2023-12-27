'use client';

const axios = require('axios');

import { FormControl, FormLabel, Input } from '@chakra-ui/react';
import { Button } from '@chakra-ui/react';
import { Alert, AlertIcon } from '@chakra-ui/react';
import PasswordInput from './PasswordInput';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterCard() {
	const [firstname, setFirstname] = useState('');
	const [lastname, setLastname] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [isAlert, setIsAlert] = useState(false);
	const [isSuccess, setIsSuccess] = useState(false);
	const router = useRouter();

	const SuccesAlert = () => {
		return (
			<Alert status='success'>
				<AlertIcon />
				Register successfully!
			</Alert>
		);
	};

	const ErrorAlert = () => {
		return (
			<Alert status='error'>
				<AlertIcon />
				Email already used
			</Alert>
		);
	};

	const handleFormSubmit = async (e) => {
		try {
			e.preventDefault();
			const { data } = await axios.post('http://localhost:5000/auth/register', {
				firstname: firstname,
				lastname: lastname,
				email: email,
				password: password,
			});
			setIsAlert(true);
			setIsSuccess(true);
			// Push to login page after 2s
			setTimeout(() => {
				router.push('/login');
			}, 1000);
		} catch (err) {
			setIsAlert(true);
			console.log(err);
		}
	};

	return (
		<>
			{isAlert ? isSuccess ? <SuccesAlert /> : <ErrorAlert /> : ''}
			<div className='w-full h-full p-4 space-y-8 border'>
				<h1 className='text-4xl text-center'>Sign up to find work you love</h1>
				<form onSubmit={(e) => handleFormSubmit(e)} className='space-y-2'>
					{/* First last name */}
					<FormControl isRequired>
						<FormLabel>Enter name</FormLabel>
						<div className='flex flex-wrap md:flex-nowrap justify-center items-center gap-2'>
							<FormControl isRequired>
								<Input onChange={(e) => setFirstname(e.target.value)} placeholder='First name' />
							</FormControl>
							<FormControl isRequired>
								<Input onChange={(e) => setLastname(e.target.value)} placeholder='Last name' />
							</FormControl>
						</div>
					</FormControl>
					{/* Email */}
					<FormControl isRequired>
						<FormLabel>Email address</FormLabel>
						<Input onChange={(e) => setEmail(e.target.value)} type='email' />
					</FormControl>
					{/* Password */}
					<FormControl isRequired>
						<FormLabel>Password</FormLabel>
						<PasswordInput onChange={(e) => setPassword(e.target.value)} />
					</FormControl>

					<div className='text-center'>
						<Button colorScheme='purple' className='mx-auto' type='submit'>
							Register
						</Button>
					</div>
				</form>
			</div>
		</>
	);
}
