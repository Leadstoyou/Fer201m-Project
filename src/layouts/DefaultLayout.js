import Banner from "./Banner";
import Footer from "./Footer";
import Top from "./Top";
import "../styles/DefaultLayoutStyle.css";
const DefaultLayout = ({className, children }) => {
  return (
    <>
      <Top />
      <Banner />
      <div className={className}>{children}</div>
      <Footer />
    </>
  );
};

export default DefaultLayout;
