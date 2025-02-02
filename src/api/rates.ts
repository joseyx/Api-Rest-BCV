import { Router } from "express";
import prisma from "../client";

const router = Router();

router.get("/current", async (_, res): Promise<void> => {
    try {
        const rate = await prisma.exchange_Rate.findFirst({
            orderBy: { createdAt: "desc" },
        });

        if (!rate) {
            res.status(404).json({ message: "Rate not found" });
            return;
        }

        const data = {
            rate: rate.rate,
            date: rate.createdAt.toISOString().split('T')[0],
        };

        res.json(data);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});

router.get("/history", async (req, res): Promise<void> => {
    try {
        const { start_date, end_date } = req.query;

        const startDate = start_date ? new Date(start_date as string) : null;
        const endDate = end_date ? new Date(end_date as string) : null;

        if (endDate) {
            endDate.setHours(23, 59, 59, 999);
        }

        if (startDate && isNaN(startDate.getTime())) {
            res.status(400).json({ message: "Invalid start date" });
            return;
        }

        if (endDate && isNaN(endDate.getTime())) {
            res.status(400).json({ message: "Invalid end date" });
            return;
        }

        const where: any = {};
        if (startDate) where.createdAt = { gte: startDate };
        if (endDate) where.createdAt = { ...where.createdAt, lte: endDate };

        const rates = await prisma.exchange_Rate.findMany({
            orderBy: { createdAt: "asc" },
            where,
        });

        if (!rates.length) {
            res.status(404).json({ message: "Rates not found" });
            return;
        }

        const data = rates.map((rate) => ({
            rate: rate.rate,
            date: rate.createdAt.toISOString().split("T")[0],
        }));

        res.json(data);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});

export default router;