import Header from '../components/Header';
import Hero from '../components/Hero';
import PluginShowcase from '../components/PluginShowcase';
import CallToAction from '../components/CallToAction';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Hero />
        <PluginShowcase />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
}