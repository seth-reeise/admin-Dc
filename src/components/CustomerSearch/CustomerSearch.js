import React, {useState, useEffect} from 'react';
import {HashLink as Link} from 'react-router-hash-link';
import './styles.scss'
import "primereact/resources/themes/bootstrap4-light-blue/theme.css";
import { ProgressBar } from 'primereact/progressbar';
import 'primereact/resources/primereact.min.css';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';



function SearchListBody(props) {
    if (props.to) {
        return (
            <p>
                <Link to={props.to}>{props.link}</Link> {props.body}
            </p>
        );
    } else {
        return <p>{props.body}</p>;
    }
}

function SearchListCard(props) {
    return (
        <div key={props.index} className={'column is-one-third'}>
            <div className={'flex-card light-bordered raised presentation-card'}>
        <span className={'has-text-primary'}>
          <i style={{marginLeft: '-.3em'}} className={'fas fa-dog fa-3x'} />
        </span>

                <div style={{ marginLeft: '0.5em' }} className={'presentation-text'}>
                    <h3 className={'title is-4 text-bold'}>{props.title}</h3>
                    <p>
                        <SearchListBody
                            body={props.body}
                        />
                    </p>
                </div>
            </div>
        </div>
    );
}

function DataLayoutTabs(activeTab, setActiveTab) {
    // const [activeTab, setActiveTab] = useState('Table');

    function handleOnClick(tab) {
        setActiveTab(tab);
    }

    return (
        <div className="tabs is-toggle is-toggle-rounded is-centered">
            <ul>
                <li
                    id="Table"
                    className={activeTab === 'Table' ? 'is-active' : ''}
                >
                    <a onClick={() => handleOnClick('Table')}>
            <span className="icon is-small">
              <i className="fas fa-table"></i>
            </span>
                        <span>Table</span>
                    </a>
                </li>
                <li
                    id="Cards"
                    className={activeTab === 'Cards' ? 'is-active' : ''}
                >
                    <a onClick={() => handleOnClick('Cards')}>
            <span className="icon is-small">
              <i className="fas fa-id-card"></i>
            </span>
                        <span>Cards</span>
                    </a>
                </li>
            </ul>
        </div>
    );
}

function CustomerSearch() {
    const [loading, setLoading] = useState(false);
    const [customers, setCustomers] = useState(null);
    const [value, setValue] = useState('');
    const [filters, setFilters] = useState({
        global: {value: null, matchMode: FilterMatchMode.CONTAINS},
        name: {value: null, matchMode: FilterMatchMode.STARTS_WITH},
        dogName: {value: null, matchMode: FilterMatchMode.STARTS_WITH},
        phoneNumber: {value: null, matchMode: FilterMatchMode.STARTS_WITH},
        address: {value: null, matchMode: FilterMatchMode.CONTAINS},
    });
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [activeTab, setActiveTab] = useState('Table');

    useEffect(() => {
        search();
        // Code to run on component mount (equivalent to componentDidMount)
    }, []); // Empty dependency array to run the effect only once

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        search();
    };

    const sleep = (ms) => {
        return new Promise((resolve) => setTimeout(resolve, ms));
    };

    const search = async () => {
        setLoading(true);
        await sleep(500);
        fetch('https://localhost:7099/api/customer/search?search=' + value)
            .then((response) => response.json())
            .then((data) => {
                setCustomers(data);
                setLoading(false);
            });
    };

    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        let _filters = {...filters};

        _filters['global'].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    };

    const renderHeader = () => {
        return (
            <div className="flex justify-content-end">
                <span className="p-input-icon-left">
                    <i className="pi pi-search"/>
                    <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search"/>
                </span>
            </div>
        );
    };
    const header = renderHeader();

    const renderTable = () => {
        return (
            <div className="card">
                <DataTable
                    value={customers}
                    paginator
                    rows={10}
                    dataKey="id"
                    filters={filters}
                    filterDisplay="row"
                    loading={loading}
                    globalFilterFields={['firstName', 'lastName', 'dogName', 'phoneNumber', 'addressLine1']}
                    header={header}
                    emptyMessage="No customers found."
                >
                    <Column
                        field="name"
                        header="Name"
                        filter
                        filterPlaceholder="Search by name"
                        body={(rowData) => rowData.firstName + ' ' + rowData.lastName}
                        style={{ minWidth: '12rem' }}
                    />
                    <Column
                        field="dogName"
                        header="Dog Name"
                        filter
                        filterPlaceholder="Search by dog name"
                        style={{ minWidth: '12rem' }}
                    />
                    <Column
                        field="phoneNumber"
                        header="Phone Number"
                        filter
                        filterPlaceholder="Search by phone number"
                        style={{ minWidth: '12rem' }}
                    />
                    <Column
                        field="addressLine1"
                        header="Address"
                        filter
                        filterPlaceholder="Search by address"
                        body={(rowData) => rowData.addressLine1 + ' ' + rowData.city + ', ' + rowData.state}
                        style={{ minWidth: '12rem' }}
                    />
                </DataTable>
            </div>
        );
    };

    const renderCards = () => {
        return (
            <div className={'search'}>
                <br />
                <form onSubmit={handleSubmit}>
                    <label>
                        Search:&nbsp;
                        <input type="textSearch" value={value} onChange={handleChange} />
                        &nbsp; <input type="submit" value={'Submit'} />
                    </label>
                </form>
                <br />

                <div className={'container'}>
                    <div className={'columns is-mobile is-multiline'}>
                        {customers.map((customer, index) => (
                            <SearchListCard
                                key={index}
                                title={customer.firstName + ' ' + customer.lastName}
                                customer={customer}
                                index={index}
                                body={
                                    <div>
                                        <p>
                                            <b>Dog name:</b> {customer.dogName}
                                        </p>
                                        <p>
                                            <b>Phone number:</b> {customer.phoneNumber}
                                        </p>
                                        <p>
                                            <b>Address:</b>{' '}
                                            {customer.addressLine1 + ' ' + customer.city + ', ' + customer.state}{' '}
                                        </p>
                                    </div>
                                }
                            />
                        ))}
                    </div>
                </div>
            </div>
        );
    };

    const handleOnClick = (tab) => {
        // if (tab === 'Table') {
        //     setValue('');
        // }
        setActiveTab(tab)
    };

    return (
        <div>
            <div className="tabs is-toggle is-toggle-rounded is-centered">
                <ul>
                    <li
                        id="Table"
                        className={activeTab === 'Table' ? 'is-active' : ''}
                    >
                        <a onClick={() => handleOnClick('Table')}>
            <span className="icon is-small">
              <i className="fas fa-table"></i>
            </span>
                            <span>Table</span>
                        </a>
                    </li>
                    <li
                        id="Cards"
                        className={activeTab === 'Cards' ? 'is-active' : ''}
                    >
                        <a onClick={() => handleOnClick('Cards')}>
            <span className="icon is-small">
              <i className="fas fa-id-card"></i>
            </span>
                            <span>Cards</span>
                        </a>
                    </li>
                </ul>
            </div>
            {loading ? (
                <div className="card pl-6 pr-6" style={{ border: 'none' }}>
                    <ProgressBar mode="indeterminate" style={{ height: '12px', border: 'none !important' }}></ProgressBar>
                </div>
            ) : activeTab === 'Table' ? (
                renderTable()
            ) : (
                renderCards()
            )}
        </div>
    );
}

export default CustomerSearch;





