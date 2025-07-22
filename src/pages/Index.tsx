import React from 'react';
import NewsDetector from '@/components/NewsDetector';
import IntegrationGuide from '@/components/IntegrationGuide';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, Zap, Target, Users } from 'lucide-react';
import heroImage from '@/assets/news-detector-hero.png';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-screen flex items-center">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-transparent" />
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-primary/10 rounded-full blur-xl float-gentle" />
        <div className="absolute top-40 right-20 w-32 h-32 bg-primary/5 rounded-full blur-2xl float-medium" />
        <div className="absolute bottom-32 left-1/4 w-16 h-16 bg-primary/15 rounded-full blur-lg float-intense" />
        <div className="absolute top-1/3 right-1/3 w-24 h-24 bg-primary/8 rounded-full blur-xl float-gentle" style={{ animationDelay: '2s' }} />
        
        <div className="relative container mx-auto px-4 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Badge variant="secondary" className="w-fit magical-glow animate-bounce">
                <Zap className="w-3 h-3 mr-1 animate-pulse" />
                AI-Powered Detection
              </Badge>
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight animate-fade-in">
                Advanced{' '}
                <span className="aurora-text animate-aurora-shift">
                  Fake News
                </span>{' '}
                Detection
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Combat misinformation with our sophisticated AI system. Analyze news articles, 
                headlines, and social media posts to determine their authenticity using 
                advanced machine learning algorithms.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-sm">
                  <Shield className="w-4 h-4 text-primary" />
                  <span>Multi-model Analysis</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Target className="w-4 h-4 text-primary" />
                  <span>85%+ Accuracy</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Users className="w-4 h-4 text-primary" />
                  <span>Trusted by Journalists</span>
                </div>
              </div>
            </div>
            <div className="relative float-medium">
              <div className="cyber-border rounded-2xl p-1 magical-glow particle-effect">
                <img 
                  src={heroImage} 
                  alt="AI News Detection Visualization"
                  className="w-full rounded-xl shadow-2xl"
                />
              </div>
              
              {/* Enhanced Floating Elements */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/20 rounded-full blur-3xl animate-magical-pulse" />
              <div className="absolute -top-6 -left-6 w-40 h-40 bg-primary/10 rounded-full blur-3xl float-gentle" />
              <div className="absolute top-1/2 -right-8 w-20 h-20 bg-primary/30 rounded-full blur-2xl animate-pulse" />
              <div className="absolute bottom-1/4 -left-8 w-24 h-24 bg-primary/25 rounded-full blur-xl float-intense" style={{ animationDelay: '1s' }} />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 border-t border-border/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our system combines multiple AI models to provide comprehensive analysis
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="float-gentle border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-500 magical-glow group cursor-pointer">
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:animate-float-medium transition-all duration-300">
                  <Shield className="w-6 h-6 text-primary group-hover:animate-pulse" />
                </div>
                <CardTitle className="text-xl group-hover:aurora-text transition-all duration-300">Linguistic Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Analyzes writing patterns, readability scores, and suspicious language indicators 
                  commonly found in misleading content.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="float-medium border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-500 magical-glow group cursor-pointer" style={{ animationDelay: '0.5s' }}>
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:animate-float-intense transition-all duration-300">
                  <Target className="w-6 h-6 text-primary group-hover:animate-pulse" />
                </div>
                <CardTitle className="text-xl group-hover:aurora-text transition-all duration-300">Ensemble Modeling</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Combines multiple machine learning models including Naive Bayes, Random Forest, 
                  and XGBoost for enhanced accuracy.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="float-intense border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-500 magical-glow group cursor-pointer" style={{ animationDelay: '1s' }}>
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:animate-float-gentle transition-all duration-300">
                  <Zap className="w-6 h-6 text-primary group-hover:animate-pulse" />
                </div>
                <CardTitle className="text-xl group-hover:aurora-text transition-all duration-300">Real-time Processing</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Get instant results with confidence scores and detailed probability 
                  breakdowns for immediate verification.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Main Application */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Try It Now</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Enter any news article, headline, or social media post to analyze its authenticity
            </p>
          </div>
          
          <NewsDetector />
        </div>
      </section>

      {/* Integration Guide */}
      <section className="py-16 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Backend Integration</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Connect your Python AI model to this frontend for real-time fake news detection
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <IntegrationGuide />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/20 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center text-muted-foreground">
            <p className="mb-2">
              <strong>Disclaimer:</strong> This tool provides analysis based on linguistic patterns and should be used 
              alongside other verification methods. Always fact-check important news through multiple trusted sources.
            </p>
            <p className="text-sm">
              Built with advanced machine learning • Powered by ensemble AI models
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
