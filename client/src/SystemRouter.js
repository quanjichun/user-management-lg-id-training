import React, { useCallback } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
} from "react-router-dom";

import UserManagement from "./view/UserManagement-Hook/UserManagement";
import SimpleUserManagement from "./view/SimpleUserManagement-Class/SimpleUserManagement";
import Index from "./view/Index";
import UserDetailPage from "./view/UserManagement-Hook/UserDetailPage";
import SimpleUserDetailPage from "./view/SimpleUserManagement-Class/SimpleUserDetailPage";
import TeamMemberList from "./view/UserManagement-Hook/TeamMemberList";

const BackBtn = () => {
  const history = useHistory();
  const { pathname } = history.location;

  const onBack = useCallback(() => {
    let url = "/";

    if (pathname.includes("/simpleUserManagement/userDetail"))
      url = "/simpleUserManagement";
    else if (pathname.includes("/userManagement/userDetail"))
      url = "/userManagement";

    history.replace(url);
  }, [pathname, history]);

  return pathname !== "/" ? <button onClick={onBack}>Back</button> : "";
};

const SystemRouter = () => {
  return (
    <Router>
      <Switch>
        <Route path="/simpleUserManagement/userDetail">
          <BackBtn />
          <SimpleUserDetailPage />
        </Route>
        <Route path="/simpleUserManagement">
          <BackBtn />
          <SimpleUserManagement />
        </Route>
        <Route path="/userManagement/userDetail/:userId">
          <BackBtn />
          <UserDetailPage />
        </Route>
        <Route path="/userManagement">
          <BackBtn />
          <UserManagement />
        </Route>
        <Route path="/teamMemberList">
          <BackBtn />
          <TeamMemberList />
        </Route>
        <Route path="/">
          <Index />
        </Route>
      </Switch>
    </Router>
  );
};

export default SystemRouter;
