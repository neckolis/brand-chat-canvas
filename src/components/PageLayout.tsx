
import { ReactNode } from 'react';
import LogoDisplay from './LogoDisplay';
import BrandFooter from './BrandFooter';

interface PageLayoutProps {
  children: ReactNode;
  logoUrl?: string;
  hideFooter?: boolean;
  className?: string;
}

const PageLayout = ({ 
  children, 
  logoUrl,
  hideFooter = false,
  className = ""
}: PageLayoutProps) => {
  return (
    <div className={`min-h-screen flex flex-col ${className}`}>
      <header className="w-full p-4 border-b bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto flex justify-center">
          <LogoDisplay logoUrl={logoUrl} className="h-10" />
        </div>
      </header>
      
      <main className="flex-1 flex flex-col">
        {children}
      </main>
      
      {!hideFooter && (
        <BrandFooter />
      )}
    </div>
  );
};

export default PageLayout;
