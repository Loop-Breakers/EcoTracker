"use client"

import { useAuth } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Leaf, Scan, TrendingDown, Trophy, Users, BarChart3 } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function LandingPage() {
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (user) {
      router.push("/dashboard")
    }
  }, [user, router])

  if (user) {
    return null // Will redirect to dashboard
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-900/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Leaf className="h-8 w-8 text-green-400" />
            <span className="text-2xl font-bold text-green-400">EcoTracker</span>
          </div>
          <div className="flex gap-2">
            <Link href="/auth/signin">
              <Button variant="ghost" className="text-gray-300 hover:text-white hover:bg-gray-800">
                Sign In
              </Button>
            </Link>
            <Link href="/auth/signup">
              <Button className="bg-green-600 hover:bg-green-700">Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 dark-gradient">
        <div className="container mx-auto text-center">
          <Badge className="mb-4 bg-green-900/50 text-green-400 hover:bg-green-900/50 border-green-600">
            🌱 Track Your Impact
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Shop Sustainably,
            <br />
            <span className="text-green-400">Track Your Impact</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Scan product barcodes to discover their carbon footprint, track your monthly CO₂ usage, and compete with
            friends for the most sustainable shopping habits.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/signup">
              <Button size="lg" className="bg-green-600 hover:bg-green-700 glow-green">
                Start Tracking Free
              </Button>
            </Link>
            <Link href="/demo">
              <Button size="lg" variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800">
                View Demo
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 bg-gray-900">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Everything You Need to Shop Sustainably</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Powerful tools to help you make informed decisions and reduce your environmental impact.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="dark-card border-gray-700 hover:border-green-500/50 transition-colors">
              <CardHeader>
                <Scan className="h-12 w-12 text-green-400 mb-4" />
                <CardTitle className="text-white">Barcode Scanner</CardTitle>
                <CardDescription className="text-gray-400">
                  Instantly scan or enter product barcodes to get detailed sustainability information
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="dark-card border-gray-700 hover:border-green-500/50 transition-colors">
              <CardHeader>
                <TrendingDown className="h-12 w-12 text-green-400 mb-4" />
                <CardTitle className="text-white">Carbon Tracking</CardTitle>
                <CardDescription className="text-gray-400">
                  Monitor your monthly CO₂ footprint and see how your choices impact the environment
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="dark-card border-gray-700 hover:border-green-500/50 transition-colors">
              <CardHeader>
                <Trophy className="h-12 w-12 text-green-400 mb-4" />
                <CardTitle className="text-white">Leaderboard</CardTitle>
                <CardDescription className="text-gray-400">
                  Compete with other users and celebrate the most sustainable shoppers
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="dark-card border-gray-700 hover:border-green-500/50 transition-colors">
              <CardHeader>
                <BarChart3 className="h-12 w-12 text-green-400 mb-4" />
                <CardTitle className="text-white">Detailed Analytics</CardTitle>
                <CardDescription className="text-gray-400">
                  Get insights into your shopping patterns and sustainability trends over time
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="dark-card border-gray-700 hover:border-green-500/50 transition-colors">
              <CardHeader>
                <Users className="h-12 w-12 text-green-400 mb-4" />
                <CardTitle className="text-white">Community</CardTitle>
                <CardDescription className="text-gray-400">
                  Join a community of eco-conscious shoppers and share sustainable tips
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="dark-card border-gray-700 hover:border-green-500/50 transition-colors">
              <CardHeader>
                <Leaf className="h-12 w-12 text-green-400 mb-4" />
                <CardTitle className="text-white">Impact Score</CardTitle>
                <CardDescription className="text-gray-400">
                  Get personalized sustainability scores and recommendations for better choices
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-green-900/20 border-t border-green-800">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Ready to Make a Difference?</h2>
          <p className="text-xl mb-8 text-gray-300 max-w-2xl mx-auto">
            Join thousands of users who are already making more sustainable shopping choices.
          </p>
          <Link href="/auth/signup">
            <Button size="lg" className="bg-green-600 hover:bg-green-700 glow-green">
              Start Your Journey Today
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-950 text-white py-12 px-4 border-t border-gray-800">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Leaf className="h-6 w-6 text-green-400" />
            <span className="text-xl font-bold">EcoTracker</span>
          </div>
          <p className="text-gray-400 mb-4">Making sustainable shopping accessible to everyone.</p>
          <div className="flex justify-center gap-6 text-sm text-gray-400">
            <Link href="/privacy" className="hover:text-white">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white">
              Terms of Service
            </Link>
            <Link href="/contact" className="hover:text-white">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
