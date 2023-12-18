export default function Benefit() {
	return (
		<div className='container mx-auto my-32 px-4 flex justify-center items-center lg:h-screen lg:my-0'>
			<div className='flex justify-center items-center gap-8'>
				<div className='hidden basis-1/3 md:block'>
					<img src='/benefit-image.png' alt='benefit image' />
				</div>
				<div className='basis-2/3 space-y-8'>
					<h2 className='text-clamp text-center font-medium md:text-start'>Come and Join US. Everything is The Best Part</h2>
					<div className='space-y-4'>
						<div className='flex gap-2'>
							<img src='/benefit-icon-1.svg' alt='' />
							<p>
								<span className='font-medium'>No Cost to Join</span>
								<br />
								Register now and browse talents and jobs for free
							</p>
						</div>
						<div className='flex gap-2'>
							<img src='/benefit-icon-2.svg' alt='' />
							<p>
								<span className='font-medium'>Start your career now</span>
								<br />
								Start your first job, gain more experience before you graduate.
							</p>
						</div>
						<div className='flex gap-2'>
							<img src='/benefit-icon-3.svg' alt='' />
							<p>
								<span className='font-medium'>Learn from The Experts</span>
								<br />
								We provide free course to improve your technical and soft skills
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
