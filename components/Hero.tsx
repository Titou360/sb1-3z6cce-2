import Image from 'next/image';
import { Button } from './ui/button';

const Hero = () => {
  return (
    <section className="bg-gray-50">
      <div className="container mx-auto px-4 py-16 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-8 md:mb-0">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Streamline Your Hotel Management
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            RoomCare.Pro offers powerful tools to optimize your hotel operations and enhance guest experiences.
          </p>
          <Button size="lg" asChild>
            <a href="#learn-more">Learn More</a>
          </Button>
        </div>
        <div className="md:w-1/2">
          <Image
            src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
            alt="Hotel Management"
            width={600}
            height={400}
            className="rounded-lg shadow-md"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;