import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { Generator, DemandBid } from './simulations/types';

export interface SimulationState {
  generators: Generator[];
  demandBids: DemandBid[];
  scenario: string;
  view?: 'overview' | 'analysis' | 'settings';
  settings?: Record<string, any>;
}

/**
 * URL-based simulation state management
 * Encodes/decodes simulation state to/from URL parameters for sharing
 */
export class SimulationStateManager {
  /**
   * Encode simulation state to URL-safe base64 string
   */
  static encodeState(state: SimulationState): string {
    try {
      const jsonString = JSON.stringify(state);
      const encoded = btoa(jsonString);
      return encoded;
    } catch (error) {
      console.error('Failed to encode simulation state:', error);
      return '';
    }
  }

  /**
   * Decode simulation state from URL-safe base64 string
   */
  static decodeState(encodedState: string): SimulationState | null {
    try {
      const jsonString = atob(encodedState);
      const state = JSON.parse(jsonString);
      return state;
    } catch (error) {
      console.error('Failed to decode simulation state:', error);
      return null;
    }
  }

  /**
   * Generate shareable URL for current simulation state
   */
  static generateShareableUrl(state: SimulationState, baseUrl: string): string {
    const encodedState = this.encodeState(state);
    const url = new URL(baseUrl);
    url.searchParams.set('state', encodedState);
    return url.toString();
  }

  /**
   * Copy shareable URL to clipboard
   */
  static async copyToClipboard(url: string): Promise<boolean> {
    try {
      await navigator.clipboard.writeText(url);
      return true;
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
      // Fallback for older browsers
      try {
        const textArea = document.createElement('textarea');
        textArea.value = url;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        return true;
      } catch (fallbackError) {
        console.error('Fallback copy failed:', fallbackError);
        return false;
      }
    }
  }

  /**
   * Download simulation state as JSON file
   */
  static downloadState(state: SimulationState, filename: string = 'simulation-scenario.json'): void {
    try {
      const jsonString = JSON.stringify(state, null, 2);
      const blob = new Blob([jsonString], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Failed to download state:', error);
    }
  }
}

/**
 * React hook for URL-based simulation state management
 */
export function useSimulationState(
  initialState: SimulationState,
  options: {
    syncToUrl?: boolean;
    onStateChange?: (state: SimulationState) => void;
  } = {}
) {
  const { syncToUrl = true, onStateChange } = options;
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Initialize state from URL or use provided initial state
  const [state, setState] = useState<SimulationState>(() => {
    if (typeof window === 'undefined') return initialState;
    
    const urlState = searchParams.get('state');
    if (urlState) {
      const decodedState = SimulationStateManager.decodeState(urlState);
      if (decodedState) {
        return { ...initialState, ...decodedState };
      }
    }
    return initialState;
  });

  // Update URL when state changes (if syncToUrl is enabled)
  useEffect(() => {
    if (!syncToUrl || typeof window === 'undefined') return;
    
    const encodedState = SimulationStateManager.encodeState(state);
    const currentUrl = new URL(window.location.href);
    
    if (encodedState) {
      currentUrl.searchParams.set('state', encodedState);
    } else {
      currentUrl.searchParams.delete('state');
    }
    
    // Update URL without triggering navigation
    window.history.replaceState({}, '', currentUrl.toString());
    
    // Call change handler
    onStateChange?.(state);
  }, [state, syncToUrl, onStateChange]);

  // Update specific parts of state
  const updateState = useCallback((updates: Partial<SimulationState>) => {
    setState(prev => ({ ...prev, ...updates }));
  }, []);

  const updateGenerators = useCallback((generators: Generator[]) => {
    setState(prev => ({ ...prev, generators }));
  }, []);

  const updateDemandBids = useCallback((demandBids: DemandBid[]) => {
    setState(prev => ({ ...prev, demandBids }));
  }, []);

  const updateView = useCallback((view: 'overview' | 'analysis' | 'settings') => {
    setState(prev => ({ ...prev, view }));
  }, []);

  const resetState = useCallback(() => {
    setState(initialState);
  }, [initialState]);

  // Sharing functions
  const generateShareUrl = useCallback(() => {
    if (typeof window === 'undefined') return '';
    return SimulationStateManager.generateShareableUrl(state, window.location.href);
  }, [state]);

  const shareToClipboard = useCallback(async () => {
    const url = generateShareUrl();
    return SimulationStateManager.copyToClipboard(url);
  }, [generateShareUrl]);

  const downloadState = useCallback((filename?: string) => {
    SimulationStateManager.downloadState(state, filename);
  }, [state]);

  return {
    state,
    updateState,
    updateGenerators,
    updateDemandBids,
    updateView,
    resetState,
    generateShareUrl,
    shareToClipboard,
    downloadState,
  };
}