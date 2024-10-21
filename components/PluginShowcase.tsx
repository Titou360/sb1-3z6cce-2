'use client';

import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Splide, SplideSlide, SplideTrack } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';

const plugins = [
  {
    name: 'Housekeeping Manager',
    description: 'Efficiently manage room cleaning schedules and tasks.',
    image: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
  },
  {
    name: 'Maintenance Tracker',
    description: 'Keep track of maintenance requests and schedule repairs.',
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
  },
  {
    name: 'Guest Communication',
    description: 'Streamline guest communication and manage requests.',
    image: 'https://images.unsplash.com/photo-1576267423048-15c0040fec78?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
  },
];

const PluginShowcase = () => {
  return (
    <section className="bg-white py-16" id="learn-more">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Our Powerful Plugins</h2>
        <Splide
          options={{
            type: 'loop',
            perPage: 3,
            perMove: 1,
            gap: '1rem',
            pagination: false,
            arrows: true,
            autoplay: true,
            interval: 5000,
            pauseOnHover: true,
            breakpoints: {
              640: {
                perPage: 1,
              },
              768: {
                perPage: 2,
              },
            },
          }}
          hasTrack={false}
        >
          <div className="splide__arrows">
            <button className="splide__arrow splide__arrow--prev">Prev</button>
            <button className="splide__arrow splide__arrow--next">Next</button>
          </div>
          <SplideTrack>
            {plugins.map((plugin, index) => (
              <SplideSlide key={index}>
                <Card>
                  <CardHeader>
                    <CardTitle>{plugin.name}</CardTitle>
                    <CardDescription>{plugin.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Image
                      src={plugin.image}
                      alt={plugin.name}
                      width={400}
                      height={225}
                      className="rounded-md"
                    />
                  </CardContent>
                </Card>
              </SplideSlide>
            ))}
          </SplideTrack>
          <div className="splide__progress mt-4">
            <div className="splide__progress__bar" />
          </div>
        </Splide>
      </div>
    </section>
  );
};

export default PluginShowcase;