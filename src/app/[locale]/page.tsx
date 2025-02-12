import { Fragment } from "react";
import Banner from "../components/Banner/Banner";
import Methods from "../components/Methods/Methods";
import NewRevival from "../components/NewRevival/NewRevival";
import Sets from "../components/Sets/Sets";
import Items from "../components/Items/Items";
import Categories from "../components/Categories/Categories";
import Steam from "../components/Steam/Steam";

function Home() {
  return (
    <Fragment>
      <Banner />
      <Methods />
      <NewRevival />
      <Sets />
      <Items />
      <Categories />
      <Steam />
    </Fragment>
  );
}

export default Home;
