export const en = {
    common: {
        actions: {
            trigger: 'Trigger',
            triggerJob: 'Trigger job',
            goToTrigger: 'Go to trigger page',
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
} as const;
