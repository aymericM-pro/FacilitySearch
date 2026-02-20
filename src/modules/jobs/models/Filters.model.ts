import type { Component } from 'vue';

export interface Filters {
    remote: boolean | null;
    contractType: string | null;
    skills: string[];
    enterprises: string[];
    salary: [number, number] | null;
}

export interface CompanyFilters {
    industry: string[];
    companyType: string[];
    city: string | null;
    createdAfter?: string | null;
}

export interface FilterConfig<T = Record<string, unknown>> {
    key: keyof T;
    label: string;
    component: Component;
}
