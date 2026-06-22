import { NextFunction, Response } from "express";
import sequelize from "../../database/connection";
import { instituteNumber } from "../../services/service";
import { IRequestExtended } from "../../middlewares/type";
import User from "../../database/models/user.model";

class InstituteController {
  static async createInstitute(
    req: IRequestExtended,
    res: Response,
    next: NextFunction,
  ) {
    try {
      console.log(req.user, "name in req.user:");

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

      const institute_id: string = instituteNumber();

      await sequelize.query(`CREATE TABLE IF NOT EXISTS institute_${institute_id}(
      id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
      instituteName VARCHAR(255) NOT NULL,
      instituteEmail VARCHAR(255) NOT NULL UNIQUE,
      institutePhoneNumber VARCHAR(255) NOT NULL UNIQUE,
      instituteAddress VARCHAR(255) NOT NULL,
      institutePanNumber VARCHAR(255),
      instituteVatNumber VARCHAR(255),
      createdat TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
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

      await sequelize.query(`
CREATE TABLE IF NOT EXISTS user_institute(
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  userId VARCHAR(36),
  institute_id VARCHAR(255) UNIQUE
)
`);

      if (req.user) {
        await sequelize.query(
          `
        INSERT INTO user_institute(userId,institute_id) values(?,?)`,
          {
            replacements: [req.user.id, institute_id],
          },
        );
      }

      if (req.user) {
        await User.update(
          {
            currentInstituteNumber: institute_id,
            role: "institute",
          },
          {
            where: {
              id: req.user.id,
            },
          },
        );
      }

      if (req.user) {
        req.user.institute_id = institute_id;
      }

      next();
    } catch (err) {
      console.log("err:", err);
      res.status(400).json({
        message: "cannot create the institute",
      });
    }
  }

  static async createTeacher(
    req: IRequestExtended,
    res: Response,
    next: NextFunction,
  ) {
    try {
      await sequelize.query(
        `
        CREATE TABLE teacher_${req.user?.institute_id}(
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
    } catch (err) {
      res.status(200).json({
        message: "failed for logic..........",
      });
    }
    next();
  }

  static async createStudent(req: IRequestExtended, res: Response) {
    await sequelize.query(
      `
   CREATE TABLE student_${req.user?.institute_id}(
   id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
   studentName VARCHAR(255) NOT NULL,
   studentEmail VARCHAR(255) NOT NULL,
   studentPhoneNumber VARCHAR(255) NOT NULL,
   createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE
        CURRENT_TIMESTAMP
   )
   `,
    );

    res.status(200).json({
      message: "student created successfully...........",
    });
  }
}

export default InstituteController;
