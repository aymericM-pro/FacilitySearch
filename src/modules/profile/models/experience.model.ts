export interface Experience {
    id: string;
    company: string;
    role: string;
    period: string;
    location: string;
    logo?: string;
}

export interface Education {
    id: string;
    school: string;
    degree: string;
    period: string;
    location: string;
    field?: string;
    logo?: string;
}


export interface Address {
    street: string;
    city: string;
    postal: string;
    country?: string;
}

export interface Profile {
    name: string;
    title: string;
    location: string;
    available: boolean;

    email: string;
    phone: string;
    linkedin: string;
    website: string;

    about: string;
    address?: Address;
    skills: string[];

    experiences: Experience[];
    educations: Education[];
}
