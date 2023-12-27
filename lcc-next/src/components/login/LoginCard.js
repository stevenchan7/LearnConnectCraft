'use client';

import { FormControl, FormLabel, FormErrorMessage, FormHelperText, Input } from '@chakra-ui/react';
import { Button } from '@chakra-ui/react';
import PasswordInput from './PasswordInput';

export default function LoginCard() {
	return (
		<div className='w-full h-full p-4 space-y-8 border'>
			<h1 className='text-4xl text-center'>Sign up to find work you love</h1>
			<form action='' className='space-y-2'>
				{/* First last name */}
				<FormControl isRequired>
					<FormLabel>Enter name</FormLabel>
					<div className='flex flex-wrap md:flex-nowrap justify-center items-center gap-2'>
						<FormControl isRequired>
							<Input placeholder='First name' />
						</FormControl>
						<FormControl isRequired>
							<Input placeholder='Last name' />
						</FormControl>
					</div>
				</FormControl>
				{/* Email */}
				<FormControl isRequired>
					<FormLabel>Email address</FormLabel>
					<Input type='email' />
				</FormControl>
				{/* Password */}
				<FormControl isRequired>
					<FormLabel>Password</FormLabel>
					<PasswordInput />
				</FormControl>

				<div className='text-center'>
					<Button colorScheme='purple' className='mx-auto'>
						Register
					</Button>
				</div>
			</form>
		</div>
	);
}
