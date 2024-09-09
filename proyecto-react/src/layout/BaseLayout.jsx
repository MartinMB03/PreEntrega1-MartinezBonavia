import Header from "../containers/Header";

const BaseLayout = ({ children }) => {

  return (
    <>
      <Header />
      { children }
      <footer>
        <p>Footer</p>
      </footer>
    </>
  );
};

export default BaseLayout;