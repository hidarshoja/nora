export const printInvoice = (invoiceData) => {
    const printWindow = window.open('', '', 'width=800,height=600');
    printWindow.document.write(`
      <html>
        <head>
          <title>فاکتور بازرگانی نوراپارت</title>
          <style>
            body {
              direction: rtl;
              font-family: Tahoma, Arial, sans-serif;
              margin: 20px;
              padding: 0;
              background-color: #f4f4f4;
            }
            .container {
              background-color: #fff;
              padding: 20px;
              border-radius: 10px;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
              width: 100%;
              max-width: 800px;
              margin: 0 auto;
            }
            h1 {
              text-align: center;
              font-size: 24px;
              margin-bottom: 20px;
            }
            .section-title {
              font-weight: bold;
              background-color: #e0e0e0;
              padding: 5px;
              margin-bottom: 10px;
            }
            .row {
              display: flex;
              justify-content: space-between;
              margin-bottom: 10px;
            }
            .row div {
              padding: 8px;
              flex: 1;
              text-align: center;
            }
            .row div:nth-child(even) {
              background-color: #f8f8f8;
            }
            .row div:nth-child(odd) {
              background-color: #fff;
            }
            .products-list {
              margin-top: 20px;
            }
            .products-list li {
              display: flex;
              justify-content: space-between;
              padding: 5px 0;
              border-bottom: 1px solid #ddd;
            }
            .products-list li:last-child {
              border-bottom: none;
            }
            .footer {
              margin-top: 20px;
              text-align: center;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>فاکتور بازرگانی نوراپارت</h1>
            <div class="section-title">اطلاعات سفارش</div>
              <div class="row">
              <div><strong>وضعیت:</strong> ${invoiceData.address.status}</div>
            </div>
            <div class="row">
              <div><strong>کد سفارش:</strong> ${invoiceData.address_id}</div>
              <div><strong>تاریخ:</strong> ${new Intl.DateTimeFormat('fa-IR').format(new Date(invoiceData.address.createdAt))}</div>
              
            </div>
           
            <div class="row">
              <div><strong>جمع سبد خرید:</strong> ${new Intl.NumberFormat('fa-IR').format(invoiceData.total_price)} تومان</div>
            </div>
            
            <div class="section-title">محصولات</div>
            <ul class="products-list">
              ${invoiceData.orders.map(product => `
                <li>
                  <span>${product.product.name}</span>
                  <span>${new Intl.NumberFormat('fa-IR').format(product.product.price_with_off || product.product.price)} تومان</span>
                </li>
              `).join('')}
            </ul>
  
            <div class="footer">
              <p>© 2024 بازرگانی نوراپارت</p>
            </div>
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };