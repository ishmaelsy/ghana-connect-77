import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Users, BarChart3, Shield, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-ghana.jpg";
import logo from "@/assets/ghana-star-logo.png";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto flex items-center justify-between h-16 px-4">
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="Ghana CIT" width={32} height={32} className="w-8 h-8" />
            <span className="font-display font-bold text-lg text-foreground">Ghana <span className="text-primary">CIT</span></span>
          </Link>
          <div className="hidden md:flex items-center gap-6">
            <Link to="/feed" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Issues</Link>
            <Link to="/leaderboard" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Leaders</Link>
            <Link to="/priority-board" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Priority Board</Link>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/feed">Log In</Link>
            </Button>
            <Button size="sm" asChild>
              <Link to="/feed">Sign Up</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-16 overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImage} alt="Ghana cityscape" width={1920} height={1080} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-hero opacity-85" />
        </div>
        <div className="relative container mx-auto px-4 py-24 md:py-36 lg:py-44">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 rounded-full px-4 py-1.5 mb-6">
              <span className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
              <span className="text-sm font-medium text-primary-foreground/90">Tracking 276 Constituencies</span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight mb-6">
              Your Voice.<br />
              Your Constituency.<br />
              <span className="text-secondary">Your Country.</span>
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/80 font-body mb-8 max-w-lg">
              Report issues, hold your leaders accountable, and shape the future of Ghana — one constituency at a time.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-gold font-semibold text-base px-8" asChild>
                <Link to="/feed">
                  Report an Issue <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 text-base" asChild>
                <Link to="/leaderboard">Rate Your MP</Link>
              </Button>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {[
              { label: "Issues Reported", value: "12,847" },
              { label: "Constituencies", value: "276" },
              { label: "Leaders Rated", value: "842" },
              { label: "Issues Resolved", value: "3,421" },
            ].map((stat) => (
              <div key={stat.label} className="bg-primary-foreground/10 backdrop-blur-sm rounded-xl p-4 border border-primary-foreground/10">
                <div className="font-display text-2xl md:text-3xl font-bold text-primary-foreground">{stat.value}</div>
                <div className="text-sm text-primary-foreground/60 mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              How Ghana CIT Works
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              A simple, powerful system to connect citizens with their elected representatives.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { icon: MapPin, title: "Report", desc: "Snap a photo, describe the issue, and tag your constituency.", color: "bg-primary text-primary-foreground" },
              { icon: Users, title: "Rally Support", desc: 'Other citizens upvote and "Me Too" to boost urgency.', color: "bg-secondary text-secondary-foreground" },
              { icon: Shield, title: "Leaders Respond", desc: "Your MP and officials are notified and must respond publicly.", color: "bg-accent text-accent-foreground" },
              { icon: BarChart3, title: "Track & Rate", desc: "Monitor progress and rate your leaders on their performance.", color: "bg-foreground text-background" },
            ].map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center"
              >
                <div className={`w-16 h-16 ${step.color} rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-ghana`}>
                  <step.icon className="w-7 h-7" />
                </div>
                <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Step {i + 1}</div>
                <h3 className="font-display text-xl font-bold text-foreground mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-hero">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              Ready to Make Your Voice Heard?
            </h2>
            <p className="text-primary-foreground/70 text-lg mb-8 max-w-lg mx-auto">
              Join thousands of Ghanaians already holding their leaders accountable.
            </p>
            <Button size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-gold font-semibold text-base px-10" asChild>
              <Link to="/feed">Get Started — It's Free <ArrowRight className="ml-2 w-5 h-5" /></Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <img src={logo} alt="Ghana CIT" width={28} height={28} className="w-7 h-7 invert" />
              <span className="font-display font-bold text-background">Ghana CIT</span>
            </div>
            <p className="text-background/50 text-sm">© 2026 Ghana Constituency Issue Tracker. Built for the people of Ghana.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
