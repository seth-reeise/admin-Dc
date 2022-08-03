import React from 'react';
import './styles.scss';
import { HashLink as Link } from 'react-router-hash-link';

function FooterLink(props) {
    return (
        <Link to={props.to}>
            <div className={'navbar-item'}>
        <span className={`icon ${props.fontColor}`}>
          <i className={`fas ${props.iconName}`} />
        </span>
                <span style={{ marginLeft: '.5em' }}>{props.linkName}</span>
            </div>
        </Link>
    );
}

function Footer() {
    return (
        <footer
            style={{ marginBottom: 0 }}
            className={'footer footer-background-color'}
        >
            <div className={'container'}>
                <div style={{ marginTop: '3em' }} className={'columns'}>
                    <div className={'column is-3'}>
                        <p
                            style={{ marginLeft: '1em' }}
                            className={'footer-link-title has-text-weight-bold'}
                        >
                            Navigation
                        </p>

                        <FooterLink
                            to={'/'}
                            fontColor={'has-text-primary'}
                            iconName={'fa-home'}
                            linkName={'Home'}
                        />
                        <FooterLink
                            to={'/location'}
                            fontColor={'has-text-success'}
                            iconName={'fa-location-arrow'}
                            linkName={'Location'}
                        />
                        <FooterLink
                            to={'/services'}
                            fontColor={'has-text-warning'}
                            iconName={'fa-rocket'}
                            linkName={'Services'}
                        />

                        <p
                            style={{ marginLeft: '1em' }}
                            className={'bd-footer-link bd-is-more'}
                        >
                            <Link to={'privacy-policy'}>
                                {'Privacy Policy | Terms Of Use'}
                            </Link>
                        </p>
                    </div>

                    <div className={'column is-3'}>
                        <p className={'footer-link-title has-text-weight-bold is-spaced'}>
                            Address
                        </p>
                        <p className={'bd-footer-link is-dark is-3 is-spaced'}>
                            31 N Main St Inman, SC 29349
                        </p>
                        <p className={'footer-link-title has-text-weight-bold is-spaced'}>
                            Phone
                        </p>
                        <p className={'bd-footer-link is-dark is-3 is-spaced'}>
                            864-708-1200
                        </p>
                    </div>

                    <div className={'column is-3'}>
                        <p className={'footer-link-title has-text-weight-bold is-spaced'}>
                            Hours
                        </p>
                        <p className={'bd-footer-link is-dark is-3 is-spaced'}>
                            Varies by appointment
                        </p>
                    </div>

                    <div className={'column is-3'}>
                        <h4 className={'bd-footer-title'}>
                            <strong>{'Share'}</strong> on social media
                        </h4>
                        <div className={'bd-footer-iframe'}>
                            <div
                                className={'fb-like'}
                                data-href={'https://www.facebook.com/TheDivineCanineSC'}
                                data-layout={'button'}
                                data-action={'like'}
                                data-size={'large'}
                                data-show-faces={'false'}
                                data-share={'true'}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;