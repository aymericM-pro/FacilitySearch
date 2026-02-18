import type { Component } from 'vue';

export interface JobFilters {
    remote: boolean | null;
    contractType: string | null;
    skills: string[];
    enterprises: string[];
    salary: number | null;
}

export interface CompanyFilters {
    industry: string[];
    companyType: string[];
    city: string[];
}

type FilterConfigItem<T, K extends keyof T> = {
    key: K
    label: string
    component: Component
    props?: () => Partial<Record<string, unknown>>
}

export type FilterConfig<T> = {
    [K in keyof T]: FilterConfigItem<T, K>
}[keyof T]
