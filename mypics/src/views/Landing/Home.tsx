import * as React from "react";
import Welcome from "./Welcome";
import AppAppBar from "./AppAppBar";
import withRoot from "./withRoot";

function Index() {
  return (
    <React.Fragment>
      <Welcome />
    </React.Fragment>
  );
}

export default withRoot(Index);
