import CourseCarousel from '../../components/home/CourseCarousel';
import Hero from '../../components/home/Hero';
import JobCategory from '../../components/home/JobCategory';
import Benefit from '../../components/home/Benefit';

export default function Home() {
	return (
		<>
			<Hero />
			<Benefit />
			<JobCategory />
			<CourseCarousel />
		</>
	);
}
