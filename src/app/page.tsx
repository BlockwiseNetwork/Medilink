import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { CheckCircle, HeartPulse, MessageSquare, ShieldCheck } from 'lucide-react';
import placeHolderImages from '@/lib/placeholder-images.json';

const features = [
  {
    icon: <HeartPulse className="w-8 h-8 text-primary" />,
    title: 'Verified Doctors',
    description: 'Connect with board-certified doctors across various specialties, ensuring you receive expert care.',
    image: placeHolderImages.placeholderImages.find(p => p.id === "1"),
    hint: 'doctor smiling'
  },
  {
    icon: <MessageSquare className="w-8 h-8 text-primary" />,
    title: 'AI Health Assistant',
    description: 'Get instant answers to your health questions from Medibot, our intelligent AI-powered health assistant.',
    image: placeHolderImages.placeholderImages.find(p => p.id === "2"),
    hint: 'robot medical'
  },
  {
    icon: <ShieldCheck className="w-8 h-8 text-primary" />,
    title: 'Secure & Private',
    description: 'Your health data is encrypted and stored securely, ensuring your privacy and confidentiality.',
    image: placeHolderImages.placeholderImages.find(p => p.id === "3"),
    hint: 'data security'
  },
];

export default function Home() {
  const heroImage = placeHolderImages.placeholderImages.find(p => p.id === "hero");
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <section className="bg-white dark:bg-gray-900">
          <div className="container mx-auto px-6 py-16 text-center">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-4xl font-headline font-bold text-gray-800 dark:text-white md:text-5xl lg:text-6xl">
                Access quality healthcare anytime, anywhere.
              </h1>
              <p className="mt-6 text-lg text-gray-600 dark:text-gray-300">
                MediLink bridges the gap between rural and urban healthcare access. Connect with verified doctors, get instant AI-powered health advice, and manage your health with ease.
              </p>
              <div className="mt-8 flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:justify-center sm:space-x-4">
                <Button asChild size="lg" className="font-bold">
                  <Link href="/signup">Get Started</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="font-bold">
                  <Link href="/about">Learn More</Link>
                </Button>
              </div>
            </div>
            {heroImage && (
              <div className="mt-12">
                 <Image
                  src={heroImage.imageUrl}
                  alt={heroImage.description}
                  width={1200}
                  height={600}
                  data-ai-hint={heroImage.imageHint}
                  className="rounded-lg shadow-2xl mx-auto"
                />
              </div>
            )}
          </div>
        </section>
        
        <section id="problem" className="py-20 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-headline font-bold text-gray-800 dark:text-white mb-4">The Challenge</h2>
            <p className="max-w-3xl mx-auto text-gray-600 dark:text-gray-300">
              Healthcare accessibility remains a critical issue, especially in underserved rural areas. Patients face long travel times, high costs, and a shortage of specialists, leading to delayed or inadequate care.
            </p>
          </div>
        </section>

        <section id="solution" className="py-20 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-headline font-bold text-gray-800 dark:text-white mb-4">Our Solution</h2>
            <p className="max-w-3xl mx-auto text-gray-600 dark:text-gray-300">
              MediLink leverages technology to bring healthcare to your fingertips. Our platform provides a seamless connection to medical professionals and AI-driven health support, making quality care more accessible, affordable, and convenient for everyone.
            </p>
          </div>
        </section>

        <section id="features" className="py-20 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-headline font-bold text-gray-800 dark:text-white">Why Choose MediLink?</h2>
              <p className="text-gray-600 dark:text-gray-300 mt-2">Everything you need for smarter healthcare decisions.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-lg text-center">
                  <div className="flex justify-center mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-headline font-bold text-gray-800 dark:text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
