'use client';

import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { QRCodeSVG } from 'qrcode.react';

const InviteCollaborators = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { affiliateLink, qrCode } = useSelector((state: RootState) => state.user);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Invite Collaborators</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Invite Collaborators</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center space-y-4">
          <QRCodeSVG value={qrCode || ''} size={200} />
          <p>Scan the QR code or use the link below to invite collaborators:</p>
          <a href={affiliateLink || '#'} className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">
            {affiliateLink}
          </a>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InviteCollaborators;