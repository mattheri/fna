import React from 'react';
import { useLocation, Link, useParams, useRouteMatch, useHistory } from 'react-router-dom';
import { locations } from "./locations";
import { ContextNavButton } from './ContextNavButton';
import { router } from '../../router';
import { appContext } from '../Context/AppContext';
interface IItem {
    text: string;
    path: string;
}

export const ContextualNavbar = () => {
    const [show, setShow] = React.useState(false);
    const [items, setItems] = React.useState<IItem[]>([]);
    const [user, setUser] = React.useContext(appContext);

    const handleShow = () => setShow(!show);
    const location = useLocation();

    const handleSetPath = (p: string) => {
        const loc = location.pathname;
        if (
            p === router.basicInformation ||
            p === router.dependants ||
            p === router.debt ||
            p === router.income ||
            p === router.retirement
        ) {
            return loc.replace(/(?:[^\/]*\/){0}(\/[^/]*)$/, p);
        }

        return "";
    }

    const handleClick = (p: string) => {
        if (p === router.login) {
            if (user.isAuthenticated) setUser(prev => (Object.assign({}, prev, { isAuthenticated: false, user: { id: "" } })));
        };
    }
    
    React.useEffect(() => {
        const modules = [
            router.basicInformation,
            router.dependants,
            router.income,
            router.debt,
            router.retirement
        ];

        const module = modules.filter(m => location.pathname.includes(m));
        if (module.length) return setItems(locations[module[0]]);

        setItems(locations[location.pathname]);
    }, [location, items]);

    return (
        <ContextNavButton onClick={handleShow} show={show}>
            <div className="context-nav-container">
                <nav className="context-nav">
                    <ul>
                        {items && items.map(i => <li onClick={handleShow} key={i.path}><Link onClick={() => handleClick(i.path)} to={{pathname: handleSetPath(i.path) || i.path, state: {background: location}}}>{i.text}</Link></li>)}
                    </ul>
                </nav>
            </div>
        </ContextNavButton>
    );
}
