import { Request, Response } from "express";
import sequelize from "../../database/connection";
import { QueryTypes } from "sequelize";
import bcrypt from "bcryptjs";
import { generateJwtToken } from "../../services/service";

interface ITeacherData {
  teacherEmail: string;
  teacherInstitute_id: number;
  teacherPassword: string;
  id: string;
}

class TeacherController {
  static async teacherLogin(req: Request, res: Response) {
    try {
      const { teacherEmail, teacherPassword, teacherInstitute_id } = req.body;

      if (!teacherEmail || !teacherPassword || !teacherInstitute_id) {
        return res.status(400).json({
          message: "all fields are required.........!",
        });
      }

      const instituteId = Number(teacherInstitute_id);

      if (isNaN(instituteId)) {
        return res.status(400).json({
          message: "Invalid institute id.",
        });
      }

      const teacherData: ITeacherData[] = await sequelize.query(
        `SELECT * FROM teacher_${instituteId}
       WHERE teacherEmail = ?`,
        {
          type: QueryTypes.SELECT,
          replacements: [teacherEmail],
        },
      );

      console.log(teacherData, "teacherData---->");

      if (teacherData.length === 0) {
        return res.status(400).json({
          message: "invalid credintials..........!",
        });
      }

      // check password now

      const isPasswordMatch = bcrypt.compare(
        teacherPassword,
        teacherData[0].teacherPassword,
      );

      if (!isPasswordMatch) {
        return res.status(400).json({
          message: "teacher password didn't matched properly",
        });
      }

      // generating jwt token

      const jwtToken = await generateJwtToken(teacherData[0].id);

      console.log("jwt token--->", jwtToken);

      return res.status(200).json({
        message: "teacher logged in successfully...........",
      });
    } catch (err) {
      return res.status(500).json({
        message: "teacher logged in failed.....!",
      });
    }
  }
}

export default TeacherController;
