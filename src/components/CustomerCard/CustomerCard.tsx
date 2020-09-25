import React from 'react';
import { Heading } from '../Heading/Heading';
import { Link } from 'react-router-dom';
import { Icon } from "@iconify/react";
import trashIcon from "@iconify/icons-fa-solid/trash-alt";
import donateIcon from '@iconify/icons-fa-solid/donate';
import landmarkIcon from '@iconify/icons-fa-solid/landmark';
import babyIcon from '@iconify/icons-fa-solid/baby';
import userIcon from '@iconify/icons-fa-solid/user';
import caravanIcon from '@iconify/icons-fa-solid/caravan';
import checkCircle from '@iconify/icons-fa-solid/check-circle';
import { router } from '../../router';
import { request } from '../../requests/requests';
import { IFNA } from '../../../db/Fna';

interface ICustomerCard {
    id: string;
    title: string;
    url: string;
    cardComplete: boolean;
    modules: {
        fnaCompleted: boolean,
        userCompleted: boolean,
        childrenCompleted: boolean,
        incomeCompleted: boolean,
        debtCompleted: boolean,
        retirementCompleted: boolean
    };
    list: [any, any];
}

export const CustomerCard = ({ id, title, url, modules, cardComplete, list }: ICustomerCard) => {

    const [, setCustomerList] = list;

    const handleDelete = () => {
        request(`/api/deleteCustomer?id=${id}`, "DELETE").then(() => {
            setCustomerList((prev: any) => (prev.filter((c: any) => c.fnaId !== id)));
        });
    }

    return (
        <article className="customer-card flip-in-ver-right">
        <Link className="customer-card-body-link" to={`${url}/${id}${router.basicInformation}`}></Link>
            <Heading as="h4">{title}</Heading>
            <section className="customer-card-body">
                <Link className="modules-link" to={`${url}/${id}${router.basicInformation}`}><Icon color={modules.userCompleted ? "#00C9A7" : "#000000"} icon={userIcon} /></Link>
                <Link className="modules-link" to={`${url}/${id}${router.dependants}`}><Icon color={modules.childrenCompleted ? "#00C9A7" : "#000000"}  icon={babyIcon} /></Link>
                <Link className="modules-link" to={`${url}/${id}${router.income}`}><Icon color={modules.incomeCompleted ? "#00C9A7" : "#00000"}  icon={donateIcon} /></Link>
                <Link className="modules-link" to={`${url}/${id}${router.debt}`}><Icon color={modules.debtCompleted ? "#00C9A7" : "#00000"}  icon={landmarkIcon} /></Link>
                <Link className="modules-link" to={`${url}/${id}${router.retirement}`}><Icon color={modules.retirementCompleted ? "#00C9A7" : "#00000"}  icon={caravanIcon} /></Link>
            </section>
            <section className="customer-card-footer">
                <button onClick={handleDelete} className="modules-link card-delete"><Icon icon={trashIcon} /></button>
                <button className="modules-link card-complete"><Icon color={cardComplete ? "#00C9A7" : "#00000"} icon={checkCircle} /></button>
            </section>
        </article>
    );
}
