import React from 'react';
import NewsDetector from '@/components/NewsDetector';
import IntegrationGuide from '@/components/IntegrationGuide';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, Zap, Target, Users } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-screen flex items-center">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-transparent" />
        
        <div className="relative container mx-auto px-4 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Badge variant="secondary" className="w-fit">
                <Zap className="w-3 h-3 mr-1" />
                AI-Powered Detection
              </Badge>
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                Advanced{' '}
                <span className="text-primary">
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
            <div className="relative">
              <div className="bg-card border rounded-2xl p-8 text-center">
                <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-12 h-12 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">AI Detection System</h3>
                <p className="text-muted-foreground">Real-time analysis using advanced ML algorithms</p>
              </div>
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
            <Card className="hover:shadow-lg transition-all duration-300">
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-xl">Linguistic Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Analyzes writing patterns, readability scores, and suspicious language indicators 
                  commonly found in misleading content.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300">
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Target className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-xl">Ensemble Modeling</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Combines multiple machine learning models including Naive Bayes, Random Forest, 
                  and XGBoost for enhanced accuracy.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300">
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-xl">Real-time Processing</CardTitle>
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
