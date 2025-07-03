import { Hero } from '@/components/landing/hero'
import { FeaturedCourses } from '@/components/landing/featured-courses'
import { Categories } from '@/components/landing/categories'
import { Testimonials } from '@/components/landing/testimonials'
import { CallToAction } from '@/components/landing/call-to-action'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <FeaturedCourses />
        <Categories />
        <Testimonials />
        <CallToAction />
      </main>
      <Footer />
    </div>
  )
}