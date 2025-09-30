import { useState } from "react";
import { Button } from "@/components/ui/button";
import { NFTCard } from "@/components/NFTCard";
import { MutationModal } from "@/components/MutationModal";
import { Badge } from "@/components/ui/badge";
import { Zap, Plus, TrendingUp, History } from "lucide-react";
import mysticOwlImg from "@/assets/mystic-owl.jpg";
import cyberPhoenixImg from "@/assets/cyber-phoenix.jpg";
import digitalDragonImg from "@/assets/digital-dragon.jpg";
import neonWolfImg from "@/assets/neon-wolf.jpg";

const mockOwnedNFTs = [
  {
    id: "owned-1",
    name: "Mystic Owl",
    image: mysticOwlImg,
    tags: ["mystic", "owl", "wisdom"],
    evolutionCount: 2
  },
  {
    id: "owned-2", 
    name: "Fire Sprite",
    image: cyberPhoenixImg,
    tags: ["fire", "sprite", "magical"],
    evolutionCount: 0
  },
  {
    id: "owned-3",
    name: "Ocean Guardian",
    image: digitalDragonImg,
    tags: ["ocean", "guardian", "blue"],
    evolutionCount: 1
  },
  {
    id: "owned-4",
    name: "Star Wanderer",
    image: neonWolfImg,
    tags: ["star", "cosmic", "traveler"],
    evolutionCount: 3
  }
];

export default function MyNFTs() {
  const [selectedNFT, setSelectedNFT] = useState<typeof mockOwnedNFTs[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEvolveNFT = (nft: typeof mockOwnedNFTs[0]) => {
    setSelectedNFT(nft);
    setIsModalOpen(true);
  };

  const totalEvolutions = mockOwnedNFTs.reduce((sum, nft) => sum + nft.evolutionCount, 0);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-evolution bg-clip-text text-transparent">
            My NFT Collection
          </h1>
          <p className="text-muted-foreground text-lg mb-6">
            Manage and evolve your digital collectibles
          </p>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-gradient-card border border-primary/20 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-primary mb-1">{mockOwnedNFTs.length}</div>
              <div className="text-sm text-muted-foreground">NFTs Owned</div>
            </div>
            <div className="bg-gradient-card border border-secondary/20 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-secondary mb-1">{totalEvolutions}</div>
              <div className="text-sm text-muted-foreground">Total Evolutions</div>
            </div>
            <div className="bg-gradient-card border border-accent/20 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-accent mb-1">12.5</div>
              <div className="text-sm text-muted-foreground">ETH Value</div>
            </div>
            <div className="bg-gradient-card border border-primary/20 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-primary mb-1">+24%</div>
              <div className="text-sm text-muted-foreground">This Month</div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-8 flex flex-wrap gap-4">
          <Button variant="wallet" className="flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>Buy More NFTs</span>
          </Button>
          <Button variant="outline" className="flex items-center space-x-2">
            <TrendingUp className="h-4 w-4" />
            <span>Portfolio Analytics</span>
          </Button>
          <Button variant="ghost" className="flex items-center space-x-2">
            <History className="h-4 w-4" />
            <span>Evolution History</span>
          </Button>
        </div>

        {/* NFT Collection */}
        {mockOwnedNFTs.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {mockOwnedNFTs.map((nft) => (
              <div key={nft.id} className="relative">
                {nft.evolutionCount > 0 && (
                  <Badge 
                    variant="secondary" 
                    className="absolute -top-2 -right-2 z-10 bg-gradient-to-r from-secondary to-secondary-glow text-secondary-foreground shadow-mutation"
                  >
                    {nft.evolutionCount} Evolution{nft.evolutionCount !== 1 ? 's' : ''}
                  </Badge>
                )}
                <NFTCard
                  {...nft}
                  isOwned={true}
                  actionLabel="Evolve NFT"
                  onAction={() => handleEvolveNFT(nft)}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-primary rounded-full flex items-center justify-center opacity-50">
              <Zap className="h-12 w-12 text-primary-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-foreground">No NFTs Yet</h3>
            <p className="text-muted-foreground mb-6">
              Start your collection by purchasing NFTs from the marketplace
            </p>
            <Button variant="wallet">
              <Plus className="h-4 w-4 mr-2" />
              Browse Marketplace
            </Button>
          </div>
        )}

        {/* Evolution Tips */}
        <div className="mt-12 bg-gradient-card border border-primary/20 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-3 text-foreground flex items-center">
            <Zap className="h-5 w-5 mr-2 text-primary" />
            Evolution Tips
          </h3>
          <ul className="space-y-2 text-muted-foreground">
            <li>• Add descriptive tags to guide the AI evolution process</li>
            <li>• Each evolution creates a unique, one-of-a-kind variant</li>
            <li>• You can auction evolved NFTs or keep them in your collection</li>
            <li>• Rare traits have higher chances of creating valuable evolutions</li>
          </ul>
        </div>
      </div>

      {/* Mutation Modal */}
      <MutationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        nft={selectedNFT}
      />
    </div>
  );
}