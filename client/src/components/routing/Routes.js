import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Login from '../auth/Login'
import Register from '../auth/Register'
import HalisahaReklam from '../halisaha/HalisahaReklam'
import Profiles from '../profile/Profiles'
import NotFound from "../layout/NotFound"
import HalisahaTable from '../halisaha/HalisahaTable'
import PrivateRoute from './PrivateRoute'
import VerifyEmail from '../email/VerifyEmail'
import ForgotPassword from "../email/ForgotPassword"
import ResetPassword from '../email/ResetPassword'
import HalisahaRegisterRequest from "../halisaha/HalisahaRegisterRequest"
import PrivateRouteForUser from './PrivateRouteForUser'
import PrivateRouteForManager from './PrivateRouteForManager'
import HalisahaRegister from '../halisaha/manager/HalisahaRegister'
import EditHalisaha from '../halisaha/manager/EditHalisaha'
import Alert from '../layout/Alert'
import HalisahaRezervation from '../halisaha/HalisahaRezervation'
import PreTransaction from '../auth/PreTransaction'
import HalisahaSearch from '../halisaha/HalisahaSearch'

const Routes = () => {

        return (
            <div>
                <Alert />
                <Switch>
                    <Route exact path="/auth/register" component={Register} />
                    <Route exact path="/auth/login" component={Login} />
                    <PrivateRoute exact path="/auth/edit-profile" component={Profiles} />
                    <Route exact path="/auth/verifyEmail" component={VerifyEmail} />
                    <Route exact path="/auth/reset-password" component={ResetPassword} />
                    <Route exact path="/auth/forgot-password" component={ForgotPassword} />
                    <PrivateRoute exact path="/auth/pre-transactions" component={PreTransaction} />

                    <Route exact path="/halisaha/:city" component={HalisahaReklam} />
                    <Route exact path="/halisaha/:city/:id/:slug" component={HalisahaTable} />
                    <PrivateRouteForUser exact path="/halisaha/register/request" component={HalisahaRegisterRequest} />
                    <PrivateRouteForManager exact path="/halisaha/register/control" component={HalisahaRegister} />
                    <PrivateRouteForManager exact path="/halisaha/:id/edit-halisaha" component={EditHalisaha} />
                    <PrivateRoute exact path="/halisaha/:city/:id/:slug/:date/:time/:rezervation" component={HalisahaRezervation} />
                    <Route exact path="/halisaha/:city/search" component={HalisahaSearch} />
                    <Route component={NotFound}/>
                </Switch>
            </div>
        )

}
export default Routes;
