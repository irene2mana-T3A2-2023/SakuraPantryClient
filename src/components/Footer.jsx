import { Input, Button, Textarea } from '@nextui-org/react';
import { FaSquareInstagram } from 'react-icons/fa6';
import { FaSquareFacebook } from 'react-icons/fa6';
import { FiMail, FiUser } from 'react-icons/fi';

export default function Footer() {
  return (
    <div className='w-full bg-primary min-h-[300px] py-6'>
      <div className='container mx-auto p-6 h-full w-full max-w-[1536px] flex-grow flex'>
        {/*About us*/}
        <div className='flex flex-col md:flex-row gap-5 w-full lg:gap-14'>
          <div className='flex flex-col gap-4 w-full lg:w-[60%]'>
            <h3 className='text-secondary text-lg font-semibold'>ABOUT US</h3>
            <p className='text-white text-justify'>
              Sakura Pantry is dedicated to delivering the highest quality Japanese ingredients to
              homes across Australia. We take pride in offering carefully selected items, and we are
              delighted to assist you in recreating your favorite Japanese dishes with a touch of
              luxury in the comfort of your own home.
            </p>
          </div>
          {/*Contact form*/}
          <div className='flex w-full flex-col gap-4 lg:w-[40%]'>
            <h3 className='text-secondary text-lg font-semibold'>CONTACT US</h3>
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
                  <FaSquareFacebook className='text-white w-11 h-11 mr-4' />
                </a>
                <a href='https://www.instagram.com/'>
                  <FaSquareInstagram className='text-white w-11 h-11' />
                </a>
              </div>
              <Button color='secondary'>Send</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
