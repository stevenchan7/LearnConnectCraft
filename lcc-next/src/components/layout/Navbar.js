'use client';

import { useEffect, useState } from 'react';
import { Spin as Hamburger } from 'hamburger-react';
import { usePathname, useRouter } from 'next/navigation';
import { useToken } from '../../app/hooks/useToken';
import { Avatar, AvatarBadge, AvatarGroup } from '@chakra-ui/react';
import { Menu, MenuButton, MenuList, MenuItem, MenuItemOption, MenuGroup, MenuOptionGroup, MenuDivider } from '@chakra-ui/react';
import { Button } from '@chakra-ui/react';
import axios from 'axios';

const ChevronDownIcon = () => {
	return (
		<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-6 h-6'>
			<path strokeLinecap='round' strokeLinejoin='round' d='m19.5 8.25-7.5 7.5-7.5-7.5' />
		</svg>
	);
};

export default function Navbar() {
	const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
	const [isScroll, setIsScroll] = useState(false);
	const isLoggedIn = useToken();
	const router = useRouter();

	const pathname = usePathname();
	const isHome = pathname === '/';

	const handleLogout = async (e) => {
		try {
			e.preventDefault();
			localStorage.clear();
			router.push('/login');
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		// Add scroll event listener to the window
		const handleScroll = () => {
			// Check if the scroll position is greater than a certain value (e.g., 50px)
			const scrollPosition = window.scrollY;
			setIsScroll(scrollPosition > 50);
		};

		// Attach the event listener when the component mounts
		window.addEventListener('scroll', handleScroll);

		// Clean up the event listener when the component unmounts
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	return (
		<header className={`${isScroll | !isHome ? 'glass' : ''} px-4 py-2 fixed top-0 w-full z-50`} id='nav'>
			<div className='w-full flex justify-between items-center h-16'>
				{/* Logo  */}
				<a rel='noopener noreferrer' data-href='/index.html' aria-label='Back to homepage' className='flex items-center p-2'>
					<img src='/logo.png' alt='osr logo' className='w-32' />
				</a>
				{/* Nav links  */}
				<ul className={`items-stretch hidden gap-3 ${isScroll | !isHome ? 'glastext-primary_black' : 'text-primary_white'} font-medium lg:flex`}>
					<li className='flex'>
						<a href='/' className='flex items-center px-4 -mb-1 border-b-2 border-transparent'>
							Find Talent
						</a>
					</li>
					<li className='flex'>
						<a href='/' className='flex items-center px-4 -mb-1 border-b-2 border-transparent'>
							Find Work
						</a>
					</li>
					<li className='flex'>
						<a href='/course' className='flex items-center px-4 -mb-1 border-b-2 border-transparent'>
							Course
						</a>
					</li>
					<li className='flex'>
						<a href='/' className='flex items-center px-4 -mb-1 border-b-2 border-transparent'>
							Community
						</a>
					</li>
					<li className='flex'>
						<a href='/' className='flex items-center px-4 -mb-1 border-b-2 border-transparent'>
							Why Us?
						</a>
					</li>
					{isLoggedIn ? (
						<li className='flex ms-8'>
							<Menu>
								<MenuButton>
									<div className='flex justify-center items-center'>
										<Avatar name='Steven Chan' src={'sdasd'} />
										<ChevronDownIcon />
									</div>
								</MenuButton>
								<MenuList className='!text-primary_black'>
									<MenuItem>
										<form onSubmit={(e) => handleLogout(e)} className='w-full'>
											<Button colorScheme='purple' type='submit' className='w-full'>
												Logout
											</Button>
										</form>
									</MenuItem>
								</MenuList>
							</Menu>
						</li>
					) : (
						<>
							<li className='flex ms-8'>
								<a href='/login' className='flex items-center px-4 -mb-1 border-b-2 border-transparent'>
									Log In
								</a>
							</li>
							<li className='flex'>
								<a href='/register' className='flex items-center px-5 py-3 bg-[#216FE3] text-primary_white rounded-full hover:scale-110'>
									Sign Up
								</a>
							</li>
						</>
					)}
				</ul>
				{/* Hamburger button */}
				<span className='cursor-pointer lg:hidden'>
					<Hamburger toggled={isHamburgerOpen} toggle={setIsHamburgerOpen} />
				</span>
			</div>

			{/* Dropdown links on md below */}
			<ul className={`w-full flex flex-col justify-between lg:hidden ${isHamburgerOpen ? 'h-[17rem] p-4' : 'h-0'} overflow-hidden transition-[height] ease-in-out duration-300 bg-white`}>
				<li className='flex'>
					<a href='/' className='flex items-center px-4 -mb-1 border-b-2 border-transparent'>
						Find Talent
					</a>
				</li>
				<li className='flex'>
					<a href='/' className='flex items-center px-4 -mb-1 border-b-2 border-transparent'>
						Find Work
					</a>
				</li>
				<li className='flex'>
					<a href='/course' className='flex items-center px-4 -mb-1 border-b-2 border-transparent'>
						Course
					</a>
				</li>
				<li className='flex'>
					<a href='/' className='flex items-center px-4 -mb-1 border-b-2 border-transparent'>
						Community
					</a>
				</li>
				<li className='flex'>
					<a href='/' className='flex items-center px-4 -mb-1 border-b-2 border-transparent'>
						Why Us?
					</a>
				</li>
				<li className='flex'>
					<ul className='flex gap-3 justify-center items-center'>
						<li>
							<a href='/login' className='flex items-center px-4'>
								Log In
							</a>
						</li>
						<li>
							<a href='/register' className='flex items-center px-5 py-3 bg-[#216FE3]/40 rounded-full hover:scale-110'>
								Sign Up
							</a>
						</li>
					</ul>
				</li>
			</ul>
		</header>
	);
}
