import Link from 'next/link'
import { BookOpen, Mail, Phone, MapPin } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-muted/50 border-t">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <BookOpen className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold text-primary">SkillBridge</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Empowering learners worldwide with quality education and skill development opportunities.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/courses" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Browse Courses
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/help" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Help Center
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/courses?category=programming" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Programming
                </Link>
              </li>
              <li>
                <Link href="/courses?category=design" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Design
                </Link>
              </li>
              <li>
                <Link href="/courses?category=business" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Business
                </Link>
              </li>
              <li>
                <Link href="/courses?category=marketing" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Marketing
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Info</h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>support@skillbridge.com</span>
              </li>
              <li className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>123 Learning St, Education City</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center">
          <p className="text-sm text-muted-foreground">
            © 2024 SkillBridge. All rights reserved. Built with ❤️ for learners everywhere.
          </p>
        </div>
      </div>
    </footer>
  )
}