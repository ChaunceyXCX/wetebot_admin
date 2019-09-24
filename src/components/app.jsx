import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box'
import AppHeader from "../pages/app-header";
import * as PudSub from "pubsub-js";
import {withStyles} from "@material-ui/core";
import {  Route,Switch } from "react-router-dom";
import JobControl from "../pages/jobcontrol"
import WeChat from "../pages/wechat"

const styles = theme => (
    {
        root: {
            display: 'flex'
        }
    }
)

class App extends Component {

    state = {
        open: false,
    }

    componentDidMount() {
        PudSub.subscribe("drower-open", (msg,data) => {
            this.setState({ open: data })
        })
        PudSub.subscribe("appbar-open", (msg,data) => {
            this.setState({ open: data })
        })
    }

    render() {
        // const { classes } = this.props;
        return (
                <Box style={{minHeight: '100vh'}}>
                    {/*<Route path="/" component={AppHeader}>*/}

                    <AppHeader open={this.state.open}/>
                    <Switch>
                        <Route path="/jobcontrol"  component={() => (<JobControl open={this.state.open}/> )}/>
                        <Route path="/wechat" component={() => (<WeChat open={this.state.open} />)}/>
                    </Switch>

                </Box>
                /*<Router>
                    <Route path="/" component={<App/>} >
                        <IndexRoute component={Dashboard} />
                        <Route path="jobcontrol" component={<AppDrower/>}>
                            <Route path="jobtable" component={<JobTable/>} />
                        </Route>

                    </Route>
                </Router>*/

        );
    }
}

App.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(App);