import React from "react";
import {NavLink} from "react-router-dom";


const AppNavLink = React.forwardRef((props, ref) => <div ref={ref}><NavLink {...props} /></div>);

export default AppNavLink;