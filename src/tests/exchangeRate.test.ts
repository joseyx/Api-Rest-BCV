// tests/exchangeEndpoints.test.js
import request from "supertest";
import express from "express";
import router from "../api/rates";
import prisma from "../client";


jest.mock('../client', () => ({
  __esModule: true,
  default: {
    exchange_Rate: {
      findFirst: jest.fn(),
      findMany: jest.fn(),
    },
  },
}));

const app = express();
app.use(express.json());
app.use(router);

describe("GET /current", () => {
  it("debe devolver el rate actual cuando existe", async () => {
    const mockRate = { rate: 100, createdAt: new Date("2025-02-01") };
    (prisma.exchange_Rate.findFirst as jest.Mock).mockResolvedValue(mockRate);

    const response = await request(app).get("/current");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      rate: mockRate.rate,
      date: "2025-02-01",
    });
  });

  it("debe devolver 404 si no se encuentra un rate", async () => {
    (prisma.exchange_Rate.findFirst as jest.Mock).mockResolvedValue(null);

    const response = await request(app).get("/current");

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ message: "Rate not found" });
  });

  it("debe devolver 500 en caso de error", async () => {
    (prisma.exchange_Rate.findFirst as jest.Mock).mockResolvedValue(new Error("Error de prueba"));

    const response = await request(app).get("/current");

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ message: "Internal server error" });
  });
});

describe("GET /history", () => {
  it("debe devolver todos los rates si no se especifican fechas", async () => {
    const mockRates = [
      { rate: 100, createdAt: new Date("2025-01-01") },
      { rate: 105, createdAt: new Date("2025-01-02") },
    ];
    (prisma.exchange_Rate.findMany as jest.Mock).mockResolvedValue(mockRates);

    const response = await request(app).get("/history");

    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      { rate: 100, date: "2025-01-01" },
      { rate: 105, date: "2025-01-02" },
    ]);
  });

  it("debe devolver el historial de rates dentro del rango de fechas", async () => {
    const mockRates = [
      { rate: 100, createdAt: new Date("2025-01-01") },
      { rate: 105, createdAt: new Date("2025-01-02") },
    ];
    (prisma.exchange_Rate.findMany as jest.Mock).mockResolvedValue(mockRates);

    const response = await request(app).get(
      "/history?start_date=2025-01-01&end_date=2025-01-02"
    );

    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      { rate: 100, date: "2025-01-01" },
      { rate: 105, date: "2025-01-02" },
    ]);
  });

  it("debe devolver 400 cuando la fecha de inicio no es válida", async () => {
    const response = await request(app).get(
      "/history?start_date=fecha-no-valida&end_date=2025-01-02"
    );

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ message: "Invalid start date" });
  });

  it("debe devolver 400 cuando la fecha de fin no es válida", async () => {
    const response = await request(app).get(
      "/history?start_date=2025-01-01&end_date=fecha-no-valida"
    );

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ message: "Invalid end date" });
  });

  it("debe devolver 404 cuando no se encuentran rates", async () => {
    (prisma.exchange_Rate.findMany as jest.Mock).mockResolvedValue([]);

    const response = await request(app).get(
      "/history?start_date=2025-01-01&end_date=2025-01-02"
    );

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ message: "Rates not found" });
  });

  it("debe devolver 500 en caso de error", async () => {
    (prisma.exchange_Rate.findMany as jest.Mock).mockRejectedValue(new Error("Error de prueba"));

    const response = await request(app).get(
      "/history?start_date=2025-01-01&end_date=2025-01-02"
    );

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ message: "Internal server error" });
  });
});
