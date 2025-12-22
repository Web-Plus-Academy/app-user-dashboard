import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, BookOpen, Briefcase, Calendar, Wrench, ArrowRight, Play, Users, Award, Star } from 'lucide-react';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-display text-xl font-bold gradient-text">EduAI</span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/auth" className="btn-secondary">
              Sign In
            </Link>
            <Link to="/auth" className="btn-primary">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-primary/10 blur-[120px] animate-float" />
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-accent/10 blur-[120px] animate-float" style={{ animationDelay: '3s' }} />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8 opacity-0 animate-fade-in">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary font-medium">AI-Powered Learning Platform</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 leading-tight opacity-0 animate-fade-in" style={{ animationDelay: '100ms' }}>
              Master Skills for the{' '}
              <span className="gradient-text">Future of Tech</span>
            </h1>

            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto opacity-0 animate-fade-in" style={{ animationDelay: '200ms' }}>
              Access world-class courses, internships, and career opportunities. 
              Learn from industry experts and accelerate your career in AI, ML, and beyond.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0 animate-fade-in" style={{ animationDelay: '300ms' }}>
              <Link to="/auth" className="btn-primary text-lg px-8 py-4 flex items-center gap-2">
                Start Learning Free
                <ArrowRight className="w-5 h-5" />
              </Link>
              <button className="btn-secondary text-lg px-8 py-4 flex items-center gap-2">
                <Play className="w-5 h-5" />
                Watch Demo
              </button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-12 mt-16 opacity-0 animate-fade-in" style={{ animationDelay: '400ms' }}>
              <div className="text-center">
                <p className="text-4xl font-display font-bold gradient-text">50K+</p>
                <p className="text-muted-foreground">Active Learners</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-display font-bold gradient-text">200+</p>
                <p className="text-muted-foreground">Expert Courses</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-display font-bold gradient-text">95%</p>
                <p className="text-muted-foreground">Success Rate</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-display font-bold gradient-text">500+</p>
                <p className="text-muted-foreground">Hiring Partners</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold mb-4">Everything You Need to Succeed</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A complete learning ecosystem designed to take you from beginner to industry-ready professional
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: BookOpen,
                title: 'Expert Courses',
                description: 'Learn from industry leaders with hands-on projects and real-world applications',
                color: 'primary',
              },
              {
                icon: Briefcase,
                title: 'Internships',
                description: 'Get matched with top companies and kickstart your career with real experience',
                color: 'accent',
              },
              {
                icon: Calendar,
                title: 'Live Events',
                description: 'Join webinars, hackathons, and networking events with industry experts',
                color: 'success',
              },
              {
                icon: Wrench,
                title: 'Workshops',
                description: 'Hands-on sessions to build practical skills with expert guidance',
                color: 'warning',
              },
            ].map((feature, index) => (
              <div
                key={feature.title}
                className="stat-card group cursor-pointer opacity-0 animate-fade-in"
                style={{ animationDelay: `${500 + index * 100}ms` }}
              >
                <div className={`w-14 h-14 rounded-2xl bg-${feature.color}/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <feature.icon className={`w-7 h-7 text-${feature.color}`} />
                </div>
                <h3 className="text-xl font-display font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-50" style={{ background: 'var(--gradient-glow)' }} />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold mb-4">Loved by Learners</h2>
            <p className="text-xl text-muted-foreground">Join thousands who transformed their careers with EduAI</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: 'Sarah Chen',
                role: 'ML Engineer at Google',
                quote: 'EduAI helped me transition from web development to machine learning. The courses are incredibly well-structured.',
                avatar: 'S',
              },
              {
                name: 'James Wilson',
                role: 'Data Scientist at Meta',
                quote: 'The internship matching feature is amazing. I got my dream role at Meta through the platform.',
                avatar: 'J',
              },
              {
                name: 'Priya Sharma',
                role: 'AI Researcher',
                quote: 'The workshops and live events gave me hands-on experience that I couldn\'t get anywhere else.',
                avatar: 'P',
              },
            ].map((testimonial, index) => (
              <div
                key={testimonial.name}
                className="glass-card rounded-2xl p-6 opacity-0 animate-fade-in"
                style={{ animationDelay: `${600 + index * 100}ms` }}
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-warning fill-warning" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-6">"{testimonial.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                    <span className="text-sm font-semibold text-primary-foreground">{testimonial.avatar}</span>
                  </div>
                  <div>
                    <p className="font-medium">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="stat-card p-12 relative overflow-hidden">
            <div className="absolute inset-0 opacity-30" style={{ background: 'var(--gradient-glow)' }} />
            <div className="relative z-10">
              <h2 className="text-4xl font-display font-bold mb-4">Ready to Start Your Journey?</h2>
              <p className="text-xl text-muted-foreground mb-8">
                Join 50,000+ learners who are building the future with EduAI
              </p>
              <Link to="/auth" className="btn-primary text-lg px-8 py-4 inline-flex items-center gap-2">
                Get Started Free
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-display font-bold gradient-text">EduAI</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2024 EduAI. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
