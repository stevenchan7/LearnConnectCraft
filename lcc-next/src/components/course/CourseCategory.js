import CourseCategoryCard from './CourseCategoryCard';

export default function CourseCategory() {
	return (
		<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
			<CourseCategoryCard />
			<CourseCategoryCard />
			<CourseCategoryCard />
			<CourseCategoryCard />
			<CourseCategoryCard />
			<CourseCategoryCard />
			<CourseCategoryCard />
			<CourseCategoryCard />
		</div>
	);
}
