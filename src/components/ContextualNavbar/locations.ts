import { router } from "../../router";

export const locations = {
    [router.home]: [
        {
            text: "Login",
            path: router.login
        },
        {
            text: "Register",
            path: router.register
        }
    ],
    [router.login]: [
        {
            text: "Register",
            path: router.register
        }
    ],
    [router.register]: [
        {
            text: "Login",
            path: router.login
        }
    ],
    [router.customers]: [
        {
            text: "Log Out",
            path: router.login,
        }
    ],
    [router.basicInformation]: [
        {
            text: "Customer List",
            path: router.customers
        },
        {
            text: "Log Out",
            path: router.login
        },
        {
            text: "Childrens",
            path: router.dependants
        },
        {
            text: "Income",
            path: router.income
        },
        {
            text: "Debt",
            path: router.debt
        },
        {
            text: "Retirement",
            path: router.retirement
        }
    ],
    [router.dependants]: [
        {
            text: "Customer List",
            path: router.customers
        },
        {
            text: "Log Out",
            path: router.login
        },
        {
            text: "Basic Informations",
            path: router.basicInformation
        },
        {
            text: "Income",
            path: router.income
        },
        {
            text: "Debt",
            path: router.debt
        },
        {
            text: "Retirement",
            path: router.retirement
        }
    ],
    [router.income]: [
        {
            text: "Customer List",
            path: router.customers
        },
        {
            text: "Log Out",
            path: router.login
        },
        {
            text: "Basic Informations",
            path: router.basicInformation
        },
        {
            text: "Childrens",
            path: router.dependants
        },
        {
            text: "Debt",
            path: router.debt
        },
        {
            text: "Retirement",
            path: router.retirement
        }
    ],
    [router.debt]: [
        {
            text: "Customer List",
            path: router.customers
        },
        {
            text: "Log Out",
            path: router.login
        },
        {
            text: "Basic Informations",
            path: router.basicInformation
        },
        {
            text: "Childrens",
            path: router.dependants
        },
        {
            text: "Income",
            path: router.income
        },
        {
            text: "Retirement",
            path: router.retirement
        }
    ],
    [router.retirement]: [
        {
            text: "Customer List",
            path: router.customers
        },
        {
            text: "Log Out",
            path: router.login
        },
        {
            text: "Basic Informations",
            path: router.basicInformation
        },
        {
            text: "Childrens",
            path: router.dependants
        },
        {
            text: "Income",
            path: router.income
        },
        {
            text: "Debt",
            path: router.debt
        }
    ]
}