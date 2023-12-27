export default function CourseReviewCard() {
	return (
		<div className='flex justify-center items-center max-w-[40rem] p-4 gap-4 mx-auto bg-white shadow-lg'>
			<div className='text-center'>
				<div className='w-[80px] h-[80px] rounded-full overflow-hidden'>
					<img src='/capybara.png' alt='capybara' />
				</div>
				<p>Capybara</p>
				<p>Japan</p>
			</div>
			<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
		</div>
	);
}
