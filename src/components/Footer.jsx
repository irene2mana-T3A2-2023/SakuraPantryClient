import React from 'react';
import { Card, CardHeader, CardBody, Input, Button } from '@nextui-org/react';
import { FaSquareInstagram } from 'react-icons/fa6';
import { FaSquareFacebook } from 'react-icons/fa6';
import { FiMail, FiUser } from 'react-icons/fi';

export default function Footer() {
  return (
    <div className='w-full bg-primary min-h-[300px]'>
      <div className='container mx-auto p-6 h-full w-full max-w-[1536px] flex-grow flex'>
        {/*About us*/}
        <div className='flext-col md:flex'>
          <Card className='w-full bg-primary shadow-none'>
            <CardHeader className='flex gap2'>
              <p className='text-secondary'>ABOUT US</p>
            </CardHeader>
            <CardBody>
              <p className='text-white text-justify'>
                Sakura Pantry is dedicated to delivering the highest quality Japanese ingredients to
                homes across Australia. We take pride in offering carefully selected items, and we
                are delighted to assist you in recreating your favorite Japanese dishes with a touch
                of luxury in the comfort of your own home.
              </p>
            </CardBody>
          </Card>
          {/*Contact form*/}
          <div className='flex w-full flex-col gap-5 md:ml-10 lg:ml-20'>
            <p className='text-secondary'>Contact us</p>
            <Input
              label='Your name'
              type='text'
              className='h-8'
              startContent={
                <FiUser className='h-6 w-6 text-default-400 absolute right-2 top-1/2 transform -translate-y-1/2' />
              }
            />
            <Input
              label='Your email'
              type='email'
              className='h-8'
              startContent={
                <FiMail className='h-6 w-6 text-default-400 absolute right-2 top-1/2 transform -translate-y-1/2' />
              }
            />
            <Input label='Questions' type='text' className='h-16' />
            {/*Social Media Icons and Button*/}
            <div className='flex'>
              <FaSquareFacebook className='text-[#4267B2] w-8 h-8 mr-5' />
              <FaSquareInstagram className='text-[#E4405F] w-8 h-8' />
              <Button className='text-#b8bfdb bg-secondary w-8 h-8 font-bold py-2 px-4 ml-auto'>
                Send
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
