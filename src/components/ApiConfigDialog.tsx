import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, Loader2, Server } from 'lucide-react';
import { newsAnalysisService } from '@/services/newsAnalysis';
import { useToast } from '@/hooks/use-toast';

interface ApiConfigDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ApiConfigDialog: React.FC<ApiConfigDialogProps> = ({ open, onOpenChange }) => {
  const [apiUrl, setApiUrl] = useState('http://localhost:5000');
  const [isChecking, setIsChecking] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'unknown' | 'connected' | 'disconnected'>('unknown');
  const [availableModels, setAvailableModels] = useState<string[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    if (open) {
      checkConnection();
    }
  }, [open]);

  const checkConnection = async () => {
    setIsChecking(true);
    try {
      const isHealthy = await newsAnalysisService.checkHealth();
      setConnectionStatus(isHealthy ? 'connected' : 'disconnected');
      
      if (isHealthy) {
        const models = await newsAnalysisService.getAvailableModels();
        setAvailableModels(models);
        toast({
          title: "Connection Successful",
          description: "Successfully connected to the news analysis API.",
        });
      } else {
        toast({
          title: "Connection Failed",
          description: "Could not connect to the API. Make sure your Python backend is running.",
          variant: "destructive",
        });
      }
    } catch (error) {
      setConnectionStatus('disconnected');
      toast({
        title: "Connection Error",
        description: "Error checking API connection. Please verify the URL and try again.",
        variant: "destructive",
      });
    } finally {
      setIsChecking(false);
    }
  };

  const handleSave = () => {
    newsAnalysisService.setBaseUrl(apiUrl);
    toast({
      title: "Configuration Saved",
      description: `API URL updated to: ${apiUrl}`,
    });
    onOpenChange(false);
  };

  const handleTestConnection = async () => {
    if (apiUrl !== newsAnalysisService['baseUrl']) {
      newsAnalysisService.setBaseUrl(apiUrl);
    }
    await checkConnection();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Server className="h-5 w-5" />
            API Configuration
          </DialogTitle>
          <DialogDescription>
            Configure the connection to your Python fake news detection backend.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="api-url">API Base URL</Label>
            <Input
              id="api-url"
              value={apiUrl}
              onChange={(e) => setApiUrl(e.target.value)}
              placeholder="http://localhost:5000"
            />
          </div>

          <div className="flex items-center gap-2">
            <Button
              onClick={handleTestConnection}
              disabled={isChecking}
              variant="outline"
              size="sm"
            >
              {isChecking ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Testing...
                </>
              ) : (
                'Test Connection'
              )}
            </Button>
            
            {connectionStatus !== 'unknown' && (
              <Badge 
                variant={connectionStatus === 'connected' ? 'secondary' : 'destructive'}
                className="flex items-center gap-1"
              >
                {connectionStatus === 'connected' ? (
                  <>
                    <CheckCircle className="h-3 w-3" />
                    Connected
                  </>
                ) : (
                  <>
                    <XCircle className="h-3 w-3" />
                    Disconnected
                  </>
                )}
              </Badge>
            )}
          </div>

          {availableModels.length > 0 && (
            <div className="space-y-2">
              <Label>Available Models</Label>
              <div className="flex flex-wrap gap-1">
                {availableModels.map((model) => (
                  <Badge key={model} variant="outline" className="text-xs">
                    {model}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          <div className="bg-muted/20 p-3 rounded-md text-sm text-muted-foreground">
            <h4 className="font-medium mb-1">Setup Instructions:</h4>
            <ol className="list-decimal list-inside space-y-1 text-xs">
              <li>Run your Python fake news detector script</li>
              <li>Ensure Flask is running on the specified URL</li>
              <li>Make sure CORS is enabled for web requests</li>
              <li>Test the connection before analyzing news</li>
            </ol>
          </div>
        </div>

        <DialogFooter>
          <Button onClick={handleSave} disabled={isChecking}>
            Save Configuration
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ApiConfigDialog;