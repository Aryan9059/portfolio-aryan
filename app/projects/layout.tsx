import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Projects — Aryan Sharma',
  description: 'A full catalogue of projects by Aryan Sharma — Android apps, full-stack web apps, tools and more.',
};

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
