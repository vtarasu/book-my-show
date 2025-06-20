import MovieList from "./MovieList";
import ThreatreList from "./TheatreList";
import {Tabs} from 'antd';

function Admin() {

    const tabItem = [
    {
      key: "1",
      label: "Movies",
      children: <MovieList />
    },
    {
      key: "2",
      label: "Theatres",
      children: <ThreatreList />
    }
  ]

    return (
        <div>
        <h2>Admin Page</h2>
        <Tabs items={tabItem}></Tabs>
        </div>
    );
}

export default Admin;