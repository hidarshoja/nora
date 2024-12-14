import  { useState } from "react"; 
import EditProductModal from "./EditProductModal";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";

const ProductTable = () => {
  const [products, setProducts] = useState([
  
    { id: 1, title: "سیبک فرمان پراید", originalPrice: 500000, discountedPrice: 450000, image: "/assets/images/new-img/sipak12.jpg", sales: 30, popularity: 4.8, prand: "saipa", category: "steering" },
    { id: 2, title: "سیبک فرمان ساینا", originalPrice: 500000, discountedPrice: 450000, image: "/assets/images/new-img/sipak7.jpg", sales: 30, popularity: 4.8, prand: "saipa", category: "steering" },
    { id: 3, title: "سیبک فرمان سمند", originalPrice: 500000, discountedPrice: 450000, image: "/assets/images/new-img/sipak8.jpg", sales: 30, popularity: 4.8, prand: "iranKhodo", category: "steering" },
    { id: 4, title: "سیبک فرمان پژو 206", originalPrice: 500000, discountedPrice: 450000, image: "/assets/images/new-img/sipak9.jpg", sales: 30, popularity: 4.8, prand: "saipa", category: "steering" },
    { id: 5, title: "سیبک فرمان تیبا", originalPrice: 500000, discountedPrice: 450000, image: "/assets/images/new-img/sipak10.jpg", sales: 30, popularity: 4.8, prand: "saipa", category: "steering" },
    { id: 6, title: "سیبک فرمان دنا", originalPrice: 500000, discountedPrice: 450000, image: "/assets/images/new-img/sipak11.jpg", sales: 30, popularity: 4.8, prand: "iranKhodo", category: "steering" },
    { id: 7, title: "سیبک فرمان رانا", originalPrice: 500000, discountedPrice: 450000, image: "/assets/images/new-img/sipak13.jpg", sales: 30, popularity: 4.8, prand: "saipa", category: "steering" },
    { id: 8, title: "سیبک فرمان 405", originalPrice: 500000, discountedPrice: 450000, image: "/assets/images/new-img/sipak12.jpg", sales: 30, popularity: 4.8, prand: "iranKhodo", category: "steering" },
    { id: 9, title: "سیبک فرمان پژو پارس", originalPrice: 500000, discountedPrice: 450000, image: "/assets/images/new-img/sipak12.jpg", sales: 30, popularity: 4.8, prand: "saipa", category: "steering" },
    { id: 10, title: "سیبک فرمان آریسان", originalPrice: 500000, discountedPrice: 450000, image: "/assets/images/new-img/sipak12.jpg", sales: 30, popularity: 4.8, prand: "saipa", category: "steering" },
    
  ]);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; 
  
  const handleDelete = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };


  const getBrandName = (brand) => {
    const brands = {
      iranKhodo: "ایران خودرو",
      saipa: "سایپا",
      other: "متفرقه",
      chinese: "وارداتی",
    };
    return brands[brand] || brand;
  };

 
  const getCategoryName = (category) => {
    const categories = {
      steering: "فرمان",
      suspension: "جلوبندی",
      engine: "موتور",
      electrical: "برقی",
      standard: "مکانیزم و استاندارد",
      decoration: "تزئینی",
      gearbox: "گیریبکس",
    };
    return categories[category] || category;
  };

  
  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

 
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="overflow-x-auto">
      <table className="table-auto w-full text-center border ">
        <thead className="border-b-2 bg-[#090580] text-white">
          <tr className="text-sm lg:text-md">
            <th className="py-3">آیدی</th>
            <th>عکس</th>
            <th>نام محصول</th>
            <th>قیمت اصلی</th>
            <th>قیمت تخفیف‌دار</th>
            <th>تعداد فروش</th>
            <th>برند</th>
            <th>دسته‌بندی</th>
            <th>عملیات</th>
          </tr>
        </thead>
        <tbody>
          {currentProducts.map((product) => (
            <tr key={product.id} className="mt-1 hover:bg-green-500 hover:text-white text-sm lg:text-md">
              <td className="py-2">{product.id}</td>
              <td className="flex items-center justify-center w-full">
                <img src={product.image} className="w-10 h-10" alt="" />
              </td>
              <td>{product.title}</td>
              <td>
                {new Intl.NumberFormat("fa-IR").format(product.originalPrice)} تومان
              </td>
              <td>
                {new Intl.NumberFormat("fa-IR").format(product.discountedPrice)} تومان
              </td>
              <td>{product.sales}</td>
              <td>{getBrandName(product.prand)}</td>
              <td>{getCategoryName(product.category)}</td>
              <td>
                <button onClick={() => handleEdit(product)}>
                  <CiEdit />
                </button>
                <button onClick={() => handleDelete(product.id)}>
                  <MdDelete />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

  
      {products.length > itemsPerPage && (
        <div className="flex justify-center mt-4">
          <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} className="mx-2">قبلی</button>
          {[...Array(Math.ceil(products.length / itemsPerPage))].map((_, index) => (
            <button 
              key={index} 
              onClick={() => paginate(index + 1)} 
              className={`mx-2 px-3 rounded-sm py-1 ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
            >
              {index + 1}
            </button>
          ))}
          <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === Math.ceil(products.length / itemsPerPage)} className="mx-2">بعدی</button>
        </div>
      )}

      {isModalOpen && (
        <EditProductModal
          product={selectedProduct}
          onClose={() => setIsModalOpen(false)}
          onSave={(updatedProduct) => {
            setProducts((prevProducts) =>
              prevProducts.map((p) =>
                p.id === updatedProduct.id ? updatedProduct : p
              )
            );
            setIsModalOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default ProductTable;
