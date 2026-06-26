import { Response } from "express";
import { IRequestExtended } from "../../middlewares/type";
import sequelize from "../../database/connection";
import { QueryTypes } from "sequelize";

class TeacherController {
  static async createTeacher(req: IRequestExtended, res: Response) {
    const {
      teacherName,
      teacherEmail,
      teacherPhoneNumber,
      teacherExpertise,
      teacherJoinedDate,
      teacherSalary,
      teacherAddress,
    } = req.body;

    const teacherPhoto = req.file ? req.file.path : null;

    if (!req.body) {
      return res.status(400).json({
        message: "Request body is missing",
      });
    }

    if (
      !teacherName ||
      !teacherEmail ||
      !teacherPhoneNumber ||
      !teacherExpertise ||
      !teacherJoinedDate ||
      !teacherSalary ||
      !teacherPhoto ||
      !teacherAddress
    ) {
      return res.status(400).json({
        message: "all fields are compulsory.......",
      });
    }

    const data = await sequelize.query(
      `
     INSERT INTO teacher_${req.user?.currentInstituteNumber}(
     teacherName,teacherEmail,teacherPhoneNumber,teacherExpertise,joinedDate,salary,teacherPhoto,teacherAddress
     ) VALUES(?,?,?,?,?,?,?,?)   
        `,
      {
        replacements: [
          teacherName,
          teacherEmail,
          teacherPhoneNumber,
          teacherExpertise,
          teacherJoinedDate,
          teacherSalary,
          teacherPhoto,
          teacherAddress,
        ],
        type: QueryTypes.INSERT,
      },
    );
    console.log("data:", data);

    if (!data) {
      return res.status(400).json({
        message: "data failed to insert........",
      });
    }

    return res.status(200).json({
      message: "teacher created successfully..........",
    });
  }

  static async getTeacher(req: IRequestExtended, res: Response) {
    const institute_id = req.user?.currentInstituteNumber;

    const data = await sequelize.query(
      `
       SELECT * FROM teacher_${institute_id} 
        `,
      {
        type: QueryTypes.SELECT,
      },
    );
    console.log("data:----", data);

    if (data.length === 0) {
      return res.status(400).json({
        message: "teacher's data not found.........",
      });
    }

    return res.status(200).json({
      message: "teachers fetched successfully......",
      data,
      institute_id,
    });
  }

  static async deleteTeacher(req: IRequestExtended, res: Response) {
    const institute_id = req.user?.currentInstituteNumber;

    if (!institute_id) {
      return res.status(400).json({
        message: "institute id not found.........",
        institute_id,
      });
    }

    const { id } = req.params;

    const data = await sequelize.query(
      `
        DELETE  FROM teacher_${institute_id} WHERE id=?
        `,
      {
        // type: QueryTypes.DELETE,
        replacements: [id],
      },
    );

    console.log("data:----", data);

    if (data === undefined) {
      return res.status(400).json({
        message: "datas not found..!#",
      });
    }

    if (data.some((d: any) => d.affectedRows === 0)) {
      return res.status(404).json({
        message: "Teacher not found",
      });
    }

    return res.status(200).json({
      message: "data deleted successfully.......!#$",
      data,
      institute_id,
    });
  }
}

export default TeacherController;