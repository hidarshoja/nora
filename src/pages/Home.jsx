import React, { useEffect, useState } from 'react'
import HeaderImgSilder from '../components/HeaderImgSlider';
import CategoriesComponent from '../components/CategoriesComponent';
import OfferSection from '../components/OfferSection';
import BestSellingProducts from '../components/BestSellingProducts';
import NewProducts from '../components/NewProducts';
import ProductCarousel from '../components/ProductCarousel';
import BlogComponent from '../components/BlogComponent';
import axiosClient from '../axios-client';
import { useAtom, useAtomValue } from 'jotai';
import { checkIp } from '../stores/store';

export default function Home() {
  const  [isVisited, setIsCheck]  = useAtom(checkIp)

  useEffect(() => {
    const saveIp = async () => {
      try {
        // Send the request to the backend to save the IP
        await axiosClient.post("/setting/views");

        console.log("IP saved successfully");
        setIsCheck(true)
      } catch (error) {
        console.error("Error saving IP:", error);
        setIsCheck(true)
      }
    };

    if (!isVisited) {
      saveIp()
    }
  }, []);


  return (
    <div>
      <HeaderImgSilder />
      <CategoriesComponent />
      <OfferSection />
      <BestSellingProducts />
      <section className="my-14 px-4">
        <div className="container mx-auto max-w-screen-xl">
          <img className="rounded-2xl" src="assets/images/pic.jpg" alt="" />
        </div>
      </section>
      <NewProducts />
      <section className="my-14 px-4">
        <div className="container mx-auto max-w-screen-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <img className="rounded-3xl" src="assets/images/11.png" alt="" />
            </div>
            <div>
              <img className="rounded-3xl" src="assets/images/12.png" alt="" />
            </div>
          </div>
        </div>
      </section>
      <ProductCarousel />
      <BlogComponent />
    </div>
  )
}
