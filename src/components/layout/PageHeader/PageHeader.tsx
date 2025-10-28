import { ReactNode } from "react";

import "./pageheader.css";

interface PageHeaderProps {
  title: string;
  children?: ReactNode;
}

const PageHeader = ({ title, children }: PageHeaderProps) => {
  return (
    <header className="page-header">
      <h1>{title}</h1>
      {children}
    </header>
  );
};

export default PageHeader;
