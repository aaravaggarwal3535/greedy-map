import React, { useState } from 'react';
import { usePremium } from '@/contexts/PremiumContext';
import { Button } from '@/components/ui/button';
import { Crown, Lock } from 'lucide-react';
import PremiumModal from './PremiumModal';

const PremiumStatus = () => {
  const { hasPremium, removePremium } = usePremium();
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  
  if (hasPremium) {
    return (
      <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-white">
        <Crown className="h-3.5 w-3.5" />
        <span className="text-xs font-medium">Premium</span>
        <Button 
          variant="link" 
          size="sm" 
          className="h-auto p-0 text-white hover:no-underline ml-1 text-xs"
          onClick={removePremium} // For testing purposes
        >
          (Reset)
        </Button>
      </div>
    );
  }
  
  return (
    <>
      <Button 
        variant="outline" 
        size="sm" 
        className="rounded-full flex items-center gap-1.5 border-amber-300 text-amber-700 hover:bg-amber-50"
        onClick={handleOpenModal}
      >
        <Lock className="h-3.5 w-3.5" />
        <span>Premium</span>
      </Button>
      
      <PremiumModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal}
      />
    </>
  );
};

export default PremiumStatus;
