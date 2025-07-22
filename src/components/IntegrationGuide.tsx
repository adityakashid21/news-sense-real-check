import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Code, 
  Terminal, 
  Server, 
  Download, 
  Copy, 
  ExternalLink,
  CheckCircle
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const IntegrationGuide: React.FC = () => {
  const { toast } = useToast();

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Copied!",
        description: `${label} copied to clipboard.`,
      });
    } catch (err) {
      toast({
        title: "Copy failed",
        description: "Please copy the text manually.",
        variant: "destructive",
      });
    }
  };

  const flaskCorsCode = `from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Or for specific origins:
# CORS(app, origins=['http://localhost:8080'])`;

  const healthEndpoint = `@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'healthy'}), 200

@app.route('/models', methods=['GET'])
def get_models():
    model_names = list(detector.models.keys())
    return jsonify({'models': model_names}), 200`;

  const requirements = `flask==2.3.2
flask-cors==4.0.0
pandas==2.0.3
numpy==1.24.3
scikit-learn==1.3.0
nltk==3.8.1
textstat==0.7.3
xgboost==1.7.6`;

  return (
    <div className="space-y-6">
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Server className="h-5 w-5" />
            Backend Integration Guide
          </CardTitle>
          <CardDescription>
            Instructions to connect your Python fake news detection model with this frontend
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Step 1: CORS Setup */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="w-8 h-8 rounded-full p-0 flex items-center justify-center">
                1
              </Badge>
              <h3 className="text-lg font-semibold">Enable CORS in your Flask app</h3>
            </div>
            <p className="text-sm text-muted-foreground ml-10">
              Install and configure CORS to allow web requests from this frontend.
            </p>
            <div className="ml-10 space-y-2">
              <div className="bg-muted p-3 rounded-md font-mono text-sm">
                pip install flask-cors
              </div>
              <div className="bg-muted p-3 rounded-md relative">
                <Button
                  size="sm"
                  variant="ghost"
                  className="absolute right-2 top-2 h-8 w-8 p-0"
                  onClick={() => copyToClipboard(flaskCorsCode, "CORS configuration")}
                >
                  <Copy className="h-4 w-4" />
                </Button>
                <pre className="text-sm overflow-x-auto">
                  <code>{flaskCorsCode}</code>
                </pre>
              </div>
            </div>
          </div>

          {/* Step 2: Additional Endpoints */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="w-8 h-8 rounded-full p-0 flex items-center justify-center">
                2
              </Badge>
              <h3 className="text-lg font-semibold">Add health check and model endpoints</h3>
            </div>
            <p className="text-sm text-muted-foreground ml-10">
              Add these endpoints to your Flask app for better integration.
            </p>
            <div className="ml-10">
              <div className="bg-muted p-3 rounded-md relative">
                <Button
                  size="sm"
                  variant="ghost"
                  className="absolute right-2 top-2 h-8 w-8 p-0"
                  onClick={() => copyToClipboard(healthEndpoint, "Health endpoints")}
                >
                  <Copy className="h-4 w-4" />
                </Button>
                <pre className="text-sm overflow-x-auto">
                  <code>{healthEndpoint}</code>
                </pre>
              </div>
            </div>
          </div>

          {/* Step 3: Requirements */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="w-8 h-8 rounded-full p-0 flex items-center justify-center">
                3
              </Badge>
              <h3 className="text-lg font-semibold">Install required dependencies</h3>
            </div>
            <p className="text-sm text-muted-foreground ml-10">
              Create a requirements.txt file with these dependencies.
            </p>
            <div className="ml-10">
              <div className="bg-muted p-3 rounded-md relative">
                <Button
                  size="sm"
                  variant="ghost"
                  className="absolute right-2 top-2 h-8 w-8 p-0"
                  onClick={() => copyToClipboard(requirements, "Requirements.txt")}
                >
                  <Copy className="h-4 w-4" />
                </Button>
                <pre className="text-sm overflow-x-auto">
                  <code>{requirements}</code>
                </pre>
              </div>
            </div>
          </div>

          {/* Step 4: Run Instructions */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="w-8 h-8 rounded-full p-0 flex items-center justify-center">
                4
              </Badge>
              <h3 className="text-lg font-semibold">Start your Flask backend</h3>
            </div>
            <div className="ml-10 space-y-2">
              <div className="bg-muted p-3 rounded-md font-mono text-sm">
                pip install -r requirements.txt
              </div>
              <div className="bg-muted p-3 rounded-md font-mono text-sm">
                python fake_news_detector.py
              </div>
              <p className="text-sm text-muted-foreground">
                Your Flask app should be running on <code className="bg-muted px-1 rounded">http://localhost:5000</code>
              </p>
            </div>
          </div>

          {/* Step 5: Connect Frontend */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="w-8 h-8 rounded-full p-0 flex items-center justify-center">
                5
              </Badge>
              <h3 className="text-lg font-semibold">Configure frontend connection</h3>
            </div>
            <div className="ml-10 space-y-2">
              <p className="text-sm text-muted-foreground">
                Click the "Settings" button in the news analyzer and enter your backend URL.
                Test the connection to ensure everything is working correctly.
              </p>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="h-4 w-4 text-success" />
                <span>Default URL: http://localhost:5000</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Troubleshooting */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Terminal className="h-5 w-5" />
            Troubleshooting
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h4 className="font-medium">Common Issues:</h4>
            <ul className="text-sm text-muted-foreground space-y-2 list-disc list-inside">
              <li><strong>CORS errors:</strong> Make sure flask-cors is installed and properly configured</li>
              <li><strong>Connection refused:</strong> Verify your Flask app is running on the correct port</li>
              <li><strong>Model not found:</strong> Ensure the pickle file is in the same directory as your script</li>
              <li><strong>Missing dependencies:</strong> Install all required packages using pip</li>
              <li><strong>NLTK data errors:</strong> The script will automatically download required NLTK data</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* API Reference */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code className="h-5 w-5" />
            API Reference
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div>
              <Badge variant="secondary" className="mb-2">POST /predict</Badge>
              <div className="bg-muted p-3 rounded-md text-sm">
                <strong>Request:</strong>
                <pre className="mt-1">{`{
  "text": "Your news article text here",
  "model_name": "Ensemble" // optional
}`}</pre>
                <strong className="block mt-2">Response:</strong>
                <pre className="mt-1">{`{
  "prediction": "Real" | "Fake",
  "confidence": 0.85,
  "probabilities": {
    "fake": 0.15,
    "real": 0.85
  }
}`}</pre>
              </div>
            </div>
            
            <div>
              <Badge variant="secondary" className="mb-2">GET /health</Badge>
              <div className="bg-muted p-3 rounded-md text-sm">
                Returns server health status
              </div>
            </div>
            
            <div>
              <Badge variant="secondary" className="mb-2">GET /models</Badge>
              <div className="bg-muted p-3 rounded-md text-sm">
                Returns list of available models
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default IntegrationGuide;