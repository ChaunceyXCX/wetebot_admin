import React from "react";
import {withStyles} from "@material-ui/core";
import PropTypes from 'prop-types';
import Box from "@material-ui/core/Box";
import {Switch, Route, Redirect} from "react-router-dom";
import AppDrower from "./app-drower";

const styles = theme => ({
    root: {
        display: 'flex'
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
});

class AppContent extends React.Component {

    render() {
        const {classes, menu, redirect} = this.props;
        return (
            <Box className={classes.root}>
                <AppDrower {...this.props}/>
                <main className={classes.content}>
                    <div className={classes.toolbar}/>
                    {/*<JobTable/>*/}
                    <Switch>
                        {
                            menu.map((item, index) =>
                                <Route key={ index } path={item.path} component={item.component}/>
                            )
                        }

                        <Redirect to={redirect} />
                    </Switch>
                </main>
            </Box>
        )
    }
}

AppContent.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(AppContent)