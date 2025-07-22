import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { AlertTriangle, CheckCircle, Search, Loader2, Shield, TrendingUp, Settings } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { newsAnalysisService, type AnalysisResult } from '@/services/newsAnalysis';
import ApiConfigDialog from '@/components/ApiConfigDialog';


interface NewsDetectorProps {
  onAnalyze?: (text: string) => Promise<AnalysisResult>;
}

const NewsDetector: React.FC<NewsDetectorProps> = ({ onAnalyze }) => {
  const [newsText, setNewsText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [isApiConfigOpen, setIsApiConfigOpen] = useState(false);
  const [useRealApi, setUseRealApi] = useState(false);
  const { toast } = useToast();

  // Mock analysis function for demonstration
  const mockAnalyze = async (text: string): Promise<AnalysisResult> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Simple mock logic based on text characteristics
    const hasClickbaitWords = /shocking|unbelievable|you won't believe|miracle|secret|exposed/i.test(text);
    const hasExcessiveCaps = (text.match(/[A-Z]/g) || []).length / text.length > 0.3;
    const hasExcessiveExclamation = (text.match(/!/g) || []).length > 2;
    
    const suspiciousFeatures = [hasClickbaitWords, hasExcessiveCaps, hasExcessiveExclamation].filter(Boolean).length;
    
    let fakeProb = Math.min(0.9, suspiciousFeatures * 0.25 + Math.random() * 0.3);
    if (suspiciousFeatures === 0) {
      fakeProb = Math.random() * 0.4; // Lower probability for non-suspicious text
    }
    
    const realProb = 1 - fakeProb;
    const prediction = fakeProb > realProb ? 'Fake' : 'Real';
    const confidence = Math.max(fakeProb, realProb);
    
    // Generate advanced analysis for demo mode
    const words = text.toLowerCase().split(/\s+/).filter(word => word.length > 0);
    const biasWords = ['shocking', 'unbelievable', 'amazing', 'incredible', 'breaking', 'exposed'];
    const biasIndicators = biasWords.filter(word => text.toLowerCase().includes(word));
    
    return {
      prediction,
      confidence,
      probabilities: {
        fake: fakeProb,
        real: realProb
      },
      modelScores: {
        'Naive Bayes': { prediction: fakeProb > 0.6 ? 'Fake' : 'Real', confidence: Math.random() * 0.3 + 0.7, weight: 0.8 },
        'Random Forest': { prediction, confidence: confidence * 0.9, weight: 1.0 },
        'Logistic Regression': { prediction, confidence: confidence * 0.95, weight: 0.9 },
        'SVM': { prediction: fakeProb > 0.55 ? 'Fake' : 'Real', confidence: Math.random() * 0.2 + 0.8, weight: 0.85 },
        'XGBoost': { prediction, confidence: confidence * 1.05, weight: 1.1 }
      },
      textMetrics: {
        wordCount: words.length,
        readabilityScore: Math.max(20, Math.min(80, 60 - biasIndicators.length * 15)),
        sentimentScore: Math.random() * 0.4 - 0.2,
        biasIndicators,
        confidenceFactors: words.length < 10 ? ['Very short text'] : biasIndicators.length > 0 ? ['Bias language detected'] : []
      },
      riskLevel: biasIndicators.length > 2 ? 'High' : biasIndicators.length > 0 ? 'Medium' : 'Low' as 'Low' | 'Medium' | 'High' | 'Critical'
    };
  };

  const analyzeWithRealApi = async (text: string): Promise<AnalysisResult> => {
    try {
      return await newsAnalysisService.analyzeNews(text);
    } catch (error) {
      // Fallback to mock if API fails
      console.warn('API call failed, falling back to mock analysis:', error);
      toast({
        title: "API Connection Failed",
        description: "Using mock analysis. Configure API connection in settings.",
        variant: "destructive",
      });
      return await mockAnalyze(text);
    }
  };

  const handleAnalyze = async () => {
    if (!newsText.trim()) {
      toast({
        title: "Input Required",
        description: "Please enter a news article or headline to analyze.",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    setResult(null);

    try {
      let analysisResult: AnalysisResult;
      
      if (onAnalyze) {
        analysisResult = await onAnalyze(newsText);
      } else if (useRealApi) {
        analysisResult = await analyzeWithRealApi(newsText);
      } else {
        analysisResult = await mockAnalyze(newsText);
      }
      
      setResult(analysisResult);
      
      toast({
        title: "Analysis Complete",
        description: `The article appears to be ${analysisResult.prediction.toLowerCase()} with ${(analysisResult.confidence * 100).toFixed(1)}% confidence.`,
      });
    } catch (error) {
      toast({
        title: "Analysis Failed",
        description: "There was an error analyzing the news. Please try again.",
        variant: "destructive",
      });
      console.error('Analysis error:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleExampleClick = (example: string) => {
    setNewsText(example);
    setResult(null);
  };

  const exampleNews = [
    {
      type: 'suspicious',
      text: "SHOCKING: Scientists discover aliens living among us! Government covers up the truth!",
      label: "Suspicious Example"
    },
    {
      type: 'legitimate',
      text: "The Federal Reserve announced a 0.25% interest rate increase following their monthly meeting to address current economic conditions.",
      label: "Legitimate Example"
    }
  ];

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Input Section */}
      <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            News Analysis Input
          </CardTitle>
          <CardDescription>
            Enter a news article, headline, or social media post to analyze its authenticity
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="Paste your news article, headline, or text here for analysis..."
            value={newsText}
            onChange={(e) => setNewsText(e.target.value)}
            className="min-h-32 resize-none"
            disabled={isAnalyzing}
          />
          
          <div className="flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="text-sm text-muted-foreground">
                {newsText.length} characters
              </div>
              <Badge variant={useRealApi ? "secondary" : "outline"} className="text-xs">
                {useRealApi ? "AI Backend" : "Demo Mode"}
              </Badge>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={() => setIsApiConfigOpen(true)}
                variant="outline"
                size="sm"
                disabled={isAnalyzing}
              >
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Button>
              <Button
                onClick={handleAnalyze}
                disabled={isAnalyzing || !newsText.trim()}
                className="bg-primary hover:bg-primary/90"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Shield className="mr-2 h-4 w-4" />
                    Analyze News
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Example Articles */}
          <div className="space-y-2">
            <div className="text-sm font-medium text-muted-foreground">Try these examples:</div>
            <div className="grid gap-2">
              {exampleNews.map((example, index) => (
                <Card
                  key={index}
                  className="p-3 cursor-pointer hover:bg-accent/50 transition-colors border-dashed"
                  onClick={() => handleExampleClick(example.text)}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <Badge 
                        variant={example.type === 'suspicious' ? 'destructive' : 'secondary'}
                        className="mb-2"
                      >
                        {example.label}
                      </Badge>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        "{example.text}"
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results Section */}
      {result && (
        <Card className={`border-2 animate-fade-in ${
          result.prediction === 'Real' 
            ? 'border-success bg-success/5' 
            : 'border-danger bg-danger/5'
        }`}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {result.prediction === 'Real' ? (
                <CheckCircle className="h-5 w-5 text-success" />
              ) : (
                <AlertTriangle className="h-5 w-5 text-danger" />
              )}
              Analysis Results
            </CardTitle>
            <CardDescription>
              AI-powered authenticity analysis completed
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Main Result */}
            <div className="text-center space-y-2">
              <Badge 
                variant={result.prediction === 'Real' ? 'secondary' : 'destructive'}
                className="text-lg px-4 py-2"
              >
                {result.prediction === 'Real' ? 'Likely Authentic' : 'Likely Fake/Misleading'}
              </Badge>
              <p className="text-sm text-muted-foreground">
                Confidence: {(result.confidence * 100).toFixed(1)}%
              </p>
            </div>

            {/* Probability Breakdown */}
            <div className="space-y-4">
              <h4 className="text-sm font-medium flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Probability Breakdown
              </h4>
              
              <div className="space-y-3">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-danger">Fake/Misleading</span>
                    <span className="font-medium">{(result.probabilities.fake * 100).toFixed(1)}%</span>
                  </div>
                  <Progress 
                    value={result.probabilities.fake * 100} 
                    className="h-2"
                    style={
                      {
                        '--progress-background': 'hsl(var(--danger))',
                      } as React.CSSProperties
                    }
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-success">Authentic/Real</span>
                    <span className="font-medium">{(result.probabilities.real * 100).toFixed(1)}%</span>
                  </div>
                  <Progress 
                    value={result.probabilities.real * 100} 
                    className="h-2"
                    style={
                      {
                        '--progress-background': 'hsl(var(--success))',
                      } as React.CSSProperties
                    }
                  />
                </div>
              </div>
            </div>

            {/* Risk Level and Text Metrics */}
            <div className="grid md:grid-cols-2 gap-4">
              {/* Risk Assessment */}
              <div className="space-y-3">
                <h4 className="text-sm font-medium flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4" />
                  Risk Assessment
                </h4>
                <div className="space-y-2">
                  <Badge 
                    variant={
                      result.riskLevel === 'Critical' ? 'destructive' :
                      result.riskLevel === 'High' ? 'destructive' :
                      result.riskLevel === 'Medium' ? 'secondary' : 'outline'
                    }
                    className="px-3 py-1"
                  >
                    {result.riskLevel} Risk
                  </Badge>
                  {result.textMetrics.biasIndicators.length > 0 && (
                    <div className="text-xs space-y-1">
                      <p className="text-muted-foreground">Bias indicators found:</p>
                      <div className="flex flex-wrap gap-1">
                        {result.textMetrics.biasIndicators.map((indicator, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {indicator}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Text Metrics */}
              <div className="space-y-3">
                <h4 className="text-sm font-medium">Text Analysis</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Word Count:</span>
                    <span className="font-medium">{result.textMetrics.wordCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Readability Score:</span>
                    <span className="font-medium">{result.textMetrics.readabilityScore}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Sentiment:</span>
                    <span className={`font-medium ${result.textMetrics.sentimentScore > 0 ? 'text-success' : result.textMetrics.sentimentScore < 0 ? 'text-danger' : ''}`}>
                      {result.textMetrics.sentimentScore > 0 ? 'Positive' : result.textMetrics.sentimentScore < 0 ? 'Negative' : 'Neutral'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Model Ensemble Results */}
            {result.modelScores && Object.keys(result.modelScores).length > 0 && (
              <div className="space-y-4">
                <h4 className="text-sm font-medium flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  Model Ensemble Analysis
                </h4>
                <div className="grid gap-3">
                  {Object.entries(result.modelScores).map(([modelName, score]) => (
                    <div key={modelName} className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Badge variant="outline" className="text-xs min-w-fit">
                          {modelName}
                        </Badge>
                        <span className={`text-sm font-medium ${score.prediction === 'Real' ? 'text-success' : 'text-danger'}`}>
                          {score.prediction}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">
                          {(score.confidence * 100).toFixed(0)}%
                        </span>
                        <div className="w-12 h-2 bg-muted rounded-full overflow-hidden">
                          <div 
                            className={`h-full transition-all duration-500 ${score.prediction === 'Real' ? 'bg-success' : 'bg-danger'}`}
                            style={{ width: `${score.confidence * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Confidence Factors */}
            {result.textMetrics.confidenceFactors.length > 0 && (
              <div className="space-y-3">
                <h4 className="text-sm font-medium">Confidence Factors</h4>
                <div className="space-y-2">
                  {result.textMetrics.confidenceFactors.map((factor, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 bg-warning rounded-full" />
                      <span className="text-muted-foreground">{factor}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Analysis Notes */}
            <div className="bg-muted/20 p-4 rounded-lg">
              <h4 className="text-sm font-medium mb-2">Advanced AI Analysis</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Multi-model ensemble prediction with weighted voting</li>
                <li>• Advanced linguistic feature extraction and bias detection</li>
                <li>• Readability analysis and sentiment evaluation</li>
                <li>• Results should be verified with trusted news sources</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      )}

      {/* API Configuration Dialog */}
      <ApiConfigDialog 
        open={isApiConfigOpen} 
        onOpenChange={(open) => {
          setIsApiConfigOpen(open);
          if (!open) {
            // Check if we should enable real API mode
            setUseRealApi(true);
          }
        }} 
      />
    </div>
  );
};

export default NewsDetector;