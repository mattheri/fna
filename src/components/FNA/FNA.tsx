import React from 'react';
import { Container } from '../Container/Container';
import { Switch, useRouteMatch, Route, useParams } from 'react-router-dom';
import { BasicInformation } from '../Modules/BasicInformation/BasicInformations';
import { router } from '../../router';
import { ModulesNavigation } from '../ModulesNavigation/ModulesNavigation';
import { Dependants } from '../Modules/Dependants/Dependants';
import { Income } from '../Modules/Income/Income';
import { Debt } from "../Modules/Debt/Debt";
import { useRecoilState } from 'recoil';
import { userState, debtState, childrenState, incomeState, retirementState } from '../Context/FnaRecoilState';
import { Retirement } from '../Modules/Retirement/Retirement';
import { request } from '../../requests/requests';
import { Loader } from '../Loader/Loader';
import save from '@iconify/icons-fa-solid/save';
import { Icon } from "@iconify/react";
import { Button } from '../Button/Button';
import { useQuery } from 'react-query';
import { notify } from '../Toast/Toast';

export const FNA = () => {
    const { id } = useParams();
    const { path } = useRouteMatch();
    const [user, setUser] = useRecoilState(userState);
    const [debt, setDebt] = useRecoilState(debtState);
    const [children, setChildren] = useRecoilState(childrenState);
    const [income, setIncome] = useRecoilState(incomeState);
    const [retirement, setRetirement] = useRecoilState(retirementState);
    const [req, setReq] = React.useState(true);
    const [isDisabled, setIsDisabled] = React.useState(false);

    const { data } = useQuery(id, {
        queryFn: async () => {
            const res = await fetch(`/api/getSingleCustomer?id=${id}`);
            const json = await res.json();
            return json;
        },
        refetchOnMount: false
    });

    const handleUpdateFnaInDb = async () => {
        const res = await request(`/api/updateCustomer?id=${id}`, "PUT", {
            user: user,
            debt: debt,
            children: children,
            income: income,
            retirement: retirement
        });

        if (res) notify({ type: "success", msg: `${user.firstname} ${user.lastname} has been updated with the new information!` }); 
    };

    React.useEffect(() => {
        if (data) {
            setUser(data.user);
            setChildren(data.children);
            setIncome(data.income);
            setDebt(data.debt);
            setRetirement(data.retirement);
            setReq(false);
        }
    }, [data]);

    React.useEffect(() => {
        setTimeout(() => {
            setIsDisabled(false);
        }, 5000);
    }, [isDisabled]);

    return (
        <Container fluid>
            <Button classname="fna-save" disabled={isDisabled} onClick={() => {
                handleUpdateFnaInDb();
                setIsDisabled(true);
            }} text={<Icon icon={save} />} />
            {!req &&
                <>
                    <Switch>
                        <Route path={`${path}${router.basicInformation}`}>
                            <BasicInformation />
                        </Route>
                        <Route path={`${path}${router.dependants}`}>
                            <Dependants />
                        </Route>
                        <Route path={`${path}${router.income}`}>
                            <Income />
                        </Route>
                        <Route path={`${path}${router.debt}`}>
                            <Debt />
                        </Route>
                        <Route path={`${path}${router.retirement}`}>
                            <Retirement />
                        </Route>
                    </Switch>
                    <ModulesNavigation />
                </>
            }
            {req && <Loader />}
        </Container>
    );
}
