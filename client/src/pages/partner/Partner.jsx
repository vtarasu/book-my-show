import TheatresModal from "./TheatresModal";
import { Tabs } from "antd";
import MovieList from "../admin/MovieList";
import ThreatreList from "../admin/TheatreList";
 
function Partner() {
    const tabItem = [
    {
      key: "1",
      label: "Theatres",
      children: <TheatresModal />
    }
  ]
    return (
        <>
            <div>
                <h2> Partners Page </h2>
                <Tabs items={tabItem}></Tabs>
            </div>
        </>
    );
}

export default Partner;