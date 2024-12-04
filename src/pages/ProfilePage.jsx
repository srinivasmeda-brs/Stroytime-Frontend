import Tabs, { Tab } from "react-best-tabs";
import "react-best-tabs/dist/index.css";

import Account from "../components/user/Account";
import Preference from "../components/user/Preference";
import UpdatePassword from "../components/user/UpdatePassword";

const ProfilePage = () => {
  return (
    <div className="mx-16">
      <Tabs
        activeTab="1"
        className="mt-6"
        ulClassName=""
        activityClassName="bg-success"
      >
        <Tab
          title="Account"
          class="text-base text-white font-semibold tracking-tight border-b pb-2"
        >
            <Account />
        </Tab>
        <Tab
          title="Preferences"
          class="text-base text-white font-semibold tracking-tight border-b pb-2"
        >
          <br />
          <Preference />
        </Tab>
        <Tab
          title="Reset Password"
          class="text-base text-white font-semibold tracking-tight border-b pb-2"
        >
          <UpdatePassword />
        </Tab>
      </Tabs>
    </div>
  );
};

export default ProfilePage;

{
  <div className="mx-16">
<Tabs
  activeTab="1"
  className="mt-6"
  ulClassName=""
  activityClassName="bg-success"
>
  <Tab
    title="Account"
    class="text-base text-white font-semibold tracking-tight border-b pb-2"
  >
     Tab 1
  </Tab>
  <Tab
    title="Preferences"
    class="text-base text-white font-semibold tracking-tight border-b pb-2"
  >
    <br />
    Tab 2
  </Tab>
  <Tab
    title="Reset Password"
    class="text-base text-white font-semibold tracking-tight border-b pb-2"
  >
     TAb 3
  </Tab>
</Tabs>
</div> 
}
