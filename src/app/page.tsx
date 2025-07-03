import { ModeToggle } from "@/components/modetoogle";
import { Button } from "@/components/ui/button";
import { BookOpen, Library, Star, Users, Smartphone, Cloud, Search, Heart } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Your Digital <span className="text-primary">Library</span> Awaits
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Discover, read, and organize thousands of books in one beautiful app. 
              Join millions of readers in the ultimate reading experience.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8 py-6">
                Start Reading Free
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-6">
                <BookOpen className="mr-2 h-5 w-5" />
                Browse Library
              </Button>
            </div>
          </div>
          
          {/* Hero Image/Mockup */}
          <div className="mt-16 relative">
            <div className="bg-card border border-border rounded-2xl shadow-2xl p-8 max-w-4xl mx-auto">
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="h-32 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg flex items-center justify-center">
                  <BookOpen className="h-12 w-12 text-primary" />
                </div>
                <div className="h-32 bg-gradient-to-br from-secondary/20 to-secondary/10 rounded-lg flex items-center justify-center">
                  <Library className="h-12 w-12 text-secondary-foreground" />
                </div>
                <div className="h-32 bg-gradient-to-br from-accent/20 to-accent/10 rounded-lg flex items-center justify-center">
                  <Star className="h-12 w-12 text-accent-foreground" />
                </div>
              </div>
              <div className="text-left space-y-2">
                <div className="h-4 bg-muted rounded w-3/4"></div>
                <div className="h-4 bg-muted rounded w-1/2"></div>
                <div className="h-4 bg-muted rounded w-2/3"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
              Everything You Need to Read
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Powerful features designed to enhance your reading experience and help you discover your next favorite book.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Library,
                title: "Vast Library",
                description: "Access thousands of books across all genres, from bestsellers to hidden gems."
              },
              {
                icon: Smartphone,
                title: "Read Anywhere",
                description: "Sync across all your devices. Pick up where you left off, anytime, anywhere."
              },
              {
                icon: Search,
                title: "Smart Discovery",
                description: "AI-powered recommendations help you discover books you'll love based on your taste."
              },
              {
                icon: Cloud,
                title: "Cloud Sync",
                description: "Your library, bookmarks, and progress are safely stored and synced in the cloud."
              },
              {
                icon: Users,
                title: "Reading Community",
                description: "Connect with fellow readers, share reviews, and join book discussions."
              },
              {
                icon: Heart,
                title: "Personal Collections",
                description: "Create custom shelves, track your reading goals, and organize your favorites."
              }
            ].map((feature, index) => (
              <div key={index} className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow">
                <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: "50K+", label: "Books Available" },
              { number: "1M+", label: "Happy Readers" },
              { number: "4.9", label: "App Store Rating" },
              { number: "100+", label: "Countries" }
            ].map((stat, index) => (
              <div key={index} className="space-y-2">
                <div className="text-3xl md:text-4xl font-bold text-primary">{stat.number}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-primary/5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
            Ready to Start Your Reading Journey?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join millions of readers who have already discovered their next favorite book on Bookify.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8 py-6">
              Get Started Free
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-6">
              Download App
            </Button>
          </div>
          <p className="text-sm text-muted-foreground mt-4">
            Free forever. No credit card required.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/30 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center space-x-2 mb-4">
                <BookOpen className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold text-foreground">Bookify</span>
              </div>
              <p className="text-muted-foreground text-sm">
                Making reading accessible and enjoyable for everyone, everywhere.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-3">Product</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Mobile App</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-3">Company</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">About</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Careers</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-3">Support</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Privacy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2025 Bookify. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
