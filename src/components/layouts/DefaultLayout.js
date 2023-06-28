import Banner from "./Banner";
import Footer from "./Footer";
import Top from "./Top";
import "../styles/DefaultLayoutStyle.css";
const DefaultLayout = ({className, children }) => {
  return (
    <>
    <div>
    <Top />
      <Banner />
      <div className={className}>{children}</div>
      <Footer />
    </div>
    </>
  );
};

export default DefaultLayout;
