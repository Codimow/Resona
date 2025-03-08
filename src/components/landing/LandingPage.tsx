import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Music,
  Headphones,
  Share2,
  Heart,
  Plus,
  Disc,
  Radio,
  Mic2,
  ListMusic,
  Users,
  Star,
  Sparkles,
  Zap,
  TrendingUp,
  Layers,
  Bookmark,
  Play,
} from "lucide-react";
import { motion } from "framer-motion";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-background to-background z-0"></div>

        {/* Animated music notes */}
        <div className="absolute inset-0 overflow-hidden z-0">
          {[...Array(12)].map((_, i) => {
            const icons = [
              <Music key={`icon-${i}-1`} />,
              <Disc key={`icon-${i}-2`} />,
              <Headphones key={`icon-${i}-3`} />,
              <Radio key={`icon-${i}-4`} />,
              <Mic2 key={`icon-${i}-5`} />,
            ];
            const randomIcon = icons[Math.floor(Math.random() * icons.length)];
            return (
              <motion.div
                key={i}
                className="absolute text-primary/10"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  fontSize: `${Math.random() * 30 + 20}px`,
                }}
                animate={{
                  y: [0, Math.random() * 100 - 50],
                  x: [0, Math.random() * 100 - 50],
                  rotate: [0, Math.random() * 360],
                  opacity: [0.1, 0.3, 0.1],
                }}
                transition={{
                  duration: Math.random() * 10 + 10,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                }}
              >
                {randomIcon}
              </motion.div>
            );
          })}
        </div>

        {/* Animated circles */}
        <div className="absolute inset-0 overflow-hidden z-0">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={`circle-${i}`}
              className="absolute rounded-full bg-primary/10"
              style={{
                width: `${Math.random() * 300 + 100}px`,
                height: `${Math.random() * 300 + 100}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, Math.random() * 50 - 25],
                x: [0, Math.random() * 50 - 25],
              }}
              transition={{
                duration: Math.random() * 5 + 5,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 md:pt-40 md:pb-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="flex justify-center mb-6">
              <motion.div
                className="bg-primary/20 p-4 rounded-full relative"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Music className="h-10 w-10 text-primary" />
                <motion.div
                  className="absolute -top-1 -right-1 -bottom-1 -left-1 rounded-full border-2 border-primary/30"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                ></motion.div>
                <motion.div
                  className="absolute -top-3 -right-3 -bottom-3 -left-3 rounded-full border-2 border-primary/20"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                ></motion.div>
              </motion.div>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              <motion.span
                className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-300"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{ duration: 10, repeat: Infinity }}
                style={{ backgroundSize: "200% auto" }}
              >
                Feel the Rhythm
              </motion.span>
              <br />
              <span>Connect Through Sound</span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-10">
              Discover, share, and experience music in a whole new way. Your
              personal sound journey starts here.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-white font-medium px-8 py-6 h-auto"
                >
                  <Sparkles className="mr-2 h-5 w-5" /> Get Started
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary/10 font-medium px-8 py-6 h-auto"
                >
                  <TrendingUp className="mr-2 h-5 w-5" /> Explore Trending
                </Button>
              </motion.div>
            </div>

            <div className="mt-16 flex flex-wrap justify-center gap-4">
              <div className="flex items-center bg-secondary/40 rounded-full px-4 py-2">
                <Star className="h-4 w-4 text-yellow-400 mr-2" />
                <span className="text-sm">50M+ Tracks</span>
              </div>
              <div className="flex items-center bg-secondary/40 rounded-full px-4 py-2">
                <Users className="h-4 w-4 text-blue-400 mr-2" />
                <span className="text-sm">10M+ Users</span>
              </div>
              <div className="flex items-center bg-secondary/40 rounded-full px-4 py-2">
                <Layers className="h-4 w-4 text-green-400 mr-2" />
                <span className="text-sm">5M+ Collections</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Streaming Services */}
      <div className="py-12 bg-background/80 border-y border-border/20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8">
            <p className="text-muted-foreground text-lg">
              Seamlessly integrated with all your favorite music platforms
            </p>
          </div>
          <div className="flex justify-center flex-wrap gap-8 md:gap-16">
            {[
              {
                name: "Spotify",
                logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Spotify_icon.svg/232px-Spotify_icon.svg.png",
              },
              {
                name: "Apple Music",
                logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Apple_Music_icon.svg/2048px-Apple_Music_icon.svg.png",
              },
              {
                name: "YouTube Music",
                logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Youtube_Music_icon.svg/800px-Youtube_Music_icon.svg.png",
              },
              {
                name: "Amazon Music",
                logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Amazon_Music_logo.svg/2048px-Amazon_Music_logo.svg.png",
              },
              {
                name: "Tidal",
                logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/TIDAL_%28service%29_logo.svg/1200px-TIDAL_%28service%29_logo.svg.png",
              },
            ].map((service, index) => (
              <motion.div
                key={service.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col items-center"
              >
                <img
                  src={service.logo}
                  alt={service.name}
                  className="h-8 md:h-10 object-contain opacity-70 hover:opacity-100 transition-opacity"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-block bg-primary/10 px-4 py-2 rounded-full text-primary font-medium text-sm mb-4">
              How It Works
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Experience Music Together
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Resona makes discovering and sharing music a deeply personal and
              social experience.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                icon: <Music className="h-8 w-8" />,
                title: "Discover Music",
                description:
                  "Find new tracks based on your taste and what's trending worldwide. Our algorithm learns what you love.",
                color: "from-blue-500/20 to-blue-600/20",
              },
              {
                icon: <Bookmark className="h-8 w-8" />,
                title: "Create Collections",
                description:
                  "Organize your music into themed boards for any mood or occasion. Perfect for parties, workouts, or relaxation.",
                color: "from-purple-500/20 to-purple-600/20",
              },
              {
                icon: <Share2 className="h-8 w-8" />,
                title: "Share & Connect",
                description:
                  "Share your music taste and connect with like-minded listeners. Follow friends and influencers for inspiration.",
                color: "from-pink-500/20 to-pink-600/20",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="flex flex-col items-center text-center p-8 rounded-xl border border-border/40 bg-secondary/30 hover:bg-secondary/50 transition-colors"
              >
                <div
                  className={`bg-gradient-to-br ${feature.color} p-4 rounded-full mb-6`}
                >
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* App Screenshot Section */}
      <div className="py-20 bg-gradient-to-b from-background to-secondary/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="inline-block bg-primary/10 px-4 py-2 rounded-full text-primary font-medium text-sm mb-4">
                Beautiful Interface
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Crafted for Audiophiles
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Our immersive interface helps you discover new sounds, build
                your sonic identity, and connect with a community that shares
                your passion for music.
              </p>

              <div className="space-y-6">
                {[
                  {
                    icon: <Zap className="h-5 w-5 text-yellow-400" />,
                    title: "Intuitive Experience",
                    description:
                      "Simple and beautiful design that puts music first",
                  },
                  {
                    icon: <ListMusic className="h-5 w-5 text-green-400" />,
                    title: "Smart Playlists",
                    description:
                      "Automatically generate playlists based on your taste",
                  },
                  {
                    icon: <Users className="h-5 w-5 text-blue-400" />,
                    title: "Social Discovery",
                    description:
                      "Find new music through friends and tastemakers",
                  },
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start"
                  >
                    <div className="bg-secondary/50 p-2 rounded-full mr-4">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">{feature.title}</h3>
                      <p className="text-muted-foreground text-sm">
                        {feature.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative mx-auto w-full max-w-md">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-purple-500/30 rounded-2xl transform rotate-6 blur-xl opacity-30"></div>
                <div className="relative bg-background border-4 border-border/40 rounded-2xl overflow-hidden shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=600&q=80"
                    alt="MusicPin App Interface"
                    className="w-full h-auto"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="bg-background/80 backdrop-blur-md rounded-xl p-4 border border-border/40">
                      <div className="flex items-center mb-2">
                        <img
                          src="https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=100&q=80"
                          alt="Album cover"
                          className="w-10 h-10 rounded object-cover mr-3"
                        />
                        <div>
                          <h4 className="font-medium text-sm">
                            Blinding Lights
                          </h4>
                          <p className="text-xs text-muted-foreground">
                            The Weeknd
                          </p>
                        </div>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="ml-auto rounded-full h-8 w-8"
                        >
                          <Play className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="w-full bg-secondary/50 h-1 rounded-full overflow-hidden">
                        <div
                          className="bg-primary h-full"
                          style={{ width: "35%" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Music Preview Section */}
      <div className="py-20 bg-secondary/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-block bg-primary/10 px-4 py-2 rounded-full text-primary font-medium text-sm mb-4">
              <TrendingUp className="inline-block h-4 w-4 mr-1" /> Trending Now
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Sound Waves</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Explore what's resonating with our community of music enthusiasts
              right now.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Blinding Lights",
                artist: "The Weeknd",
                cover:
                  "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=300&q=80",
                likes: "1.2k",
                genre: "Pop",
              },
              {
                title: "Levitating",
                artist: "Dua Lipa",
                cover:
                  "https://images.unsplash.com/photo-1619983081563-430f63602796?w=300&q=80",
                likes: "982",
                genre: "Dance Pop",
              },
              {
                title: "Save Your Tears",
                artist: "The Weeknd & Ariana Grande",
                cover:
                  "https://images.unsplash.com/photo-1598387993281-cecf8b71a8f8?w=300&q=80",
                likes: "1.5k",
                genre: "R&B",
              },
              {
                title: "Good 4 U",
                artist: "Olivia Rodrigo",
                cover:
                  "https://images.unsplash.com/photo-1618609377864-68609b857e90?w=300&q=80",
                likes: "2.1k",
                genre: "Pop Rock",
              },
            ].map((track, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="group relative overflow-hidden rounded-xl aspect-square bg-background border border-border/40 hover:border-primary/50 transition-all shadow-lg hover:shadow-xl"
              >
                <img
                  src={track.cover}
                  alt={track.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-black/50 backdrop-blur-sm text-xs px-2 py-1 rounded-full text-white/90">
                  {track.genre}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-80 group-hover:opacity-100 transition-opacity">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-white font-semibold text-lg truncate">
                      {track.title}
                    </h3>
                    <p className="text-white/80 text-sm truncate">
                      {track.artist}
                    </p>
                    <div className="flex items-center mt-3">
                      <Heart className="h-4 w-4 text-red-500 fill-current mr-1" />
                      <span className="text-white/80 text-xs">
                        {track.likes}
                      </span>
                      <div className="ml-auto flex gap-2">
                        <Button
                          size="sm"
                          variant="secondary"
                          className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white rounded-full h-8 w-8 p-0"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="secondary"
                          className="bg-primary/80 hover:bg-primary backdrop-blur-sm text-white rounded-full h-8 w-8 p-0"
                        >
                          <Headphones className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                className="border-primary text-primary hover:bg-primary/10"
              >
                <TrendingUp className="mr-2 h-4 w-4" /> Explore All Trending
                Tracks
              </Button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-block bg-primary/10 px-4 py-2 rounded-full text-primary font-medium text-sm mb-4">
              Testimonials
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What Our Users Say
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Join thousands of passionate music lovers already experiencing
              Resona.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote:
                  "Resona has transformed how I discover new music. The personalized recommendations feel like they know my soul!",
                name: "Alex Johnson",
                title: "Music Producer",
                avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex",
              },
              {
                quote:
                  "I love how Resona helps me create soundscapes for every mood and moment in my life. It's become my audio diary.",
                name: "Sophia Chen",
                title: "Playlist Curator",
                avatar:
                  "https://api.dicebear.com/7.x/avataaars/svg?seed=sophia",
              },
              {
                quote:
                  "The community features are incredible! I've discovered so many hidden gems through the curated collections of like-minded listeners.",
                name: "Marcus Williams",
                title: "DJ & Music Enthusiast",
                avatar:
                  "https://api.dicebear.com/7.x/avataaars/svg?seed=marcus",
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-secondary/30 p-6 rounded-xl border border-border/40"
              >
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                <p className="mb-6 text-muted-foreground">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="h-10 w-10 rounded-full mr-3"
                  />
                  <div>
                    <h4 className="font-medium">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.title}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-primary/20 to-purple-500/10 rounded-2xl p-10 border border-primary/20 relative overflow-hidden"
          >
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={`cta-circle-${i}`}
                  className="absolute rounded-full bg-primary/5"
                  style={{
                    width: `${Math.random() * 200 + 50}px`,
                    height: `${Math.random() * 200 + 50}px`,
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: [0, Math.random() * 30 - 15],
                    x: [0, Math.random() * 30 - 15],
                    scale: [1, Math.random() * 0.2 + 0.9, 1],
                  }}
                  transition={{
                    duration: Math.random() * 5 + 5,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>

            <div className="relative z-10">
              <motion.div
                className="inline-block bg-primary/20 p-3 rounded-full mb-6"
                animate={{ rotate: [0, 5, 0, -5, 0] }}
                transition={{ duration: 5, repeat: Infinity }}
              >
                <Music className="h-8 w-8 text-primary" />
              </motion.div>

              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to amplify your music experience?
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
                Join our vibrant community of music enthusiasts who are
                discovering new sounds, sharing sonic journeys, and connecting
                through the universal language of music.
              </p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-white font-medium px-8 py-6 h-auto"
                >
                  <Sparkles className="mr-2 h-5 w-5" /> Sign Up Now — It's Free
                </Button>
              </motion.div>
              <p className="text-sm text-muted-foreground mt-4">
                No credit card required. Cancel anytime.
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-12 bg-secondary/30 border-t border-border/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center mb-4">
                <Music className="h-6 w-6 text-primary mr-2" />
                <span className="text-xl font-bold">Resona</span>
              </div>
              <p className="text-muted-foreground text-sm mb-4">
                Amplify your music experience. Connect through sound. Resonate
                together.
              </p>
              <div className="flex space-x-4">
                {["twitter", "facebook", "instagram", "youtube"].map(
                  (social) => (
                    <a
                      key={social}
                      href="#"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      <div className="h-8 w-8 rounded-full bg-secondary/50 flex items-center justify-center">
                        <img
                          src={`https://api.iconify.design/simple-icons:${social}.svg?color=currentColor`}
                          alt={social}
                          className="h-4 w-4"
                        />
                      </div>
                    </a>
                  ),
                )}
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                {[
                  "Features",
                  "Pricing",
                  "Integrations",
                  "FAQ",
                  "Changelog",
                ].map((item) => (
                  <li key={item}>
                    <Link
                      to="#"
                      className="text-muted-foreground hover:text-primary transition-colors text-sm"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                {["About", "Blog", "Careers", "Press", "Partners"].map(
                  (item) => (
                    <li key={item}>
                      <Link
                        to="#"
                        className="text-muted-foreground hover:text-primary transition-colors text-sm"
                      >
                        {item}
                      </Link>
                    </li>
                  ),
                )}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                {["Terms", "Privacy", "Cookies", "Licenses", "Contact"].map(
                  (item) => (
                    <li key={item}>
                      <Link
                        to="#"
                        className="text-muted-foreground hover:text-primary transition-colors text-sm"
                      >
                        {item}
                      </Link>
                    </li>
                  ),
                )}
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-border/40 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground mb-4 md:mb-0">
              © {new Date().getFullYear()} Resona. All rights reserved.
            </p>
            <div className="flex items-center space-x-4">
              <select className="bg-secondary/50 border border-border/40 rounded-md text-sm py-1 px-2">
                <option>English (US)</option>
                <option>Español</option>
                <option>Français</option>
                <option>Deutsch</option>
              </select>
              <div className="flex items-center text-sm text-muted-foreground">
                <span className="inline-block h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                All systems operational
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
