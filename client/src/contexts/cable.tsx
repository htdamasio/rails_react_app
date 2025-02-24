import React from 'react';
import ActionCable from 'actioncable';
import { WEBSOCKET_URL } from '../constants';

// Define the type for the CableApp object
export interface CableApp {
  cable: ActionCable.Cable;
}

// Create the context with a default value of type CableApp or undefined
const CableContext = React.createContext<CableApp | undefined>(undefined);

// Define the type for the CableProvider props
interface CableProviderProps {
  children: React.ReactNode;
}

function CableProvider({ children }: CableProviderProps) {
  // Initialize the CableApp object
  const CableApp: CableApp = {
    cable: ActionCable.createConsumer(WEBSOCKET_URL),
  };

  return (
    <CableContext.Provider value={CableApp}>
      {children}
    </CableContext.Provider>
  );
}

export { CableContext, CableProvider };