// import { useState } from 'react';
import RegisterCard from '../../../components/login/RegisterCard';

export default function Login() {
	// const [flash, setFlash] = useState(null);

	return (
		<div className='h-screen flex justify-center items-center'>
			<div className='basis-2/5 w-full h-full bg-cover bg-right brightness-50' style={{ backgroundImage: "url('/login.jpg')" }} />
			<div className='basis-3/5 w-full h-full flex flex-col justify-center items-center p-8'>
				<RegisterCard />
			</div>
		</div>
	);
}
