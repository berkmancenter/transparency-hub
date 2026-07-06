import { ObjectId } from "mongodb";

export type Platform = {
  _id: ObjectId | string;
  id: string;
  name: string;
  url: string;
  metadata?: {
    sns_type?: string;
    year_launched?: number;
    provider?: string;
    relatedCompanies?: string[];
  },
  doc_urls: {
    [key: string]: string
  };
};

export type UrlData = {
  id: string;
  company_id: string;
  document_name: string;
  url: string;
};

export type Document = {
  _id: ObjectId;
  company_id: string;
  path: string;
  type: string;
  date_fetched: Date;
  public_url: string;
  original_url: string;
  format: 'txt' | 'html' | 'wacz' | 'pdf' | 'warc.json';
};

export type DocumentTableData = {
  id: string;
  type: string;
  formats: string[];
  urls: string[];
  paths: string[];
  archived: Date;
  original_url: string;
};

export type ProjectData = {
  _id: string;
  title: string;
  authors: string;
  description: string;
  link: string;
  image: string;
  img_title: string;
  img_alt: string;
}

export type DocumentIndex = Record<string, Record<string, Record<string, string>>>;
export type WaybackIndex = Record<string, Record<string, string>>;