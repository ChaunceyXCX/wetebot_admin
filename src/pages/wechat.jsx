import React from "react"
import AppContent from "./app-content";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core";

const styles = theme => (
    {
        root: {
            display: 'flex'
        }
    }
)

/*function wechatContent() {
    return <p>test-list</p>
}*/

class WeChat extends React.Component {

    constructor() {
        super()

        this.state = {
            menu: [
                {
                    title: 'Friends',
                    path: '/wechat/friends',
                    component: () => (<p>test fr</p>)
                },
                {
                    title: '拓展功能',
                    path: '/wechat/external',
                    component: () => ( <p>test 拓展</p>)
                }
            ],
            redirect: '/wechat/friends'
        }
    }

    render(props) {
        // const {classes} = this.props
        return (
            <AppContent open={this.props.open} {...this.state} />
        )
    }
}

WeChat.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(WeChat);