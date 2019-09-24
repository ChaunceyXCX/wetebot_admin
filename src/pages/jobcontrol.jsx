import React from "react"
import AppContent from "./app-content";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core";
import JobTable from "./job-table";

const styles = theme => (
    {
        root: {
            display: 'flex'
        }
    }
)

class Jobcontrol extends React.Component {

    constructor(props) {
        super(props)
        this.state={
            menu: [
                {
                    title: 'JobTable',
                    path: '/jobcontrol/jibtable',
                    component: JobTable
                },
                {
                    title: 'CornMaker',
                    path: '/jobcontrol/coremaker',
                    component: JobTable
                }
            ],
            redirect: '/jobcontrol/jibtable',
        }
    }

    render() {
        // const {classes} = this.props
        return (
            <AppContent open={this.props.open} {...this.state} />
        )
    }
}

Jobcontrol.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Jobcontrol);