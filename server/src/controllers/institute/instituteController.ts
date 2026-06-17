import { Request, Response } from "express";
import sequelize from "../../database/connection";
import { instituteNumber } from "../../services/service";

class InstituteController {
  static async createInstitute(req: Request, res: Response) {
    const {
      instituteName,
      instituteEmail,
      institutePhoneNumber,
      instituteAddress,
    } = req.body;

    const { instituteVatNumber, institutePanNumber } = req.body || null;

    if (
      !instituteName ||
      !instituteEmail ||
      !institutePhoneNumber ||
      !instituteAddress
    ) {
      return res.status(400).json({
        message:
          "please provide instituteName,instituteEmail,institutePhoneNumber,instituteAddress........... ",
      });
    }

    if (!institutePanNumber && !instituteVatNumber) {
      return res.status(400).json({
        message: "Please provide either PAN Number or VAT Number",
      });
    }

    if (institutePanNumber && instituteVatNumber) {
      return res.status(400).json({
        message: "Provide either PAN Number or VAT Number, not both",
      });
    }

    const institute_id = instituteNumber();

    await sequelize.query(`CREATE TABLE IF NOT EXISTS institute_${institute_id}(
      id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
      instituteName VARCHAR(255) NOT NULL,
      instituteEmail VARCHAR(255) NOT NULL UNIQUE,
      institutePhoneNumber VARCHAR(255) NOT NULL UNIQUE,
      instituteAddress VARCHAR(255) NOT NULL,
      institutePanNumber VARCHAR(255),
      instituteVatNumber VARCHAR(255),
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE
      CURRENT_TIMESTAMP  
      ) `);

    await sequelize.query(
      `
        INSERT INTO institute_${institute_id}(instituteName,instituteEmail,institutePhoneNumber,instituteAddress,
        institutePanNumber,instituteVatNumber
        ) VALUES(?,?,?,?,?,?)`,
      {
        replacements: [
          instituteName,
          instituteEmail,
          institutePhoneNumber,
          instituteAddress,
          institutePanNumber || null,
          instituteVatNumber || null,
        ],
      },
    );

    await sequelize.query(
      `
      CREATE TABLE teacher_${institute_id}(
      id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
      teacherName VARCHAR(255) NOT NULL,
      teacherEmail VARCHAR(255) NOT NULL,
      teacherPhoneNumber VARCHAR(255) NOT NULL,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE
      CURRENT_TIMESTAMP  
      )
      `,
    );

    return res.status(200).json({
      message: "institute created successfully...",
    });
  }
}

export default InstituteController;
