const fs = require("fs");
const path = require("path");
const csvParser = require("csv-parser");
const { sequelize, Order, Product, Customer, OrderItem, Region, Payment } = require("../models");

const BATCH_SIZE = 1000;
const CSV_FILE_PATH = path.join(__dirname, "../file/sales_data.csv");
console.log(CSV_FILE_PATH);

const processBatch = async (batch) => {
    const transaction = await sequelize.transaction();
    try {
        for (const record of batch) {
            const [region] = await Region.upsert(
                { name: record["Region"] },
                { transaction }
            );
        
            let payment = await Payment.findOne({
                where: {
                    orderId: record["Order ID"],
                    method: record["Payment Method"],
                },
                transaction,
            });
        
            if (!payment) {
                payment = await Payment.create(
                    {
                        method: record["Payment Method"],
                        orderId: record["Order ID"],
                    },
                    { transaction }
                );
            }
        
            const [customer] = await Customer.upsert(
                {
                    id: record["Customer ID"],
                    name: record["Customer Name"],
                    email: record["Customer Email"],
                    address: record["Customer Address"],
                },
                { transaction }
            );
        
            const parseDate = (dateStr) => {
                const [day, month, year] = dateStr.split("-"); // Split DD-MM-YYYY
                return new Date(`${year}-${month}-${day}`);   // Convert to YYYY-MM-DD
            };
        
            const [product] = await Product.upsert(
                {
                    id: record["Product ID"],
                    name: record["Product Name"],
                    category: record["Category"],
                    unitPrice: parseFloat(record["Unit Price"]),
                },
                { transaction }
            );
        
            const [order] = await Order.upsert(
                {
                    id: record["Order ID"],
                    customerId: customer.id,
                    regionId: region.id,
                    paymentId: payment.id,
                    dateOfSale: parseDate(record["Date of Sale"]),
                    shippingCost: parseFloat(record["Shipping Cost"]),
                    discount: parseFloat(record["Discount"]),
                },
                { transaction }
            );
        
            const existingOrderItem = await OrderItem.findOne({
                where: { orderId: order.id, productId: product.id },
                transaction
            });
        
            if (existingOrderItem) {
                await existingOrderItem.update(
                    { quantitySold: existingOrderItem.quantitySold + parseInt(record["Quantity Sold"]) },
                    { transaction }
                );
            } else {
                await OrderItem.create(
                    {
                        orderId: order.id,
                        productId: product.id,
                        quantitySold: parseInt(record["Quantity Sold"])
                    },
                    { transaction }
                );
            }
        }
        
        await transaction.commit();
        console.log(`Processed ${batch.length} records successfully.`);
    } catch (error) {
        await transaction.rollback();
        console.error("Error processing batch:", error);
    }
};

const importCsv = async () => {
    const batch = [];
    let recordCount = 0;

    const stream = fs
        .createReadStream(CSV_FILE_PATH)
        .pipe(csvParser())
        .on("data", async (row) => {
            batch.push(row);
            if (batch.length >= BATCH_SIZE) {
                stream.pause();
                await processBatch(batch.splice(0, batch.length));
                stream.resume();
            }
            recordCount++;
        })
        .on("end", async () => {
            if (batch.length > 0) {
                await processBatch(batch);
            }
            console.log(`Import complete: ${recordCount} records processed.`);
        })
        .on("error", (error) => {
            console.error("Error reading CSV file:", error);
        });
};

importCsv();
