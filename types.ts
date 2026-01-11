import React from 'react';

export interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  positive: boolean;
  icon: React.ElementType;
}

export interface Pipeline {
  id: string;
  name: string;
  status: 'active' | 'inactive' | 'error' | 'running';
  lastRun: string;
  nodes: number;
}

export interface Dataset {
  id: string;
  name: string;
  type: 'spatial' | 'tabular';
  rows: number;
  size: string;
  created: string;
}

export enum ViewState {
  DASHBOARD = 'dashboard',
  PIPELINES = 'pipelines',
  MAP = 'map',
  DOCS = 'docs',
  DATA = 'data',
  SETTINGS = 'settings',
  // Industry Verticals
  AGRICULTURE = 'agriculture',
  LOGISTICS = 'logistics',
  URBAN = 'urban',
  ENVIRONMENT = 'environment',
  REAL_ESTATE = 'real_estate',
  INSURANCE = 'insurance',
  RETAIL = 'retail'
}