import React, { createContext, useContext, useState, ReactNode } from 'react';

interface GuestEmailContextProps {
  guestEmail: string | null;
  setGuestEmail: (email: string) => void;
}

const GuestEmailContext = createContext<GuestEmailContextProps | undefined>(undefined);

export const GuestEmailProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [guestEmail, setGuestEmail] = useState<string | null>(null);

  return (
    <GuestEmailContext.Provider value={{ guestEmail, setGuestEmail }}>
      {children}
    </GuestEmailContext.Provider>
  );
};

export const useGuestEmail = (): GuestEmailContextProps => {
  const context = useContext(GuestEmailContext);
  if (!context) {
    throw new Error('useGuestEmail must be used within a GuestEmailProvider');
  }
  return context;
};
