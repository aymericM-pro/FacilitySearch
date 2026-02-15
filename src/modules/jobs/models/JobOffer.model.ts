export interface JobOfferResponse {
    id: string;
    title: string;
    company: string;
    location?: string;
    description?: string;
    tags: string[];
    remote?: boolean;
    salaryMin?: number;
    salaryMax?: number;
    contractType?: string;
    createdAt?: string;
}

