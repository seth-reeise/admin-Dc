import React from 'react';
import {HashLink as Link} from 'react-router-hash-link';
import './styles.scss'

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

class CustomerSearch extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            customers: [],
            value: '',
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
        // this.search();
    }

    handleSubmit(event) {
        // alert('A name was submitted: ' + this.state.value);
        // this.setState({ value: event.target.value });
        event.preventDefault();
        this.callHealth();
        this.search();
    }
    // https://localhost:7119/api/customer/search?search=
    search() {
        fetch(
             `${process.env.REACT_APP_ADMIN_API_URL}/api/customer/search?search=${this.state.value}`
        )
            .then(response => response.json())
            .then(data =>
                this.setState({
                    customers: data,
                    loading: false,
                })
            );
    }

    callHealth() {
        fetch(
            `${process.env.REACT_APP_ADMIN_API_URL}/health`
        )
            .then(response => console.log(response.json()));
    }

    componentDidMount() {
        // console.log(this.state.customers);
    }

    logging() {
        console.log(this.state.customers);
    }

    render() {
        return (
            <div>
            <div className={'search'}>
                <br />
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Search:&nbsp;
                        <input
                            type={'textSearch'}
                            value={this.state.value}
                            onChange={this.handleChange}
                        />

                        &nbsp; <input type={'submit'} value={'Submit'} />
                    </label>
                </form>
                <br />
            </div>

                {this.state.loading || !this.state.customers ? (
                    <div>loading...</div>
                ) : (
                    <div>
                        <div className={'container'}>
                            <div className={'columns is-mobile is-multiline'}>
                                {this.state.customers.map((customer, index) => (
                                    <SearchListCard
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
                                                    {customer.addressLine1 +
                                                        ' ' +
                                                        customer.city +
                                                        ', ' +
                                                        customer.state
                                                        }{' '}
                                                </p>
                                            </div>
                                        }
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

export default CustomerSearch;