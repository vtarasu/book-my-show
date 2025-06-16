import MovieList from "./MovieList";

function Admin() {

    const tabItem = [
    {
      key: "1",
      label: "Movies",
      children: <MovieList />
    }
  ]

    return (
        <div>
        <h1>Admin Page</h1>
        <p>This is the admin page where you can manage the application settings.</p>
        </div>
    );
}

export default Admin;