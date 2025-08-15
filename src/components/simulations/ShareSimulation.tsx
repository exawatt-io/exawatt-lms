"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { FeatureCard } from '@/components/ui/FeatureCard';
import { Badge } from '@/components/ui/Badge';
import {
  Share,
  Copy,
  Download,
  Check,
  QrCode,
  Link,
  FileText,
  X,
  ExternalLink
} from 'lucide-react';
import { SimulationState } from '@/lib/simulation-state';

interface ShareSimulationProps {
  state: SimulationState;
  onGenerateShareUrl: () => string;
  onShareToClipboard: () => Promise<boolean>;
  onDownloadState: (filename?: string) => void;
  isOpen: boolean;
  onClose: () => void;
  simulationName?: string;
}

export function ShareSimulation({
  state,
  onGenerateShareUrl,
  onShareToClipboard,
  onDownloadState,
  isOpen,
  onClose,
  simulationName = 'Simulation'
}: ShareSimulationProps) {
  const [copied, setCopied] = useState(false);
  const [shareUrl, setShareUrl] = useState('');

  React.useEffect(() => {
    if (isOpen) {
      const url = onGenerateShareUrl();
      setShareUrl(url);
      setCopied(false);
    }
  }, [isOpen, onGenerateShareUrl]);

  const handleCopyToClipboard = async () => {
    const success = await onShareToClipboard();
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
    const filename = `${simulationName.toLowerCase().replace(/\s+/g, '-')}-${timestamp}.json`;
    onDownloadState(filename);
  };

  const handleOpenInNewTab = () => {
    window.open(shareUrl, '_blank');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <FeatureCard className="w-full max-w-2xl relative">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Share className="h-6 w-6 text-electric-400" />
            <div>
              <h2 className="text-xl font-semibold text-white">Share Simulation</h2>
              <p className="text-sm text-slate-400">Share your custom scenario with others</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            icon={X}
            onClick={onClose}
            className="text-slate-400 hover:text-white"
          />
        </div>

        {/* Simulation Info */}
        <div className="mb-6 p-4 bg-slate-800/50 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-medium text-white">{simulationName}</h3>
            <Badge variant="neutral" size="sm">{state.scenario}</Badge>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-slate-400">Generators:</span>
              <span className="text-white ml-2">{state.generators.length}</span>
            </div>
            <div>
              <span className="text-slate-400">Demand Bids:</span>
              <span className="text-white ml-2">{state.demandBids.length}</span>
            </div>
          </div>
        </div>

        {/* Share URL */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-white mb-2">
            Shareable Link
          </label>
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <input
                type="text"
                value={shareUrl}
                readOnly
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-200 text-sm pr-10"
                placeholder="Generating link..."
              />
              <Link className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            </div>
            <Button
              variant="outline"
              size="sm"
              icon={copied ? Check : Copy}
              onClick={handleCopyToClipboard}
              className={copied ? 'text-green-400 border-green-400' : ''}
            >
              {copied ? 'Copied!' : 'Copy'}
            </Button>
            <Button
              variant="outline"
              size="sm"
              icon={ExternalLink}
              onClick={handleOpenInNewTab}
              title="Open in new tab"
            />
          </div>
          <p className="text-xs text-slate-400 mt-2">
            This link contains all simulation parameters and can be shared with anyone
          </p>
        </div>

        {/* Export Options */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-white mb-3">
            Export Options
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Button
              variant="outline"
              icon={Download}
              onClick={handleDownload}
              className="justify-start"
            >
              <div className="text-left">
                <div className="font-medium">Download JSON</div>
                <div className="text-xs text-slate-400">Save scenario as file</div>
              </div>
            </Button>
            
            <Button
              variant="outline"
              icon={FileText}
              onClick={() => {
                const summary = `${simulationName} Scenario\n\nGenerators: ${state.generators.length}\nDemand Bids: ${state.demandBids.length}\nScenario: ${state.scenario}\n\nShare Link: ${shareUrl}`;
                navigator.clipboard.writeText(summary);
              }}
              className="justify-start"
            >
              <div className="text-left">
                <div className="font-medium">Copy Summary</div>
                <div className="text-xs text-slate-400">Text description</div>
              </div>
            </Button>
          </div>
        </div>

        {/* How to Use */}
        <div className="p-4 bg-blue-900/20 border border-blue-800 rounded-lg">
          <h4 className="text-sm font-medium text-blue-300 mb-2">How to use shared links</h4>
          <ul className="text-xs text-blue-200 space-y-1">
            <li>• Share the link with students or colleagues</li>
            <li>• Recipients will see your exact simulation setup</li>
            <li>• Links work across devices and browsers</li>
            <li>• Bookmarks save your custom scenarios</li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-slate-700">
          <Button variant="ghost" onClick={onClose}>
            Close
          </Button>
          <Button
            variant="primary"
            icon={copied ? Check : Copy}
            onClick={handleCopyToClipboard}
            className={copied ? 'bg-green-600 hover:bg-green-700' : ''}
          >
            {copied ? 'Link Copied!' : 'Copy Link'}
          </Button>
        </div>
      </FeatureCard>
    </div>
  );
}