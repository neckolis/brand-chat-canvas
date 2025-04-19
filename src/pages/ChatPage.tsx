
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import ChatWindow from '@/components/ChatWindow';
import ChatInput from '@/components/ChatInput';
import PageLayout from '@/components/PageLayout';
import { useFiles } from '@/contexts/FileContext';
import { Message } from '@/types/chat';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft } from 'lucide-react';

interface ChatPageProps {
  logoUrl?: string;
}

const ChatPage = ({ logoUrl }: ChatPageProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { uploadedFiles } = useFiles();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Redirect if no files are uploaded
  useEffect(() => {
    if (uploadedFiles.length === 0) {
      toast({
        title: "No documents found",
        description: "Please upload documents before chatting.",
        variant: "destructive",
      });
      navigate('/');
    }
  }, [uploadedFiles, navigate, toast]);

  const handleSendMessage = (content: string) => {
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    
    // Simulate AI response
    setTimeout(() => {
      // Generate a simple response
      const aiResponse = generateMockResponse(content);
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: aiResponse,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1500);
  };
  
  // Mock response generator - would be replaced with actual API call
  const generateMockResponse = (query: string): string => {
    const responses = [
      `Based on the documents you've uploaded, I can provide information related to your query about "${query}".`,
      `I've analyzed your documents and found relevant information about "${query}". Let me elaborate...`,
      `The documents you shared mention "${query}" in several contexts. Here's what I found...`,
      `According to the uploaded documents, "${query}" is discussed on pages 3-5. The key points are...`,
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  return (
    <PageLayout logoUrl={logoUrl} hideFooter>
      <div className="flex flex-col h-full">
        <div className="p-4 border-b bg-background/80 backdrop-blur-sm">
          <div className="container mx-auto flex items-center justify-between">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate('/')}
              className="flex items-center gap-1"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back</span>
            </Button>
            
            <div className="text-sm text-muted-foreground">
              {uploadedFiles.length} document{uploadedFiles.length !== 1 ? 's' : ''} uploaded
            </div>
          </div>
        </div>
        
        <div className="flex-1 flex flex-col overflow-hidden">
          <ChatWindow messages={messages} isLoading={isLoading} />
          <ChatInput onSendMessage={handleSendMessage} disabled={isLoading} />
        </div>
        
        <div className="p-2 border-t">
          <BrandFooter variant="minimal" />
        </div>
      </div>
    </PageLayout>
  );
};

import BrandFooter from '@/components/BrandFooter';

export default ChatPage;
