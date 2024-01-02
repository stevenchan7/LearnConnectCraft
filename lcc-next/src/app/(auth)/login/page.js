'use client';

import { FormControl, FormLabel, Input } from '@chakra-ui/react';
import { Alert, AlertIcon } from '@chakra-ui/react';
import { Button } from '@chakra-ui/react';
import PasswordInput from '../../../components/login/PasswordInput';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
const axios = require('axios');

export default function page() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [isError, setIsError] = useState(false);
	const router = useRouter();

	const handleFormSubmit = async (e) => {
		try {
			e.preventDefault();
			const { data } = await axios.post('http://localhost:5000/auth/login', {
				email: email,
				password: password,
			});

			// Set info at localstorage
			localStorage.setItem('expAt', Date.now() + data.expiresIn * 1000);
			localStorage.setItem('token', data.token);
			localStorage.setItem('user', JSON.stringify(data.data));

			// Push to login page after 2s
			setTimeout(() => {
				router.push('/');
			}, 1000);
		} catch (err) {
			setIsError(true);
			console.log(err);
		}
	};

	const ErrorAlert = () => {
		return (
			<Alert status='error' className='!w-[30rem]'>
				<AlertIcon />
				Email or password incorrect
			</Alert>
		);
	};

	return (
		<div className='w-screen h-screen container px-4 mx-auto flex flex-col justify-center items-center'>
			{isError ? <ErrorAlert /> : ''}
			<div className='w-[30rem] space-y-8 border rounded p-4'>
				<h1 className='text-4xl text-center'>Welcome back!</h1>
				<form onSubmit={(e) => handleFormSubmit(e)} className='space-y-2'>
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
						<Button colorScheme='purple' type='submit' className='mx-auto'>
							Login
						</Button>
					</div>
				</form>
			</div>
		</div>
	);
}
