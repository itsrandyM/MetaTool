import React from 'react';
import {useNavigate} from 'react-router-dom'
import './Success.css';

const SuccessPage = () => {
  const navigate = useNavigate()

  const handleDoneClick = () => {
    navigate('/generate')
    //window.location.href = 'home';
  };

  return (
    <div className="success-container">
      <div className="success-content">
        <div className="success-icon">&#10004;</div>
        <h2>Success!</h2>
        <p className='succes'>Your submission was successful.</p>
        <button className="done-button" onClick={handleDoneClick}>
          Done
        </button>
      </div>
    </div>
  );
};

export default SuccessPage;

{/*import Info from '../../../public/images/information.png'
import Image from 'next/image'




function Learner() {
  return (
<div>
<section className='hidden md:flex flex-col w-full md:text-center p-8'>
					<h1 className='text-gray-700'> Learner's journey</h1>
					<div className="relative flex flex-col items-center mt-4 sm:flex-row sm:mt-60">
						<article className='rounded-lg p-4 w-64 h-auto my-8 relative cursor-pointer transition-opacity hover:opacity-100 bg-primary'>
							<div className='my- mx-12 flex justify-center items-center flex-col gap-8'>
								<p className='font-bold'>Onboarding</p>
								<Image
									src={Info}
									alt='image'
									width='35'
									height='35'
								/>
							</div>
							<div className='absolute opacity-0 w-full left-0 p-8 transition-all duration-100 ease-in border-b-1 border-l-1 border-r-1 rounded-b-lg'>
								<p>
									We partner with top-performing high schools in Kenya and
									Ethiopia, and onboard to infrastructure solutions that allow
									them to issue Verifiable Credentials.
								</p>
							</div>
						</article>
						<article className='rounded-lg p-4 w-64 h-auto my-8 relative cursor-pointer transition-opacity hover:opacity-100 bg-primary'>

							<div className='flex-between'>
								<p>Intro Course</p>
								<Image
									src={Info}
									alt='image'
									width='35'
									height='35'
								/>
							</div>
							<div className='home__step--content home__step--content-2'>
								<p>
									We offer a 1-week long mobile-phone-based Introductory Course
									in Python based on open-source material from Harvard
									University.
								</p>
							</div>
						</article>
						<img
							src='/static/images/arrow-1.png'
							alt='arrow one'
							className='home__arrows home__arrows--1'
						/>
						<img
							src='/static/images/arrow-2.png'
							alt='arrow two'
							className='home__arrows home__arrows--2'
						/>
					</div>
					<div className='home__step alternate'>
												<article className='rounded-lg p-4 w-64 h-auto my-8 relative cursor-pointer transition-opacity hover:opacity-100 bg-primary'>

							<div className='flex-between'>
								<p>Access Scholarships</p>
								<Image
									src={Info}
									alt='image'
									width='35'
									height='35'
								/>
							</div>
							<div className='home__step--content home__step--content-3'>
								<p>
									Top performers of the Introductory Course are given
									Scholarships to attend the 12-week DirectEd Bootcamp.
								</p>
							</div>
						</article>
												<article className='rounded-lg p-4 w-64 h-auto my-8 relative cursor-pointer transition-opacity hover:opacity-100 bg-primary'>

							<div className='flex-between'>
								<p>Coding Bootcamp</p>
								<Image
									src={Info}
									alt='image'
									width='35'
									height='35'
								/>
							</div>
							<div className='home__step--content home__step--content-4'>
								<p>
									For each partner school, we set up one
									<strong> Access scholarship</strong> pool in order to raise funds
									to support students from low-income families through the
									bootcamp.
								</p>
							</div>
						</article>
						<img
							src='/static/images/arrow-3.png'
							alt='arrow three'
							className='home__arrows home__arrows--3'
						/>
						<img
							src='/static/images/arrow-4.png'
							alt='arrow four'
							className='home__arrows home__arrows--4'
						/>
					</div>
					<div className='home__step'>
												<article className='rounded-lg p-4 w-64 h-auto my-8 relative cursor-pointer transition-opacity hover:opacity-100 bg-primary'>

							<div className='flex-between'>
								<p>Study-Internship</p>
								<Image
									src={Info}
									alt='image'
									width='35'
									height='35'
								/>
							</div>
							<div className='home__step--content home__step--content-5'>
								<p>
									Graduates of the DirectEd Bootcamp join the Graduate
									Programme; either joining our study-internship program, or an
									external elite coding bootcamp.
								</p>
							</div>
						</article>
												<article className='rounded-lg p-4 w-64 h-auto my-8 relative cursor-pointer transition-opacity hover:opacity-100 bg-primary'>

							<div className='flex-between'>
								<p>Recontribution!</p>
								<Image
									src={Info}
									alt='image'
									width='35'
									height='35'
								/>
							</div>
							<div className='home__step--content home__step--content-6'>
								<p>
									As successful scholars find employment, the alumni group of
									the partner high school will ask them to contribute to the
									next cohort of students.
								</p>
							</div>
						</article>
						<img
							src='/static/images/arrow-5.png'
							alt='arrow five'
							className='home__arrows home__arrows--5'
						/>
					</div>
				</section>
</div>
  )
}

export default Learner*/}
