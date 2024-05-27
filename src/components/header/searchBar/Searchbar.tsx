import "./searchbar.css";

function Searchbar() {
  return (
    <div className="search-bar">
      <form
        className="search-form d-flex align-item-center"
        method="POST"
        action="#"
      >
        <input
          type="text"
          name="query"
          placeholder="Search"
          title="Enter Search keyword"
        />
        <button type="submit" title="Search">
          <i className="bi bi-search"></i>
        </button>
      </form>
    </div>
  );
}

export default Searchbar;
