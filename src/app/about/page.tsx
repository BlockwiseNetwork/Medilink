import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import placeHolderImages from '@/lib/placeholder-images.json';

const teamMembers = [
  { name: 'Boluwatife Adebayo', role: 'Lead Software Engineer', imageId: 'team2' },
  { name: 'Aisha Ibrahim', role: 'AI & Backend Specialist', imageId: 'team3' },
  { name: 'Efe Okoro', role: 'Product & UX Designer', imageId: 'team4' },
];

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12 md:py-20">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary dark:text-white">
            Our Mission: Accessible Healthcare for All
          </h1>
          <p className="mt-6 text-lg text-gray-700 dark:text-gray-300">
            MediLink was born from a desire to democratize healthcare. We believe that everyone, regardless of their location, deserves access to quality medical advice and care. Our platform is designed to break down geographical barriers, reduce wait times, and empower individuals to take control of their health journey.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mt-20 items-center">
          <div>
            <h2 className="text-3xl font-headline font-bold text-gray-800 dark:text-white">Our Vision</h2>
            <p className="mt-4 text-gray-600 dark:text-gray-400">
              We envision a future where healthcare is not a privilege but a universal right, seamlessly integrated into daily life. Through continuous innovation in telehealth and AI, we aim to be at the forefront of a global healthcare revolution, making expert medical care as simple as sending a message.
            </p>
             <h2 className="text-3xl font-headline font-bold text-gray-800 dark:text-white mt-8">Our Impact</h2>
            <p className="mt-4 text-gray-600 dark:text-gray-400">
              By connecting patients in remote areas with doctors in urban centers, we are drastically reducing the time and cost associated with seeking medical help. Our AI, Medibot, provides immediate, reliable health information, helping to alleviate the strain on medical professionals and providing peace of mind to our users.
            </p>
          </div>
          <div>
            <Image
              src="https://picsum.photos/seed/about-vision/600/400"
              alt="Team collaborating on MediLink"
              width={600}
              height={400}
              data-ai-hint="team collaboration"
              className="rounded-lg shadow-xl"
            />
          </div>
        </div>

        <section id="team" className="mt-20">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-headline font-bold text-gray-800 dark:text-white">Meet the Team</h2>
             <p className="mt-4 text-gray-600 dark:text-gray-400">The passionate minds behind MediLink.</p>
          </div>
          <div className="mt-8 text-center text-gray-700 dark:text-gray-300">
            <p>Boluwatife Adebayo</p>
            <p>Aisha Ibrahim</p>
            <p>Efe Okoro</p>
          </div>
        </section>

        <div className="text-center mt-20">
          <Button asChild size="lg">
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
}
