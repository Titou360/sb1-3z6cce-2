import { Button } from './ui/button';

const CallToAction = () => {
  return (
    <section className="bg-primary py-16">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">
          Ready to Optimize Your Hotel Management?
        </h2>
        <p className="text-xl text-white mb-8">
          Sign up now and experience the power of RoomCare.Pro
        </p>
        <Button size="lg" variant="secondary" asChild>
          <a href="/signup">Get Started</a>
        </Button>
      </div>
    </section>
  );
};

export default CallToAction;