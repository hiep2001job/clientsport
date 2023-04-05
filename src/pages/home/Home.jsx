import React, { useEffect, useState } from "react";

import { BiUpArrow } from "react-icons/bi";
import ScrollToTop from "react-scroll-to-top";
import productApi from "../../api/product";
import ProductSection from "../../component/product_section/ProductSection";
import WhoChooseProduct from "../../component/who_choose_product/WhoChooseProduct";
import Banner from "../../share/banner/Banner";

const Home = () => {
  const [newProducts, setNewProducts] = useState([]);
  const [hotProducts, setHotProducts] = useState([]);

  //Get active products
  const getNewsProduct = async () => {
    try {
      const rsData = await productApi.getAll(1);
      if (rsData) setNewProducts(rsData);
    } catch (error) {
      return error;
    }
  };
  //Get hot products
  const getHotProduct = async () => {
    try {
      const rsData = await productApi.getHotProducts();
      if (rsData) setHotProducts(rsData);
    } catch (error) {
      return error;
    }
  };
  useEffect(() => {
    getNewsProduct();
    getHotProduct();
  }, []);

  return (
    <>
      <div id="home">
        <Banner />
        <ProductSection data={[...hotProducts]} sectionName="Hot Product" />
        <ProductSection data={[...newProducts]} sectionName="New Product" />
        <ScrollToTop
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "yellow",
          }}
          smooth
          viewBox="0 0 24 24"
          component={<BiUpArrow />}
        />
      </div>
    </>
  );
};

export default Home;
