'use client';

// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import CourseCard from '../course/CourseCard';
import { useEffect, useState } from 'react';
import { getCourse } from '../../utils/course.util';

export default function CourseCarousel() {
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
		<div className='container mx-auto my-32 px-4 flex justify-center items-center lg:h-screen lg:my-0'>
			<div className='w-full space-y-4'>
				<h2 className='text-clamp text-center font-medium md:text-start'>
					Top <span className='text-[#6042C6]'>courses</span> for you
				</h2>
				<Swiper
					// install Swiper modules
					modules={[Navigation]}
					slidesPerView={1}
					wspaceBetween={50}
					navigation
					breakpoints={{
						1280: {
							slidesPerView: 4,
						},
						1024: {
							slidesPerView: 3,
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
		</div>
	);
}
