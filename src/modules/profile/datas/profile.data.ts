import { reactive } from 'vue';
import type { Experience } from '@/modules/profile/models/experience.model.ts';

export const profile = reactive({
    name: 'Aymeric Maillot',
    title: 'Software Engineer • Java / Angular',
    location: 'Rueil-Malmaison, France',
    available: true,

    email: 'aymeric.maillot@email.com',
    phone: '+33 6 12 34 56 78',
    linkedin: 'linkedin.com/in/aymeric',
    website: 'aymeric.dev',

    about: 'Passionate software engineer with 3+ years of experience in Java and Angular development. I thrive on solving complex problems and delivering high-quality solutions. Currently seeking new opportunities to grow and contribute to innovative projects.',
    address: {
        street: '123 Rue de la République',
        city: 'Rueil-Malmaison',
        postal: '92500',
        country: 'France',
    },
    skills: [
        'Java', 'Kotlin', 'Spring Boot',
        'Angular', 'TypeScript',
        'Docker', 'Kubernetes',
        'PostgreSQL', 'GCP',
    ],

    experiences: [
        {
            company: 'Intech',
            role: 'Software Engineer',
            period: 'Nov 2024 - Présent',
            location: 'Luxembourg',
        },
        {
            company: 'Harvest',
            role: 'Software Engineer',
            period: 'Fév 2024 - Oct 2024',
            location: 'Paris',
        },
        {
            company: 'ICPF',
            role: 'Software Engineer (Kotlin / Angular)',
            period: 'Avr 2023 - Sept 2023',
            location: 'Paris',
        },
    ] as Experience[],

    educations: [

        {
            school: 'EFREI Paris',
            degree: 'Ingénieur',
            period: '2018 - 2023',
            location: 'Paris',
            field: 'Ingénierie logicielle',
            logo: '/logos/efrei.png',
        },
    ],
});
