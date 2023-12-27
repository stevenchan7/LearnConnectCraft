'use client';

import { FormControl, FormLabel, FormErrorMessage, FormHelperText, Input } from '@chakra-ui/react';
import { Button } from '@chakra-ui/react';
import PasswordInput from '../../../components/login/PasswordInput';

export default function page() {
	return (
		<div className='w-screen h-screen container px-4 mx-auto flex justify-center items-center'>
			<div className='w-[30rem] space-y-8 border rounded p-4'>
				<h1 className='text-4xl text-center'>Welcome back!</h1>
				<form action='' className='space-y-2'>
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
							Login
						</Button>
					</div>
				</form>
			</div>
		</div>
	);
}
