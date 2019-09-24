import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import LinkRef from './app-navlink'

const useStyles = makeStyles(theme => ({
    root: {
        marginLeft: '30px'
    },
}));

/*function LinkTab(props) {
    return (
        <Link component="NavLink" { ...props }/>
    )
}*/

// const LinkTab = React.forwardRef(((props, ref) => (<Link component={NavLink} { ...props } ref={ref}/> ) ))


export default function AppbarTabs() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    function handleChange(event, newValue) {
        setValue(newValue);
    }

    return (
        <Tabs className={classes.root}
            value={value}
            onChange={handleChange}
            // variant="scrollable"
            // scrollButtons="on"
            // indicatorColor="inherit"
            // textColor="white"
            aria-label="scrollable force tabs example"
        >
            <Tab component={LinkRef} to={"/jobcontrol"} label="JobControl" />
            <Tab component={LinkRef} to="/wechat" label="WeChat"/>
            <Tab component={LinkRef} to="/telegram" label="Telgram"/>
        </Tabs>
    );
}