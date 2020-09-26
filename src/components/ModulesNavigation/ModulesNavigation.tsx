import React from 'react';
import { useLocation, Link, useRouteMatch, useHistory } from 'react-router-dom';
import { IFNA } from '../../../db/Fna';
import { router } from '../../router';
import { ModulesNavigationLink } from './ModulesNavigationLink';

type Links = { text: string, to: string };
export const ModulesNavigation = () => {

    const location = useLocation();
    const { url } = useRouteMatch();
    const [links, setLinks] = React.useState<Links[]>([]);

    React.useEffect(() => {

        const totalLinks: Links[] = [
            {
                text: "Information",
                to: `${url}${router.basicInformation}`
            },
            {
                text: "Dependants",
                to: `${url}${router.dependants}`
            },
            {
                text: "Income",
                to: `${url}${router.income}`
            },
            {
                text: "Debt",
                to: `${url}${router.debt}`
            },
            {
                text: "Retirement",
                to: `${url}${router.retirement}`
            },
        ];

        const availableLinks: Links[] = [];

        for (let i = 0; i < totalLinks.length; i++) {
            if (i === totalLinks.indexOf(totalLinks.filter(l => location.pathname.includes(l.to))[0])) {
                if (!totalLinks[i + 1]) {
                    availableLinks.push(totalLinks[i - 1]);
                    break;
                }

                if (i - 1 >= 0) {
                    availableLinks.push(totalLinks[i - 1]);
                    availableLinks.push(totalLinks[i + 1]);
                    break;
                }
    
                availableLinks.push(totalLinks[i + 1]);
                break;
            }
        }
        setLinks(availableLinks)
    }, [location])

    return (
        <nav className="modules-navigation">
            <div className="modules-navigation-container">
                {links.length && links.map((l, i) => {
                    if (location.pathname.includes(router.basicInformation)) {
                        return <ModulesNavigationLink key={i} to={l.to} text={l.text} classname="right" />
                    }

                    if (location.pathname.includes(router.retirement)) {
                        return <ModulesNavigationLink key={i} to={l.to} text={l.text} classname="left" />
                    }

                    if (!location.pathname.includes(router.basicInformation) && !location.pathname.includes(router.retirement)) {
                        if (i === 0) {
                            return <ModulesNavigationLink key={i} to={l.to} text={l.text} classname="left" />
                        }

                        if (i > 0) {
                            return <ModulesNavigationLink key={i} to={l.to} text={l.text} classname="right" />
                        }
                    }
                })}
            </div>
        </nav>
    );
}
