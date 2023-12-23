import { Input, Button, Textarea } from '@nextui-org/react';
import { FaSquareInstagram, FaSquareFacebook, FaSquarePhone, FaLocationDot } from 'react-icons/fa6';
import { FiMail, FiUser } from 'react-icons/fi';
import { MdEmail } from "react-icons/md";

export default function Footer() {
  return (
    <div className='w-full bg-primary min-h-[300px] py-6'>
      <div className='container mx-auto p-6 h-full w-full w-1/2 flex-grow flex mt-5'>
        {/*About us*/}
        <div className='flex flex-col md:flex-row gap-5 w-full lg:gap-24'>
          <div className='flex flex-col gap-4 w-full lg:w-[50%]'>
            <h3 className='text-secondary text-2xl font-semibold'>ABOUT US</h3>
            <div className='text-white text-justify'>
              <p className='mb-5'>
                Sakura Pantry is dedicated to delivering the highest quality Japanese ingredients to
                homes across Australia. We take pride in offering carefully selected items, and we
                are delighted to assist you in recreating your favorite Japanese dishes with a touch
                of luxury in the comfort of your own home.
              </p>
              <div className='flex items-center gap-2'>
                <span>
                  <FaSquarePhone className='w-5 h-5 text-secondary' />
                </span>
                <span>05 7564 6679 | 07 7524 7940</span>
              </div>
              <div className='flex items-center gap-2'>
                <span>
                  <MdEmail className='w-5 h-5 text-secondary' />
                </span>
                <span>sakurapantry.au@email.com</span>
              </div>
              <div className='flex items-center gap-2'>
                <span>
                  <FaLocationDot className='w-5 h-5 text-secondary' />
                </span>
                <span>6451 O'connell Meadow, Sydney, NSW 3000 </span>
              </div>
            </div>
          </div>
          {/*Contact form*/}
          <div className='flex w-full flex-col gap-4 lg:w-[50%]'>
            <h3 className='text-secondary text-2xl font-semibold'>CONTACT US</h3>
            <Input
              label='Your name'
              type='text'
              endContent={<FiUser className='h-6 w-6 text-default-400 self-center' />}
            />
            <Input
              label='Your email'
              type='email'
              endContent={<FiMail className='h-6 w-6 text-default-400 self-center' />}
            />
            <Textarea label='Questions' type='text' className='h-auto' />
            {/*Social Media Icons and Button*/}
            <div className='flex justify-between'>
              <div className='flex'>
                <a href='https://www.facebook.com/'>
                  <FaSquareFacebook className='text-secondary w-9 h-9 mr-4' />
                </a>
                <a href='https://www.instagram.com/'>
                  <FaSquareInstagram className='text-secondary w-9 h-9' />
                </a>
              </div>
              <Button color='secondary' variant='ghost' className='font-semibold w-1/3'>
                Send Your Enquiry
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
