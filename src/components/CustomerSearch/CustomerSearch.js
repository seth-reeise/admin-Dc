import React from 'react';
import {HashLink as Link} from 'react-router-hash-link';

//TODO: Add login page

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
            customer: null,
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
        this.search();
    }

    search() {
        console.log('before api call: ' + this.state.value);
        fetch(
            'https://localhost:7119/api/Contractform/search?search=' +
            this.state.value
        )
            .then(response => response.json())
            // .then((json) => console.log(json))
            .then(data =>
                this.setState({
                    customer: data,
                    loading: false,
                })
            );
    }

    componentDidMount() {
        console.log('done..');
        console.log(this.state.customer);
    }

    logging() {
        console.log(this.state.customer);
    }

    render() {
        if (!this.state.customer) {
            return (
                <div className={'is-justify-content-start'} >
                    <br />
                    <form onSubmit={this.handleSubmit}>
                        <label>
                            Search:&nbsp;
                        </label>
                        <input
                            type={'textSearch'}
                            value={this.state.value}
                            onChange={this.handleChange}
                        />

                        &nbsp; <input type={'submit'} value={'Submit'} />
                    </form>
                    <br />
                    Waiting...
                </div>
            );
        }
        return (
            <div>
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

                {this.state.loading || !this.state.customer ? (
                    <div>loading...</div>
                ) : (
                    <div>
                        <div className={'container'}>
                            <div className={'columns is-mobile is-multiline'}>
                                {this.state.customer.map((person, index) => (
                                    <SearchListCard
                                        title={person.firstName + ' ' + person.lastName}
                                        person={person}
                                        index={index}
                                        body={
                                            <ul>
                                                <p>
                                                    <b>Dog name:</b> {person.dogName}
                                                </p>
                                                <p>
                                                    <b>Phone number:</b> {person.phoneNumber}
                                                </p>
                                                <p>
                                                    <b>Address:</b>{' '}
                                                    {person.addressLine1 +
                                                        ' ' +
                                                        person.city +
                                                        ', ' +
                                                        person.state +
                                                        ' ' +
                                                        person.zipCode}{' '}
                                                </p>
                                            </ul>
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