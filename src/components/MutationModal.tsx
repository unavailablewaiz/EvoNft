import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Zap, Loader2, Sparkles, Gavel, Heart } from "lucide-react";

interface MutationModalProps {
  isOpen: boolean;
  onClose: () => void;
  nft: {
    id: string;
    name: string;
    image: string;
    tags: string[];
  } | null;
}

export const MutationModal = ({ isOpen, onClose, nft }: MutationModalProps) => {
  const [newTags, setNewTags] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [showDecision, setShowDecision] = useState(false);

  const handleGenerate = async () => {
    if (!nft) return;
    
    setIsGenerating(true);
    
    // Simulate AI generation delay
    setTimeout(() => {
      setGeneratedImage("/placeholder.svg"); // In real app, this would be the AI-generated image
      setIsGenerating(false);
      setShowDecision(true);
    }, 3000);
  };

  const handleKeep = () => {
    // Handle keep NFT logic
    onClose();
    resetModal();
  };

  const handleAuction = () => {
    // Handle auction logic
    onClose();
    resetModal();
  };

  const resetModal = () => {
    setNewTags("");
    setIsGenerating(false);
    setGeneratedImage(null);
    setShowDecision(false);
  };

  if (!nft) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-gradient-card border-primary/30">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-evolution bg-clip-text text-transparent">
            Evolve Your NFT
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Add new characteristics to evolve "{nft.name}" into something unique
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Original NFT */}
          <div className="flex space-x-4">
            <img
              src={nft.image}
              alt={nft.name}
              className="w-32 h-32 rounded-lg object-cover border border-primary/30"
            />
            <div className="flex-1">
              <h3 className="text-lg font-semibold mb-2">{nft.name}</h3>
              <div className="flex flex-wrap gap-1">
                {nft.tags.map((tag, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Evolution Input */}
          {!isGenerating && !generatedImage && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="new-tags" className="text-sm font-medium">
                  Add Evolution Tags (optional)
                </Label>
                <Input
                  id="new-tags"
                  placeholder="e.g., glowing, mechanical, ethereal..."
                  value={newTags}
                  onChange={(e) => setNewTags(e.target.value)}
                  className="mt-2 bg-card border-primary/30 focus:border-primary"
                />
              </div>
              <Button
                onClick={handleGenerate}
                variant="evolution"
                className="w-full"
              >
                <Zap className="h-4 w-4" />
                Begin Evolution
              </Button>
            </div>
          )}

          {/* Generation Progress */}
          {isGenerating && (
            <div className="text-center space-y-4 py-8">
              <div className="relative mx-auto w-24 h-24">
                <div className="absolute inset-0 rounded-full border-4 border-primary/30"></div>
                <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
                <Sparkles className="absolute inset-0 m-auto h-8 w-8 text-primary animate-pulse" />
              </div>
              <div className="space-y-2">
                <p className="text-lg font-semibold text-primary">Evolution in Progress...</p>
                <p className="text-muted-foreground">AI is generating your evolved NFT</p>
              </div>
            </div>
          )}

          {/* Generated Result */}
          {generatedImage && showDecision && (
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-lg font-semibold mb-4 text-primary">Evolution Complete!</h3>
                <div className="relative inline-block">
                  <img
                    src={generatedImage}
                    alt="Evolved NFT"
                    className="w-48 h-48 rounded-lg object-cover border-2 border-primary shadow-glow"
                  />
                  <div className="absolute -top-2 -right-2 bg-accent text-accent-foreground rounded-full w-8 h-8 flex items-center justify-center">
                    <Sparkles className="h-4 w-4" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Button onClick={handleKeep} variant="outline" className="flex items-center space-x-2">
                  <Heart className="h-4 w-4" />
                  <span>Keep Evolution</span>
                </Button>
                <Button onClick={handleAuction} variant="secondary" className="flex items-center space-x-2">
                  <Gavel className="h-4 w-4" />
                  <span>Auction It</span>
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
