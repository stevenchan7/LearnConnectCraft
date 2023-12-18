import Benefit from '@/components/home/Benefit';
import CourseCarousel from '@/components/home/CourseCarousel';
import Hero from '@/components/home/Hero';
import JobCategory from '@/components/home/JobCategory';
import Image from 'next/image';

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
