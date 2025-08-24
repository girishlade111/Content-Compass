import type { ContentPiece, PerformanceMetric } from './types';

export const mockContentPieces: ContentPiece[] = [
  {
    id: '1',
    title: '5 Ways Our SaaS Improves Team Productivity',
    type: 'Blog Post',
    status: 'Published',
    targetAudience: 'Project Managers',
    publicationDate: new Date('2024-07-15'),
    channels: ['Blog', 'LinkedIn', 'Twitter'],
    description: 'A deep dive into the features that help project managers streamline their workflows.'
  },
  {
    id: '2',
    title: 'The Ultimate Guide to Remote Collaboration',
    type: 'Whitepaper',
    status: 'Published',
    targetAudience: 'C-level Executives',
    publicationDate: new Date('2024-07-22'),
    channels: ['Email', 'LinkedIn'],
    description: 'An in-depth whitepaper covering strategies and tools for effective remote work.'
  },
  {
    id: '3',
    title: 'How Acme Corp Increased ROI by 50%',
    type: 'Case Study',
    status: 'In Progress',
    targetAudience: 'Potential Customers',
    publicationDate: new Date('2024-08-05'),
    channels: ['Blog', 'Email'],
    description: 'A detailed case study showcasing the success story of a key customer.'
  },
  {
    id: '4',
    title: 'Mastering the Art of Content Scheduling',
    type: 'Webinar',
    status: 'Scheduled',
    targetAudience: 'Content Marketers',
    publicationDate: new Date('2024-08-12'),
    channels: ['LinkedIn', 'Email'],
    description: 'A live webinar with industry experts on content planning and scheduling.'
  },
  {
    id: '5',
    title: 'Quick Tip: Keyboard Shortcuts for Power Users',
    type: 'Social Media',
    status: 'Backlog',
    targetAudience: 'Existing Users',
    publicationDate: new Date('2024-08-19'),
    channels: ['Twitter', 'Facebook'],
    description: 'A short-form video tip for our power users.'
  },
  {
    id: '6',
    title: 'Beginner\'s Guide to Our Platform',
    type: 'Blog Post',
    status: 'Backlog',
    targetAudience: 'New Users',
    publicationDate: new Date('2024-09-02'),
    channels: ['Blog', 'Email'],
    description: 'A comprehensive guide for new users to get started with our SaaS product.'
  },
];

export const mockPerformanceData: PerformanceMetric[] = [
    { name: 'Jan', views: 2400, shares: 1200, conversions: 600 },
    { name: 'Feb', views: 1398, shares: 900, conversions: 450 },
    { name: 'Mar', views: 9800, shares: 4500, conversions: 2200 },
    { name: 'Apr', views: 3908, shares: 2100, conversions: 1100 },
    { name: 'May', views: 4800, shares: 2500, conversions: 1300 },
    { name: 'Jun', views: 3800, shares: 1900, conversions: 950 },
    { name: 'Jul', views: 4300, shares: 2200, conversions: 1150 },
];
