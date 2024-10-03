import Header from "../containers/Header";

const BaseLayout = ({ children }) => {

  return (
    <>
      <Header />
      { children }
      <footer>
        
      </footer>
    </>
  );
};

export default BaseLayout;