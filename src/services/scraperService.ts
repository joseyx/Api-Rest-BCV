import axios from "axios";
import * as cheerio from "cheerio";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

export const scrapeWebsite = async () => {
    const url = "https://www.bcv.org.ve/";
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    const rate = $("#dolar strong").text().trim().replace(',', '.');

    // set rate in database as float
    await prisma.exchange_Rate.create({
        data: {
            rate: parseFloat(rate),
        },
    });

    console.log("💲 Exchange Rate:", rate);
    return;
};