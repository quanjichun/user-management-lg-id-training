import React, { Fragment, useMemo } from "react";
import { useUsers } from "../../controller/users";

const Team = ({ team, members }) => {
  return (
    <Fragment>
      <h1>{team}</h1>
      <ul>
        {members.map((d) => (
          <li key={`user_${d.id}`}>{`${d.name}, ${d.email}`}</li>
        ))}
      </ul>
    </Fragment>
  );
};

const TeamMemberList = () => {
  const { loading, data } = useUsers(true);

  const { teams, teamMap } = useMemo(() => {
    const teams = [];
    const teamMap = {};

    if (data && data.length > 0) {
      console.log(data);
      data.forEach(d => {
        console.log(d);
        if (teams.includes(d.team) === false) {
          teams.push(d.team);
          teamMap[d.team] = [];
        }

        teamMap[d.team].push(d);
      });
    }

    return { teams, teamMap };
  }, [data]);

  console.log(teams);
  console.log(teamMap);

  return loading ? (
    <div>loading...</div>
  ) : (
    teams.map((t, index) => <Team key={`team_${index}`} team={t} members={teamMap[t]} />)
  );
};

export default TeamMemberList;
