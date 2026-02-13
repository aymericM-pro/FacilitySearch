export const fr = {
    common: {
        actions: {
            trigger: 'Déclencher',
            triggerJob: 'Déclencher le job',
            goToTrigger: 'Aller à la page de déclenchement',
            apply: 'Postuler',
            generateCv: 'Générer un CV',
            back: 'Retour',
        },
    },

    navigation: {
        home: 'Accueil',
        trigger: 'Déclencher CV',
        jobs: 'Jobs',
    },

    home: {
        title: 'Bienvenue sur JobSearch',
        description:
            'Cette application permet de déclencher automatiquement la génération de CV via n8n.',
    },

    trigger: {
        title: 'Déclencher un job CV',
        fields: {
            jobTitle: 'Intitulé du poste',
            company: 'Entreprise',
        },
        placeholders: {
            jobTitle: 'Ingénieur logiciel',
            company: 'Google',
        },
        success: 'Job déclenché avec succès.',
        error: 'Une erreur est survenue.',
    },
} as const;
