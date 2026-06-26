import { QueryTypes } from "sequelize";
import sequelize from "../../../database/connection";
import { IRequestExtended } from "../../../middlewares/type";
import { Response } from "express";

class CourseController {
  // add course

  static async createCourse(req: IRequestExtended, res: Response) {
    const institute_id = req.user?.currentInstituteNumber;

    const { categoryId } = req.params;

    const { teacherId } = req.params;

    const courseThumbnail = req.file ? req.file.path : null;
    console.log("coursethumbnail:-", courseThumbnail);

    console.log(req.file, "FILE");

    const {
      courseName,
      coursePrice,
      courseDescription,
      courseDuration,
      courseLevel,
    } = req.body;

    if (
      !courseName ||
      !coursePrice ||
      !courseDescription ||
      !courseDuration ||
      !courseLevel ||
      !courseThumbnail ||
      !categoryId ||
      !teacherId
    ) {
      return res.status(400).json({
        message: "all fields are mandatory!",
      });
    }

    //  adding course content  ----->>>

    console.log(req.user, "req.user :");
    console.log(institute_id);

    if (req.user) {
      const courseData = await sequelize.query(
        `
        INSERT INTO course_${institute_id}(courseName,coursePrice,courseDescription,courseDuration,courseLevel,courseThumbnail,categoryId,teacherId) VALUES(?,?,?,?,?,?,?,?)`,

        {
          replacements: [
            courseName,
            coursePrice,
            courseDescription,
            courseDuration,
            courseLevel,
            courseThumbnail,
            categoryId,
            teacherId,
          ],
          type: QueryTypes.INSERT,
        },
      );

      console.log("courseData:", courseData);
    }

    return res.status(200).json({
      message: "course created successfully...#!",
      institute_id,
    });
  }

  static async getAllCourse(req: IRequestExtended, res: Response) {
    const institute_id = req.user?.currentInstituteNumber;

    const data = await sequelize.query(
      `
  SELECT * FROM course_${institute_id} JOIN category_${institute_id} ON course_${institute_id}.categoryId
  = category_${institute_id}.id
`,
      {
        type: QueryTypes.SELECT,
      },
    );

    console.log("data:", data);

    return res.status(200).json({
      message: "courses fetched successfully .........",
      institute_id,
      data,
    });
  }

  static async getSingleCourse(req: IRequestExtended, res: Response) {
    const institute_id = req.user?.currentInstituteNumber;

    // const { id } = req.params;

    const data = await sequelize.query(
      `
SELECT * FROM course_${institute_id} JOIN category_${institute_id} ON course_${institute_id}.categoryId=
category_${institute_id}.id    
      `,
      {
        type: QueryTypes.SELECT,
      },
    );

    console.log("data:----", data);

    if (data) {
      return res.status(200).json({
        message: "single course fetched successfully...........",
        data,
      });
    } else {
      return res.status(400).json({
        message: "failed single fetching logic,,,,,,,,,,,,",
      });
    }
  }

  static async deleteCourse(req: IRequestExtended, res: Response) {
    const { id } = req.params;

    const institute_id = req.user?.currentInstituteNumber;

    console.log(req.user);
    console.log(institute_id);

    const data = await sequelize.query(
      `
  DELETE FROM course_${institute_id} WHERE id=? 
  `,
      {
        replacements: [id],

        type: QueryTypes.DELETE,
      },
    );
    return res.status(200).json({
      message: "deleted course successfully",
      data,
    });
  }
}

export default CourseController;
