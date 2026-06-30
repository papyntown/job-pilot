import { ApplyWithConfidence } from "@/components/homepage/ApplyWithConfidence";
import { BottomCta } from "@/components/homepage/BottomCta";
import { Hero } from "@/components/homepage/Hero";
import { ManageJobSearch } from "@/components/homepage/ManageJobSearch";
import { Testimonial } from "@/components/homepage/Testimonial";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";

export default function HomePage() {
  return (
    <div className="flex min-h-full flex-col bg-surface">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <ManageJobSearch />
        <ApplyWithConfidence />
        <Testimonial />
        <BottomCta />
      </main>
      <Footer />
    </div>
  );
}
