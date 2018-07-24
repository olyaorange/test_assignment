import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";

import Index from "./Pages/Index";
import Detail from "./Pages/Detail";

const App = props => (
    <main>
        <Switch location={props.location}>
            <Route exact path="/" render={() => <Index />} />
            <Route path="/invest" render={() => <Detail />} />
            <Route render={() => <div>Not Found</div>} />
        </Switch>
    </main>
);

export default withRouter(App);
