export default function CourseCategoryCard() {
	return (
		<a href='' className='w-full h-[128px] border'>
			<div className='h-full flex gap-4'>
				<div className='h-full'>
					<img src='/data-science.png' alt='data science' />
				</div>
				<div className='py-4'>
					<p>Data Science</p>
					<p>469 course</p>
				</div>
			</div>
		</a>
	);
}
