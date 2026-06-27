import { QueryTypes } from "sequelize";
import sequelize from "../../../database/connection";
import { IRequestExtended } from "../../../middlewares/type";
import { Response } from "express";

class CategoryController {
  static async createCategory(req: IRequestExtended, res: Response) {
    const institute_id = req.user?.currentInstituteNumber;

    const { courseName, courseDescription } = req.body;

    if (!courseName || !courseDescription) {
      return res.status(400).json({
        message: "please fill up the details............",
      });
    }

    const data = await sequelize.query(
      `INSERT INTO category_${institute_id}(categoryName,categoryDescription) 
    VALUES(?,?)
    `,
      {
        replacements: [courseName, courseDescription],
      },
    );

    console.log("data:", data);

    return res.status(200).json({
      message: "category created successfully.........",
      data,
      institute_id,
    });
  }

  static async getCategories(req: IRequestExtended, res: Response) {
    const institute_id = req.user?.currentInstituteNumber;

    const data = await sequelize.query(
      `
    SELECT * FROM category_${institute_id}
    `,
      {
        type: QueryTypes.SELECT,
      },
    );

    return res.status(200).json({
      message: "data fetched successfully.........",
      institute_id,
      data,
    });
  }

  static async deleteCategory(req: IRequestExtended, res: Response) {
    try {
      const institute_id = req.user?.currentInstituteNumber;

      const { id } = req.params;

      console.log("params:", req.params);
      console.log("id:", id);
      console.log("user id:", req.user?.id);

      const data = await sequelize.query(
        `
DELETE FROM category_${institute_id}
WHERE id=?
`,
        {
          replacements: [id],
        },
      );

      console.log("data:", data);

      return res.status(200).json({
        message: "data deleted successfully.........",
        data,
      });
    } catch (err) {
      console.log("err:", err);
      return res.status(500).json({
        message: "error handling issue",
      });
    }
  }
}

export default CategoryController;
