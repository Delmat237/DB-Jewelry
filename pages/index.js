import Head from 'next/head';
import HeroSection from '@/components/HeroSection';
import ProductShowcase from '@/components/ProductShowcase';

export default function Home() {
  return (
    <>
      <Head>
        <title>DB Jewelry - Bijoux de luxe</title>
        <meta name="description" content="Site de vente de bijoux élégants et modernes." />
      </Head>
    
      <HeroSection />
      <ProductShowcase />
     
    </>
  );
}
