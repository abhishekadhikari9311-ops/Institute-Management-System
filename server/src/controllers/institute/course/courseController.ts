import sequelize from "../../../database/connection";
import { IRequestExtended } from "../../../middlewares/type";
import { Response } from "express";

class CourseController {
  // add course

  static async createCourse(req: IRequestExtended, res: Response) {
    const institute_id = req.user?.currentInstituteNumber;

    console.log(req.file, "FILE");

    const courseThumbnail = req.file ? req.file.filename : null;
    console.log("coursethumbnail:-", courseThumbnail);

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
      !courseThumbnail
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
        INSERT INTO course_${institute_id}(courseName,coursePrice,courseDescription,courseDuration,courseLevel,courseThumbnail) VALUES(?,?,?,?,?,?)`,
        {
          replacements: [
            courseName,
            coursePrice,
            courseDescription,
            courseDuration,
            courseLevel,
            courseThumbnail
          ],
        },
      );

      console.log("courseData:", courseData);
    }

    return res.status(200).json({
      message: "course created successfully...#!",
    });
  }
}

export default CourseController;