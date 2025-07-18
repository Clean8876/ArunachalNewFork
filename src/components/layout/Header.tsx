"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"

const literaryFont = "font-dm-serif"; // Use this class for literary font

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [mounted, setMounted] = useState(false)

  const navLinks = [
    { href: "/speakers", label: "Speakers" },
    { href: "/schedule", label: "Schedule" },
    { href: "/registration", label: "Registration" },
    { href: "/archive", label: "Archive" },
    { href: "/Inthenews", label: "In the news" },
    { href: "/blogsContent", label: "Blogs" },
    { href: "/videos", label: "Videos" },
    { href: "/contactus", label: "Contact Us" },
  ]

  // Handle scroll effect for sticky header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    // Check if screen is mobile (lg: 1024px)
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleLinkClick = () => {
    setIsMenuOpen(false)
  }

  // Header style
  const headerBase = `fixed top-0 left-0 right-0 z-50 w-full px-4 md:px-8 flex items-center justify-between ${literaryFont} transition-all duration-500 bg-[#FFFAEE]/95 backdrop-blur-md`;
  const headerHeight = isScrolled ? "h-14 md:h-16" : "h-16 md:h-20";

  return (
    <>
      <header
        className={`${headerBase} ${headerHeight}`}
        style={{ minHeight: isScrolled ? '3.5rem' : '4rem', fontSize: '1.1rem', letterSpacing: '0.01em' }}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center group">
          <Image
            src="/logo.png"
            alt="Arunachal Lit-Fest Logo"
            className="w-auto object-contain h-10 md:h-12 transition-all duration-300"
            width={0}
            height={0}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </Link>
        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-8 text-base">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative text-black font-medium py-2 px-1 transition-colors duration-300 group"
              style={{ fontSize: '1.08rem', letterSpacing: '0.01em' }}
            >
              {link.label}
              <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-gradient-to-r from-amber-600 to-orange-600 transition-all duration-300 group-hover:w-full rounded-full"></span>
            </Link>
          ))}
        </nav>
        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 hover:bg-amber-100 focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 transition-all duration-300 relative overflow-hidden"
              >
                {!isMenuOpen ? (
                  <Menu className="w-6 h-6 text-black" />
                ) : (
                  <X className="w-6 h-6 text-black" />
                )}
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[280px] sm:w-[320px] p-0 border-l border-amber-200/50 backdrop-blur-md"
              style={{ backgroundColor: "#FFFAEE" }}
            >
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <div className="py-6">
                <nav className="space-y-1 text-lg">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={handleLinkClick}
                      className="group flex items-center px-6 py-4 font-medium text-black hover:text-black hover:bg-amber-50/50 transition-all duration-300 relative overflow-hidden"
                      style={{ fontSize: '1.08rem', letterSpacing: '0.01em' }}
                    >
                      <span className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-amber-600 to-orange-600 opacity-0 group-hover:opacity-100 transition duration-300" />
                      <span className="relative z-10 group-hover:translate-x-2 transition duration-200">
                        {link.label}
                        <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-amber-600 transition-all duration-300 group-hover:w-full"></span>
                      </span>
                    </Link>
                  ))}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>
      {/* Spacer to prevent content from hiding behind fixed header */}
      <div className={`transition-all duration-500 ${isScrolled ? "h-14 md:h-16" : "h-16 md:h-20"}`} />
    </>
  )
}

export default Header
