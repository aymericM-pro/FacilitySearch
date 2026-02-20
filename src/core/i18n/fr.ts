export const fr = {
    common: {
        actions: {
            trigger: 'Déclencher',
            triggerJob: 'Déclencher le job',
            goToTrigger: 'Aller à la page de déclenchement',
            apply: 'Postuler',
            generateCv: 'Générer un CV',
            back: 'Retour',
            save: 'Enregistrer',
            cancel: 'Annuler',
            close: 'Fermer',
            delete: 'Supprimer',
            edit: 'Modifier',
            create: 'Créer',
            confirm: 'Confirmer',
            open: 'Ouvrir',
        },
        filter: {
            apply: 'Appliquer',
            reset: 'Réinitialiser',
        },
        search: {
            placeholder: 'Rechercher...',
            noResults: 'Aucun résultat',
            loading: 'Chargement...',
        },
        listing: {
            results: '{count} résultats',
            page: 'Page {current} / {total}',
        },
    },

    navigation: {
        title: 'Navigation',
        home: 'Accueil',
        jobs: 'Offres',
        trigger: 'Déclencher CV',
        companies: 'Entreprises',
        profile: 'Profil',
    },

    header: {
        greeting: 'Bonjour, {name}',
        search: 'Rechercher...',
    },

    notifications: {
        title: 'Notifications',
        markAllAsRead: 'Tout marquer comme lu',
    },

    auth: {
        login: 'Connexion',
        register: 'Inscription',
        logout: 'Déconnexion',
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

    companies: {
        card: {
            createdAt: 'Créée le {date}',
            viewDetails: 'détails',
        },
        list: {
            title: 'Entreprises',
            description: 'Parcourir toutes les entreprises enregistrées',
            empty: 'Aucune entreprise trouvée.',
        },
        detail: {
            title: 'Offres d\'emploi de l\'entreprise',
            loading: 'Chargement...',
        },
        filters: {
            industry: {
                searchPlaceholder: 'Rechercher un secteur...',
                loading: 'Chargement des secteurs...',
                noResults: 'Aucun résultat',
            },
            type: {
                searchPlaceholder: 'Rechercher un type...',
                loading: 'Chargement des types...',
                noResults: 'Aucun résultat',
            },
            city: {
                searchPlaceholder: 'Rechercher une ville...',
                loading: 'Chargement des villes...',
                noResults: 'Aucun résultat',
            },
        },
    },

    jobs: {
        list: {
            title: 'Offres d\'emploi',
            description: 'Parcourir les postes disponibles',
            empty: 'Aucun poste trouvé.',
        },
        card: {
            remote: 'Télétravail',
            onSite: 'Présentiel',
            viewDetails: 'détails',
            apply: 'Postuler',
            salaryFrom: 'À partir de {min}€',
            salaryUpTo: 'Jusqu\'à {max}€',
        },
        detail: {
            generateCv: 'Générer un CV',
            loading: 'Chargement...',
            viewMyCvs: 'Voir mes CVs',
            modal: {
                title: 'Générer un CV pour cette offre',
                description: 'Cela créera un CV personnalisé pour :',
                cancel: 'Annuler',
                generating: 'Génération en cours...',
                generate: 'Générer',
            },
            sidebar: {
                title: 'Mes CVs',
                empty: 'Aucun CV généré pour l\'instant.',
                open: 'Ouvrir',
            },
            errors: {
                loadCvs: 'Impossible de charger les CVs',
                generation: 'La génération a échoué',
            },
        },
        filters: {
            contract: {
                all: 'Tous',
                cdi: 'CDI',
                cdd: 'CDD',
                freelance: 'Freelance',
                internship: 'Stage',
                apprenticeship: 'Alternance',
            },
            remote: {
                all: 'Tous',
                remoteOnly: 'Télétravail uniquement',
                onSiteOnly: 'Présentiel uniquement',
            },
            enterprise: {
                searchPlaceholder: 'Rechercher une entreprise...',
                loading: 'Chargement des entreprises...',
                noResults: 'Aucun résultat',
            },
            skills: {
                searchPlaceholder: 'Rechercher des compétences...',
                noResults: 'Aucun résultat',
            },
        },
    },
} as const;
