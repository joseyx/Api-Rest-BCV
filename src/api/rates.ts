import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const router = Router();

router.get("/current", (_, res) => {
    try {
        prisma.exchange_Rate.findFirst({
            orderBy: { createdAt: "desc" },
        }).then((rate) => {
            if (!rate) {
                return res.status(404).json({ message: "Rate not found" });
            }
            const data = {
                rate: rate.rate,
                createdAt: rate.createdAt.toISOString().split('T')[0],
            }
            res.json(data);
        });
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});

router.get("/history", async (req, res): Promise<any> => {
    try {
        const { start_date, end_date } = req.query;

        // Validar que start y end sean fechas válidas
        const startDate = start_date ? new Date(start_date as string) : null;
        const endDate = end_date ? new Date(end_date as string) : null;

        // Ajustar endDate para incluir todo el día
        if (endDate) {
            endDate.setHours(23, 59, 59, 999);
        }

        if (startDate && isNaN(startDate.getTime())) {
            return res.status(400).json({ message: "Invalid start date" });
        }

        if (endDate && isNaN(endDate.getTime())) {
            return res.status(400).json({ message: "Invalid end date" });
        }

        const where: any = {};
        if (startDate) where.createdAt = { gte: startDate };
        if (endDate) where.createdAt = { ...where.createdAt, lte: endDate };

        const rates = await prisma.exchange_Rate.findMany({
            orderBy: { createdAt: "asc" },
            where,
        });

        if (!rates.length) {
            return res.status(404).json({ message: "Rates not found" });
        }

        const data = rates.map((rate) => ({
            rate: rate.rate,
            createdAt: rate.createdAt.toISOString().split("T")[0],
        }));

        res.json(data);
    } catch (error) {
        console.error("Error fetching rates:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

export default router;