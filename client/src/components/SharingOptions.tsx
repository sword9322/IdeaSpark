import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

interface SharingOptionsProps {
  id: string;
}

export default function SharingOptions({ id }: SharingOptionsProps) {
  const [isCopied, setIsCopied] = useState(false);
  
  // Create full URL for sharing
  const shareUrl = `${window.location.origin}/ideas/${id}`;
  
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setIsCopied(true);
      toast({
        title: "Link copied",
        description: "The shareable link has been copied to your clipboard.",
      });
      
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Could not copy the link. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  const handleTwitterShare = () => {
    const text = encodeURIComponent(`Check out these AI-generated ideas! ${shareUrl}`);
    window.open(`https://twitter.com/intent/tweet?text=${text}`, '_blank');
  };
  
  const handleFacebookShare = () => {
    const url = encodeURIComponent(shareUrl);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
  };
  
  return (
    <div className="pt-4 border-t border-gray-100">
      <h3 className="text-md font-medium text-gray-700 mb-3">Share these ideas:</h3>
      
      <div className="flex flex-col sm:flex-row gap-2 mb-4">
        <Input
          type="text"
          className="flex-grow p-2 text-sm border border-gray-300 rounded-lg bg-gray-50 focus:outline-none"
          value={shareUrl}
          readOnly
        />
        <Button 
          onClick={handleCopyLink}
          className={`sm:flex-shrink-0 text-white text-sm font-medium py-2 px-4 rounded-lg transition duration-200 ${
            isCopied ? 'bg-green-500' : 'bg-teal-500 hover:bg-teal-600'
          }`}
        >
          {isCopied ? "Copied!" : "Copy Link"}
        </Button>
      </div>
      
      <div className="flex space-x-3">
        <Button
          onClick={handleTwitterShare}
          className="flex items-center justify-center px-3 py-2 bg-[#1DA1F2] text-white rounded-lg text-sm hover:bg-opacity-90 transition duration-200"
        >
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
          </svg>
          Share on Twitter
        </Button>
        <Button
          onClick={handleFacebookShare}
          className="flex items-center justify-center px-3 py-2 bg-[#1877F2] text-white rounded-lg text-sm hover:bg-opacity-90 transition duration-200"
        >
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path>
          </svg>
          Share on Facebook
        </Button>
      </div>
    </div>
  );
}
