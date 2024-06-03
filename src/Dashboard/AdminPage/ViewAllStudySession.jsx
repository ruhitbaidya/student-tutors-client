import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import useQueryGetSecure from "../../Hooks/QueryGet/useQueryGetSecure";
import { useEffect, useState } from "react";
import StatusPageSession from "./StatusPageSession";

const ViewAllStudySession = () => {
  const [sendstatus, setSendStatus] = useState("pending");
  const [session, setSession] = useState([]);
  const [secureData, refetch] = useQueryGetSecure(`/allTutorSession/${sendstatus}`);
  useEffect(() => {
    setSession(secureData?.data);
  }, [secureData]);
  const handelsseccion = (status) => {
    setSendStatus(status);
  };
  console.log(session);
  return (
    <div>
      <Tabs>
        <TabList>
          <Tab onClick={() => handelsseccion("pending")}>Pending</Tab>
          <Tab onClick={() => handelsseccion("approve")}>Approved</Tab>
          <Tab onClick={() => handelsseccion("rejected")}>Rejecting</Tab>
        </TabList>
        <TabPanel>
          <StatusPageSession users={session} refetch={refetch} />
        </TabPanel>
        <TabPanel>
          <StatusPageSession users={session} refetch={refetch} />
        </TabPanel>
        <TabPanel>
          <StatusPageSession users={session} refetch={refetch} />
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default ViewAllStudySession;
