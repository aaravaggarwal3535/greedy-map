import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Check } from 'lucide-react';
import { toast } from 'sonner';
import { usePremium } from '@/contexts/PremiumContext';

const PremiumModal = ({ isOpen, onClose }) => {
  const { unlockPremium } = usePremium();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiry: '',
    cvc: '',
    name: ''
  });
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setLoading(false);
      unlockPremium();
      onClose();
      toast.success('Premium access unlocked! Enjoy all premium content.');
    }, 1500);
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Unlock Premium Access</DialogTitle>
          <DialogDescription>
            Get unlimited access to all premium content including project ideas, intermediate & advanced roadmaps.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="grid gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name on card</Label>
              <Input 
                id="name" 
                name="name" 
                placeholder="John Smith" 
                required 
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="cardNumber">Card number</Label>
              <Input 
                id="cardNumber" 
                name="cardNumber" 
                placeholder="4242 4242 4242 4242" 
                required 
                value={formData.cardNumber}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="expiry">Expiry date</Label>
                <Input 
                  id="expiry" 
                  name="expiry" 
                  placeholder="MM/YY" 
                  required 
                  value={formData.expiry}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cvc">CVC</Label>
                <Input 
                  id="cvc" 
                  name="cvc" 
                  placeholder="123" 
                  required 
                  value={formData.cvc}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
          
          <div className="border-t pt-4">
            <h4 className="font-medium mb-2">What you'll get:</h4>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-sm">
                <Check className="h-4 w-4 text-green-500" />
                <span>Access to all intermediate & advanced roadmaps</span>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <Check className="h-4 w-4 text-green-500" />
                <span>Curated project ideas with detailed instructions</span>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <Check className="h-4 w-4 text-green-500" />
                <span>Premium resources and guides</span>
              </li>
            </ul>
          </div>
          
          <DialogFooter>
            <Button 
              type="button" 
              variant="outline" 
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="bg-gradient-to-r from-blue-600 to-indigo-600"
              disabled={loading}
            >
              {loading ? 'Processing...' : 'Unlock Premium ($29.99)'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PremiumModal;
