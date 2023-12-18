export default function Hero() {
	return (
		<div className='relative h-screen flex overflow-x-hidden'>
			<div className='absolute top-0 left-0 -z-50 w-full h-full bg-gradient-to-br from-[#A78EEC] from-30%  via-[#4D42C6] via-70% to-[#2F71D4] to-100%'></div>
			<div className='absolute top-0 left-1/2 -translate-x-1/2 -z-50 w-full h-full bg-no-repeat bg-cover bg-center' style={{ backgroundImage: "url('/hiasan-sinar.svg')" }}></div>
			{/* Hero content */}
			<div className='relative w-full h-full container mx-auto px-4 flex justify-center items-center lg:justify-start'>
				{/* Left */}
				<div className='basis-1/2 text-center lg:translate-x-0 lg:text-start'>
					<div className='flex justify-center items-center'>
						<div className='space-y-8'>
							<h1 className='text-clamp text-primary_white font-bold'>
								<span className='italic'>Find Work</span> and <span className='italic'>Talent</span> For Your Needs in One Spot, Right Away!{' '}
							</h1>
							<form action='' className='flex justify-center items-center h-[40px]'>
								<input type='text' className='w-full h-full' />
								<button type='submit' className='h-full w-[48px] flex justify-center items-center bg-[#A78EEC]'>
									<img src='/search-icon.svg' alt='search icon' className='w-1/2' />
								</button>
							</form>
						</div>
					</div>
				</div>
				{/* Image monyet */}
				<div className='absolute bottom-0 left-1/2 hidden lg:block'>
					<img src='/monyet-hero.png' alt='monyet kesayangan' />
				</div>
			</div>
		</div>
	);
}
