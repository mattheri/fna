import { router } from "../../router";

export const locations = {
    [router.home]: [
        {
            text: "Connexion",
            path: router.login
        },
        {
            text: "Nouvel utilisateur",
            path: router.register
        }
    ],
    [router.login]: [
        {
            text: "Nouvel utilisateur",
            path: router.register
        }
    ],
    [router.register]: [
        {
            text: "Connexion",
            path: router.login
        }
    ],
    [router.customers]: [
        {
            text: "Déconnexion",
            path: router.login,
        }
    ],
    [router.basicInformation]: [
        {
            text: "Liste de clients",
            path: router.customers
        },
        {
            text: "Déconnexion",
            path: router.login
        },
        {
            text: "Enfants",
            path: router.dependants
        },
        {
            text: "Revenus",
            path: router.income
        },
        {
            text: "Dettes",
            path: router.debt
        },
        {
            text: "Retraite",
            path: router.retirement
        }
    ],
    [router.dependants]: [
        {
            text: "Liste de clients",
            path: router.customers
        },
        {
            text: "Déconnexion",
            path: router.login
        },
        {
            text: "Informations de base",
            path: router.basicInformation
        },
        {
            text: "Revenus",
            path: router.income
        },
        {
            text: "Dettes",
            path: router.debt
        },
        {
            text: "Retraite",
            path: router.retirement
        }
    ],
    [router.income]: [
        {
            text: "Liste de clients",
            path: router.customers
        },
        {
            text: "Déconnexion",
            path: router.login
        },
        {
            text: "Informations de base",
            path: router.basicInformation
        },
        {
            text: "Enfants",
            path: router.dependants
        },
        {
            text: "Dettes",
            path: router.debt
        },
        {
            text: "Retraite",
            path: router.retirement
        }
    ],
    [router.debt]: [
        {
            text: "Liste de clients",
            path: router.customers
        },
        {
            text: "Déconnexion",
            path: router.login
        },
        {
            text: "Informations de base",
            path: router.basicInformation
        },
        {
            text: "Enfants",
            path: router.dependants
        },
        {
            text: "Revenus",
            path: router.income
        },
        {
            text: "Retraite",
            path: router.retirement
        }
    ],
    [router.retirement]: [
        {
            text: "Liste de clients",
            path: router.customers
        },
        {
            text: "Déconnexion",
            path: router.login
        },
        {
            text: "Informations de base",
            path: router.basicInformation
        },
        {
            text: "Enfants",
            path: router.dependants
        },
        {
            text: "Revenus",
            path: router.income
        },
        {
            text: "Dettes",
            path: router.debt
        }
    ]
}