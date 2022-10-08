import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import Products from "./Products";

function ViewProduct(props) {
  return (
    <>
      <Navbar />
      <Sidebar />
      <main className="main" id="main">
        <Products type="all" />
      </main>
    </>
  );
}

export default ViewProduct;
