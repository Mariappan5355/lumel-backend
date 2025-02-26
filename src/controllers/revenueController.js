const { Order, Product, OrderItem, Region, sequelize } = require("../../models");
const { Op } = require("sequelize");
const { spawn } = require("child_process");



exports.refreshData = async (req, res) => {
    try {

        const process = spawn("node", ["./scripts/importCsv.js"], {
            detached: true,
            stdio: "ignore",
            });
        
            process.unref();
        res.json({ message: "Data refresh triggered successfully." });
    } catch (error) {
        res.status(500).json({ error: "Failed to refresh data." });
    }
};

exports.getTotalRevenue = async (req, res) => {
    try {
        const { startDate, endDate, groupBy } = req.query;

        if (!startDate || !endDate) {
            return res.status(400).json({ message: "Start and end dates are required." });
        }

        let groupClause = [];
        let attributes = [[sequelize.literal("SUM(OrderItem.quantitySold * Product.unitPrice)"), "totalRevenue"]];

        switch (groupBy) {
            case "product":
                groupClause = ["Product.id"];
                attributes.push([sequelize.col("Product.name"), "productName"]);
                break;
            case "category":
                groupClause = ["Product.category"];
                attributes.push([sequelize.col("Product.category"), "category"]);
                break;
            case "region":
                groupClause = ["Region.id"];
                attributes.push([sequelize.col("Region.name"), "region"]);
                break;
            default:
                break;
        }

        const revenueData = await OrderItem.findAll({
            attributes,
            include: [
                {
                    model: Product,
                    attributes: [],
                },
                {
                    model: Order,
                    attributes: [],
                    include: [{ model: Region, attributes: [] }],
                }
            ],
            where: {
                createdAt: {
                    [Op.between]: [startDate, endDate]
                }
            },
            group: groupClause.length ? groupClause : undefined,
            raw: true,
        });

        res.json(revenueData);
    } catch (error) {
        console.error("Error fetching revenue:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};



