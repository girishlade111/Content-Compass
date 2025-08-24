export type ContentType = 'Blog Post' | 'Whitepaper' | 'Case Study' | 'Webinar' | 'Social Media';
export type ContentStatus = 'Backlog' | 'Scheduled' | 'In Progress' | 'Published';
export type DistributionChannel = 'LinkedIn' | 'Twitter' | 'Facebook' | 'Email' | 'Blog';

export interface ContentPiece {
  id: string;
  title: string;
  type: ContentType;
  status: ContentStatus;
  targetAudience: string;
  publicationDate: Date;
  channels: DistributionChannel[];
  description: string;
}

export interface AnalyticsData {
  views: number;
  shares: number;
  conversions: number;
}

export interface PerformanceMetric {
  name: string;
  views: number;
  shares: number;
  conversions: number;
}

export interface AudienceProfile {
  name: string;
  demographics: string;
  painPoints: string;
  goals: string;
}
