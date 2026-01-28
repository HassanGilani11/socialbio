import Image from 'next/image'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Hero from '@/components/Hero'

import connectToDatabase from "@/lib/db";
import SiteConfig from "@/schema/site-config";

export const dynamic = 'force-dynamic';

export default async function Home() {
  let siteName = "MySocials";
  try {
    await connectToDatabase();
    const config = await SiteConfig.findOne();
    siteName = config?.siteName || "MySocials";
  } catch (error) {
    console.error("Home: Failed to fetch site config:", error.message);
  }

  return (

    <main>
      <Header siteName={siteName} />
      <Hero />
      <Footer />
    </main>
  )
}
