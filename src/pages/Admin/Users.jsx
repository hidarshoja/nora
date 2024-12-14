const usersData = [
    {
      id: 1,
      name: "علی رضایی",
      phone: "09121234567",
      email: "ali.rezaei@example.com",
      purchaseCount: 5,
      password: "password123",
    },
    {
      id: 2,
      name: "سارا محمدی",
      phone: "09127654321",
      email: "sara.mohammadi@example.com",
      purchaseCount: 3,
      password: "password123",
    },
    {
      id: 3,
      name: "محمد امیری",
      phone: "09129876543",
      email: "mohammad.amiri@example.com",
      purchaseCount: 7,
      password: "password123",
    },
    {
      id: 4,
      name: "زهرا شاهی",
      phone: "09122223344",
      email: "zahra.shahi@example.com",
      purchaseCount: 2,
      password: "password123",
    },
    {
      id: 5,
      name: "امیرحسین نیکو",
      phone: "09124445566",
      email: "amirhossein.niko@example.com",
      purchaseCount: 10,
      password: "password123",
    },
    {
      id: 6,
      name: "آیدا عسگری",
      phone: "09127778899",
      email: "aida.asgari@example.com",
      purchaseCount: 4,
      password: "password123",
    },
    {
      id: 7,
      name: "فرزاد کریمی",
      phone: "09128889900",
      email: "farzad.karimi@example.com",
      purchaseCount: 6,
      password: "password123",
    },
    {
      id: 8,
      name: "لیلا شریفی",
      phone: "09125557788",
      email: "leila.sharifi@example.com",
      purchaseCount: 1,
      password: "password123",
    },
    {
      id: 9,
      name: "صادق اکبری",
      phone: "09129998877",
      email: "sadegh.akbari@example.com",
      purchaseCount: 8,
      password: "password123",
    },
    {
      id: 10,
      name: "مینا ابراهیمی",
      phone: "09123334455",
      email: "mina.ebrahimi@example.com",
      purchaseCount: 9,
      password: "password123",
    },
  ];
  import { useState } from "react";
import { MdDelete } from "react-icons/md";

  export default function Users() {
    const [users, setUsers] = useState(usersData); 
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(8);
  
 
  
    const handleDelete = (id) => {
      setUsers(users.filter((user) => user.id !== id));
    };
  
    const paginate = (pageNumber) => {
      setCurrentPage(pageNumber);
    };
  
    const currentUsers = users.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
  
  
  
    
  
    return (
     <div className="md:p-4">
      <h1 className="text-lg md:text-xl font-YekanBakh-Regular  mb-5">صفحه کاربران</h1>
      <div className="overflow-x-auto">
        <table className="table-auto w-full text-center border">
          <thead className="border-b-2 bg-[#090580] text-white">
            <tr>
              <th className="py-3">آیدی</th>
              <th>نام کاربر</th>
              <th>شماره تماس</th>
              <th>ایمیل</th>
              <th>تعداد خرید</th>
              <th>پسورد</th>
              <th>عملیات</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user) => (
              <tr key={user.id} className="mt-1 hover:bg-green-500 hover:text-white">
                <td className="py-2">{user.id}</td>
                <td>{user.name}</td>
                <td>{user.phone}</td>
                <td>{user.email}</td>
                <td>{user.purchaseCount}</td>
                <td>{user.password}</td>
                <td>
                  
                  <button onClick={() => handleDelete(user.id)}>
                    <MdDelete />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
  
        {users.length > itemsPerPage && (
          <div className="flex justify-center mt-4">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="mx-2"
            >
              قبلی
            </button>
            {[...Array(Math.ceil(users.length / itemsPerPage))].map((_, index) => (
              <button
                key={index}
                onClick={() => paginate(index + 1)}
                className={`mx-2 px-3 rounded-sm py-1 ${
                  currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-gray-300"
                }`}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === Math.ceil(users.length / itemsPerPage)}
              className="mx-2"
            >
              بعدی
            </button>
          </div>
        )}
  
      
      </div>
     </div>
    );
  }
  