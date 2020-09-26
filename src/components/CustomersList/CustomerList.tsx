import React from 'react';
import { CustomerCard } from '../CustomerCard/CustomerCard';
import { Container } from '../Container/Container';
import { BlockReveal } from '../BlockReveal/BlockReveal';
import { Heading } from '../Heading/Heading';
import { useRouteMatch, useHistory } from 'react-router-dom';
import { router } from '../../router';
import { request } from '../../requests/requests';
import { IdentityForm } from '../Modules/BasicInformation/IdentityForm';
import { Button } from '../Button/Button';
import { appContext } from '../Context/AppContext';
import { useRecoilState } from 'recoil';
import { currentFnaState, userState, debtState, childrenState, incomeState, retirementState } from '../Context/FnaRecoilState';
import { Loader } from '../Loader/Loader';
import { Search } from './Search/Search';
import { IFNA } from '../../../db/Fna';
import { useQuery } from 'react-query';
import { notify } from '../Toast/Toast';

export const CustomerList = () => {
    const [customerList, setCustomerList] = React.useState<IFNA[]>();
    const [basicInformation, setBasicInformation] = React.useState({
        firstname: "",
        lastname: "",
        dob: "",
        age: "",
        lifeExpectancy: "82",
        previousDOB: "" 
    })
    const { url } = useRouteMatch();
    const history = useHistory();
    const [appState, setAppState] = React.useContext(appContext);
    const [, setFNA] = useRecoilState(currentFnaState);
    const [, setUser] = useRecoilState(userState);
    const [, setDebt] = useRecoilState(debtState);
    const [, setChildren] = useRecoilState(childrenState);
    const [, setIncome] = useRecoilState(incomeState);
    const [, setRetirement] = useRecoilState(retirementState);
    const [loading, setLoading] = React.useState(true);
    const [showModal, setShowModal] = React.useState(false);

    const { data } = useQuery("getCustomerList", {
        queryFn: async () => {
            const res = await fetch(`/api/getCustomers?id=${appState.user.id}`);
            const json = await res.json();
            return json;
        },
        refetchOnMount: false
    });

    React.useEffect(() => {
        let values = basicInformation.dob.split(/[-/]/);
        if (basicInformation.dob !== basicInformation.previousDOB && basicInformation.dob.length) {
            const day = parseInt(values[0]);
            const month = parseInt(values[1]);
            const year = parseInt(values[2]);

            const dobDate = new Date(year, month, day);
            const today = new Date();
            const difference = Math.abs(today.getTime() - dobDate.getTime());
            setBasicInformation(previousState => (Object.assign({}, previousState, { age: (difference / (1000 * 3600 * 24 * 365.25)).toFixed(0), previousDOB: previousState.dob })));
        }
    }, [basicInformation.dob])

    const handleShowModal = () => {
        setShowModal(!showModal);
    }

    const handleCreateCustomer = () => {
        request("/api/createCustomer", "POST", {
            id: appState.user.id,
            firstname: basicInformation.firstname,
            lastname: basicInformation.lastname,
            dob: basicInformation.dob,
            age: basicInformation.age,
            lifeExpectancy: basicInformation.lifeExpectancy
        }).then((res) => {
            if (!res.err) {
                setUser(res.user);
                setChildren(res.children);
                setIncome(res.income);
                setDebt(res.debt);
                setRetirement(res.retirement);
                setFNA(res.FNA);
                history.push(`${router.customers}/${res.fnaId}${router.basicInformation}`);
                notify({ type: "success", msg: `New customer ${basicInformation.firstname} ${basicInformation.lastname} created successfully.` });
            }

            if (!res.ok) {
                return;
            }
        })
    };

    React.useEffect(() => {
        if (data) {
            setCustomerList(data);
            setLoading(false);
        }   
    }, [data]);

    const isDisabled = () => {
        if (
            basicInformation.firstname.length > 2 &&
            basicInformation.lastname.length > 2 &&
            basicInformation.dob.length > 1 &&
            basicInformation.lifeExpectancy.length > 1
        ) return false;

        return true;
    }
    

    return (
        <Container fluid classname="customers-list">
            <Button classname="add-new-customer-btn" onClick={handleShowModal} text="New Customer" />
            <Search customers={customerList} setCustomers={setCustomerList} />
            {!loading &&
                <Container>
                    {customerList && customerList.map(c => <CustomerCard list={[customerList, setCustomerList]} id={c.fnaId} modules={c.FNA.modules} title={`${c.user.firstname} ${c.user.lastname}`} url={url} cardComplete={c.FNA.modules.fnaCompleted} key={c._id} />)}
                    {!customerList?.length && <Heading>No customer in view. This is a great time to <span onClick={handleShowModal}>create</span> your first one!</Heading>}
                </Container>
            }
            {loading &&
                <Loader />
            }
            {showModal &&
                <section className="modal-wrapper">
                    <BlockReveal changeSettings={{hidden: true, settings: {bgColor: "#845EC2", duration: 300, delay: 400, direction: "tb"}}}>
                        <Container fluid classname="modal">
                        <IdentityForm state={[basicInformation, setBasicInformation]} values={basicInformation} />
                        <Button isDisabled={isDisabled()} onClick={handleCreateCustomer} text="Create" />
                        <Button onClick={handleShowModal} text="Cancel" />
                        </Container>
                    </BlockReveal>
                </section>
            }
        </Container>
    );
}
