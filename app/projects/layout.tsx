import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Projects',
  description: 'List of projects I have worked on, showcasing my skills and experience in software development.',
};

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
