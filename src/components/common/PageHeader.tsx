import React, { ReactNode } from 'react';

interface PageHeaderProps {
  title: string;
  description?: string;
  children?: ReactNode;
}

const PageHeader: React.FC<PageHeaderProps> = ({ 
  title, 
  description, 
  children 
}) => {
  return (
    <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between pb-4 border-b border-neutral-200">
      <div>
        <h1 className="text-2xl font-bold text-neutral-800">{title}</h1>
        {description && <p className="text-neutral-500 mt-1">{description}</p>}
      </div>
      {children && (
        <div className="mt-4 md:mt-0 flex gap-2">
          {children}
        </div>
      )}
    </div>
  );
};

export default PageHeader;