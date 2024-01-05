'use client';

// import Swiper core and required modules
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import CourseCard from '../course/CourseCard';
import { useEffect, useState } from 'react';
import { getCourse } from '../../utils/course.util';

export default function TopCourse() {
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
			<h2 className='font-bold text-lg'>Top courses</h2>
			<Swiper
				// install Swiper modules
				modules={[Navigation]}
				slidesPerView={1}
				spaceBetween={50}
				navigation
				breakpoints={{
					1536: {
						slidesPerView: 6,
					},
					1280: {
						slidesPerView: 5,
					},
					1024: {
						slidesPerView: 4,
					},
					768: {
						slidesPerView: 2,
					},
				}}
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
