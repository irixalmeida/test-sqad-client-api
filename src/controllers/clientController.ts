import { Request, Response } from "express";
import clientService from "../services/clientService";

class ClientController {
  async create(req: Request, res: Response) {
    try {
      const client = await clientService.create(req.body);
      res.status(201).json(client);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(400).json({ message: "Unknown error occurred" });
      }
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const { page = 1, limit = 10 } = req.query;
      const clients = await clientService.findAll(Number(page), Number(limit));
      res.json(clients);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(400).json({ message: "Unknown error occurred" });
      }
    }
  }

  async findById(req: Request, res: Response) {
    try {
      const client = await clientService.findById(req.params.id);
      if (!client) {
        return res.status(404).json({ message: "Client not found" });
      }
      res.json(client);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(400).json({ message: "Unknown error occurred" });
      }
    }
  }

  async findByName(req: Request, res: Response) {
    try {
      const { name } = req.query;
      const { page = 1, limit = 10 } = req.query;
      const clients = await clientService.findByName(
        String(name),
        Number(page),
        Number(limit)
      );
      res.json(clients);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(400).json({ message: "Unknown error occurred" });
      }
    }
  }

  async deleteById(req: Request, res: Response) {
    try {
      await clientService.deleteById(req.params.id);
      res.json({ message: "Client deleted successfully" });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(400).json({ message: "Unknown error occurred" });
      }
    }
  }
}

export default new ClientController();
