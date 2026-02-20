export const en = {
    common: {
        actions: {
            trigger: 'Trigger',
            triggerJob: 'Trigger job',
            goToTrigger: 'Go to trigger page',
            apply: 'Apply',
            generateCv: 'Generate CV',
            back: 'Back',
            save: 'Save',
            cancel: 'Cancel',
            close: 'Close',
            delete: 'Delete',
            edit: 'Edit',
            create: 'Create',
            confirm: 'Confirm',
            open: 'Open',
        },
        filter: {
            apply: 'Apply',
            reset: 'Reset',
        },
        search: {
            placeholder: 'Search...',
            noResults: 'No results',
            loading: 'Loading...',
        },
        listing: {
            results: '{count} results',
            page: 'Page {current} / {total}',
        },
    },

    navigation: {
        title: 'Navigation',
        home: 'Home',
        jobs: 'Jobs',
        trigger: 'Trigger CV',
        companies: 'Companies',
        profile: 'Profile',
    },

    header: {
        greeting: 'Hi, {name}',
        search: 'Search...',
    },

    notifications: {
        title: 'Notifications',
        markAllAsRead: 'Mark all as read',
    },

    auth: {
        login: 'Login',
        register: 'Register',
        logout: 'Logout',
    },

    home: {
        title: 'Welcome to JobSearch',
        description:
            'This application allows you to trigger automated CV generation workflows via n8n.',
    },

    trigger: {
        title: 'Trigger a CV job',
        fields: {
            jobTitle: 'Job title',
            company: 'Company',
        },
        placeholders: {
            jobTitle: 'Software Engineer',
            company: 'Google',
        },
        success: 'Job successfully triggered.',
        error: 'An error occurred.',
    },

    companies: {
        card: {
            createdAt: 'Created {date}',
            viewDetails: 'View details',
        },
        list: {
            title: 'Companies',
            description: 'Browse all registered companies',
            empty: 'No companies found.',
        },
        detail: {
            title: 'Company Job Offers',
            loading: 'Loading...',
        },
        filters: {
            industry: {
                searchPlaceholder: 'Search industry...',
                loading: 'Loading industries...',
                noResults: 'No results',
            },
            type: {
                searchPlaceholder: 'Search type...',
                loading: 'Loading types...',
                noResults: 'No results',
            },
            city: {
                searchPlaceholder: 'Search city...',
                loading: 'Loading cities...',
                noResults: 'No results',
            },
        },
    },

    jobs: {
        list: {
            title: 'Job Opportunities',
            description: 'Browse available positions',
            empty: 'No jobs found.',
        },
        card: {
            remote: 'Remote',
            onSite: 'On-site',
            viewDetails: 'View details',
            apply: 'Apply',
            salaryFrom: 'From {min}€',
            salaryUpTo: 'Up to {max}€',
        },
        detail: {
            generateCv: 'Generate CV',
            loading: 'Loading...',
            viewMyCvs: 'View My CVs',
            modal: {
                title: 'Generate CV for this job',
                description: 'This will create a tailored CV for:',
                cancel: 'Cancel',
                generating: 'Generating...',
                generate: 'Generate',
            },
            sidebar: {
                title: 'My CVs',
                empty: 'No CV generated yet.',
                open: 'Open',
            },
            errors: {
                loadCvs: 'Failed to load CVs',
                generation: 'Generation failed',
            },
        },
        filters: {
            contract: {
                all: 'All',
                cdi: 'CDI',
                cdd: 'CDD',
                freelance: 'Freelance',
                internship: 'Internship',
                apprenticeship: 'Apprenticeship',
            },
            remote: {
                all: 'All',
                remoteOnly: 'Remote only',
                onSiteOnly: 'On-site only',
            },
            enterprise: {
                searchPlaceholder: 'Search company...',
                loading: 'Loading companies...',
                noResults: 'No results',
            },
            skills: {
                searchPlaceholder: 'Search skills...',
                noResults: 'No results',
            },
        },
    },
} as const;
