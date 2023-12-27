import CourseCategory from '@/components/course/CourseCategory';
import CourseReview from '@/components/course/CourseReview';
import RecommendedCourse from '@/components/course/RecommendedCourse';
import TopCourse from '@/components/course/TopCourse';

export default function CourseHome() {
	return (
		<div className='container px-4 mx-auto mt-[128px] space-y-8'>
			<h1 className='text-4xl text-center'>What to learn next</h1>
			<RecommendedCourse />
			<TopCourse />
			<CourseCategory />
			<CourseReview />
		</div>
	);
}
