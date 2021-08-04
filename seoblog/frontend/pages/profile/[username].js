import Head from 'next/head';
import Link from 'next/link';
import {withRouter} from 'next/router';
import Layout from '../../components/Layout';
import {userPublicProfile} from '../../actions/user';
import {API, DOMAIN, APP_NAME} from '../../config';
import moment from 'moment';

const UserProfile = () => {
    return (
        <>
            <Layout>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card">
                                <div className="card-body">
                                    <h5>USERNAME</h5>
                            
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    )
}

export default UserProfile;