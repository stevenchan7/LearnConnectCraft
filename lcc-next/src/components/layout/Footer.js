import Link from 'next/link';

export default function Footer() {
	return (
		<div className='relative py-8'>
			<div className='absolute top-0 left-0 -z-50 w-full h-full bg-gradient-to-br from-[#A78EEC] from-30%  via-[#4D42C6] via-70% to-[#2F71D4] to-100%'></div>
			<div className='absolute top-0 left-1/2 -translate-x-1/2 -z-50 w-full h-full bg-no-repeat bg-cover bg-center' style={{ backgroundImage: "url('/hiasan-sinar.svg')" }}></div>
			<div className='container mx-auto px-4 space-y-8 text-primary_white'>
				<div className='flex'>
					<div className='basis-3/5 flex justify-center items-center gap-4'>
						<img src='/lcc-logo.png' alt='logo' />
						<p>
							We're here to help students kickstart their careers in any field. Find your dream job in any field. Our platform connects talented seekers with the right people. Upgrade your skills with
							our courses and community. Join now!
						</p>
					</div>
					<ul className='m-auto'>
						<p>Quick links</p>
						<li>
							<Link href=''>Find jobs</Link>
						</li>
						<li>
							<Link href=''>Find talents</Link>
						</li>
						<li>
							<Link href=''>Courses</Link>
						</li>
						<li>
							<Link href=''>Community</Link>
						</li>
						<li>
							<Link href=''>Why us?</Link>
						</li>
					</ul>
				</div>

				<div className='flex items-center flex-col justify-center md:flex-row  md:justify-between'>
					<p>© 2023 NamaPerusahaan & Develop with ❤️ by Team.</p>
					<div className='flex justify-center items-center gap-2'>
						<img src='/twitter-logo.png' alt='twitter logo' />
						<img src='/fb-logo.png' alt='twitter logo' />
						<img src='/ig-logo.png' alt='twitter logo' />
						<img src='/linkedin-logo.png' alt='twitter logo' />
						<img src='/yt-logo.png' alt='twitter logo' />
						<img src='/tele-logo.png' alt='twitter logo' />
					</div>
				</div>
			</div>
		</div>
	);
}
