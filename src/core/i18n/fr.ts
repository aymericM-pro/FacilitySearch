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
        viewToggle: {
            cards: 'Cartes',
            list: 'Liste',
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
        fields: {
            email: 'Email',
            password: 'Mot de passe',
            pseudo: 'Pseudo',
            confirmPassword: 'Confirmer le mot de passe',
        },
        actions: {
            login: 'Se connecter',
            register: "S'inscrire",
            loading: 'Chargement...',
        },
        errors: {
            loginFailed: 'Échec de la connexion',
        },
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

    profile: {
        availability: {
            available: 'Open to work',
            unavailable: 'Indisponible',
        },
        edit: {
            header: 'Modifier le profil',
            about: 'Modifier le résumé',
            skills: 'Modifier les compétences',
            experience: 'Modifier – {company}',
            experienceNew: 'Nouvelle expérience',
            education: 'Modifier – {school}',
            educationNew: 'Nouvelle formation',
            contact: 'Modifier les coordonnées',
        },
        delete: {
            title: 'Confirmer la suppression',
            confirmText: 'Voulez-vous vraiment supprimer',
        },
        sections: {
            about: 'À propos',
            skills: 'Compétences',
            experience: 'Expérience',
            education: 'Éducation',
            contact: 'Contact',
        },
        about: {
            summary: 'Résumé du profil :',
        },
        contact: {
            email: 'Adresses email',
            phone: 'Numéro(s) de téléphone',
            phonePrivate: 'Champ privé, visible uniquement par vous et les administrateurs.',
            networks: 'Réseaux & Site',
            address: 'Adresse(s) postale(s)',
        },
        form: {
            header: {
                name: 'Nom complet',
                namePlaceholder: 'Prénom Nom',
                jobTitle: 'Titre / Poste',
                jobTitlePlaceholder: 'Ex: Software Engineer',
                location: 'Localisation',
                locationPlaceholder: 'Ex: Paris, France',
                available: 'Disponible',
            },
            about: {
                label: 'Résumé du profil',
                placeholder: 'Décrivez votre profil...',
            },
            skills: {
                searchPlaceholder: 'Rechercher une compétence...',
                empty: 'Aucune compétence trouvée',
            },
            experience: {
                company: 'Entreprise',
                companyPlaceholder: 'Ex: Google',
                role: 'Poste / Rôle',
                rolePlaceholder: 'Ex: Software Engineer',
                period: 'Période',
                periodPlaceholder: 'Ex: Jan 2023 - Présent',
                location: 'Lieu',
                locationPlaceholder: 'Ex: Paris',
                logo: 'Logo (URL, optionnel)',
            },
            education: {
                school: 'École / Université',
                schoolPlaceholder: 'Ex: EFREI Paris',
                degree: 'Diplôme',
                degreePlaceholder: 'Ex: Ingénieur',
                period: 'Période',
                periodPlaceholder: 'Ex: 2018 - 2023',
                location: 'Lieu',
                locationPlaceholder: 'Ex: Paris',
                field: 'Domaine (optionnel)',
                fieldPlaceholder: 'Ex: Ingénierie logicielle',
                logo: 'Logo (URL, optionnel)',
            },
            contact: {
                email: 'Email',
                emailPlaceholder: 'votre@email.com',
                phone: 'Téléphone',
                phonePlaceholder: '+33 6 12 34 56 78',
                linkedin: 'LinkedIn',
                linkedinPlaceholder: 'linkedin.com/in/profil',
                website: 'Site web',
                websitePlaceholder: 'monsite.dev',
                postalAddress: 'Adresse postale',
                street: 'Rue',
                streetPlaceholder: '123 Rue de la République',
                city: 'Ville',
                cityPlaceholder: 'Paris',
                postal: 'Code postal',
                postalPlaceholder: '75001',
            },
        },
    },
} as const;
