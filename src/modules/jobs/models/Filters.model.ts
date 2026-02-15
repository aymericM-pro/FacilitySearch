import type { Component } from 'vue';

export interface Filters {
    remote: boolean | null;
    contractType: string | null;
    skills: string[];
    enterprises: string[];
    salary: number | null;
}


type FilterConfigItem<K extends keyof Filters> = {
    key: K
    label: string
    component: Component
    props?: () => Partial<Record<string, unknown>>
}

export type FilterConfig = {
    [K in keyof Filters]: FilterConfigItem<K>
}[keyof Filters]
