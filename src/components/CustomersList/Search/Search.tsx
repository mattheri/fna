import React from 'react';
import { Container } from '../../Container/Container';
import { Form } from '../../Form/Form';
import { Input } from '../../Input/Input';
import { IFNA } from "../../../../db/Fna";

type Props = { customers: IFNA[] | undefined, setCustomers: React.Dispatch<React.SetStateAction<IFNA[] | undefined>> };
export const Search = ({customers, setCustomers}: Props) => {

    const [search, setSearch] = React.useState<{ [key: string]: string }>({ search: "" });
    
    const handleSearch = (query: string) => {
        const output = customers?.filter(c => c.user.firstname.toLowerCase().includes(query.toLowerCase()) || c.user.lastname.toLowerCase().includes(query.toLowerCase()) );
        setCustomers(output);
    }
    
    return (
        <Container>
            <Form onChange={() => handleSearch(search.search)} stateToUpdate={[search, setSearch]}>
                <Input autoComplete="off" id="customers-search" label="Search" value={search.search} />
            </Form>
        </Container>
    );
}
