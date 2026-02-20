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
        viewToggle: {
            cards: 'Cards',
            list: 'List',
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
        fields: {
            email: 'Email',
            password: 'Password',
            pseudo: 'Pseudo',
            confirmPassword: 'Confirm password',
        },
        actions: {
            login: 'Login',
            register: 'Register',
            loading: 'Loading...',
        },
        errors: {
            loginFailed: 'Login failed',
        },
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

    profile: {
        availability: {
            available: 'Open to work',
            unavailable: 'Unavailable',
        },
        edit: {
            header: 'Edit profile',
            about: 'Edit summary',
            skills: 'Edit skills',
            experience: 'Edit – {company}',
            experienceNew: 'New experience',
            education: 'Edit – {school}',
            educationNew: 'New education',
            contact: 'Edit contact info',
        },
        delete: {
            title: 'Confirm deletion',
            confirmText: 'Do you really want to delete',
        },
        sections: {
            about: 'About',
            skills: 'Skills',
            experience: 'Experience',
            education: 'Education',
            contact: 'Contact',
        },
        about: {
            summary: 'Profile summary:',
        },
        contact: {
            email: 'Email addresses',
            phone: 'Phone number(s)',
            phonePrivate: 'Private field, visible only to you and administrators.',
            networks: 'Networks & Website',
            address: 'Postal address(es)',
        },
        form: {
            header: {
                name: 'Full name',
                namePlaceholder: 'First Last',
                jobTitle: 'Title / Position',
                jobTitlePlaceholder: 'Ex: Software Engineer',
                location: 'Location',
                locationPlaceholder: 'Ex: Paris, France',
                available: 'Available',
            },
            about: {
                label: 'Profile summary',
                placeholder: 'Describe your profile...',
            },
            skills: {
                searchPlaceholder: 'Search for a skill...',
                empty: 'No skills found',
            },
            experience: {
                company: 'Company',
                companyPlaceholder: 'Ex: Google',
                role: 'Role / Position',
                rolePlaceholder: 'Ex: Software Engineer',
                period: 'Period',
                periodPlaceholder: 'Ex: Jan 2023 - Present',
                location: 'Location',
                locationPlaceholder: 'Ex: Paris',
                logo: 'Logo (URL, optional)',
            },
            education: {
                school: 'School / University',
                schoolPlaceholder: 'Ex: EFREI Paris',
                degree: 'Degree',
                degreePlaceholder: 'Ex: Engineer',
                period: 'Period',
                periodPlaceholder: 'Ex: 2018 - 2023',
                location: 'Location',
                locationPlaceholder: 'Ex: Paris',
                field: 'Field (optional)',
                fieldPlaceholder: 'Ex: Software Engineering',
                logo: 'Logo (URL, optional)',
            },
            contact: {
                email: 'Email',
                emailPlaceholder: 'your@email.com',
                phone: 'Phone',
                phonePlaceholder: '+33 6 12 34 56 78',
                linkedin: 'LinkedIn',
                linkedinPlaceholder: 'linkedin.com/in/profile',
                website: 'Website',
                websitePlaceholder: 'mysite.dev',
                postalAddress: 'Postal address',
                street: 'Street',
                streetPlaceholder: '123 Republic Street',
                city: 'City',
                cityPlaceholder: 'Paris',
                postal: 'Postal code',
                postalPlaceholder: '75001',
            },
        },
    },
} as const;
