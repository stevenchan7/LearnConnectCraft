'use client';

// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y, EffectCoverflow } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-coverflow';
import CourseCard from '../course/CourseCard';
import { getCourse } from '../../utils/course.util';
import { useEffect, useState } from 'react';

export default function RecommendedCourse() {
	const [courses, setCourses] = useState([]);

	const setCoursesData = async () => {
		try {
			const data = await getCourse();
			setCourses(data.courses);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		setCoursesData();
	}, []);

	return (
		<div>
			<h2 className='font-bold text-lg'>Recommeded for you</h2>
			<Swiper
				// install Swiper modules
				effect='coverflow'
				modules={[Navigation, EffectCoverflow]}
				slidesPerView={1}
				coverflowEffect={{
					rotate: 25,
					slideShadows: false,
				}}
				breakpoints={{
					1024: {
						slidesPerView: 3,
					},
				}}
				navigation
			>
				{courses.length > 0 &&
					courses.map((course, index) => (
						<SwiperSlide key={index}>
							<CourseCard course={course} rating={4} />
						</SwiperSlide>
					))}
			</Swiper>
		</div>
	);
}
