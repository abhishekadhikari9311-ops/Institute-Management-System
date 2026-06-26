// import { NextFunction, Response } from "express";
// import { IRequestExtended } from "../../middlewares/type";
// import sequelize from "../../database/connection";
// import { QueryTypes } from "sequelize";

// class TeacherController {
//   static async createTeacher(req: IRequestExtended, res: Response) {
//     const {
//       teacherName,
//       teacherEmail,
//       teacherPhoneNumber,
//       teacherExpertise,
//       teacherJoinedDate,
//       teacherSalary,
//     } = req.body;

//     if (!req.body) {
//       return res.status(400).json({
//         message: "Request body is missing",
//       });
//     }

//     if (
//       !teacherName ||
//       !teacherEmail ||
//       !teacherPhoneNumber ||
//       !teacherExpertise ||
//       !teacherJoinedDate ||
//       !teacherSalary
//     ) {
//       return res.status(400).json({
//         message: "all fields are compulsory.......",
//       });
//     }

//     const data = await sequelize.query(
//       `
//      INSERT INTO teacher_${req.user?.currentInstituteNumber}(
//      teacherName,teacherEmail,teacherPhoneNumber,teacherExpertise,joinedDate,salary
//      ) VALUES(?,?,?,?,?,?)   
//         `,
//       {
//         replacements: [
//           teacherName,
//           teacherEmail,
//           teacherPhoneNumber,
//           teacherExpertise,
//           teacherJoinedDate,
//           teacherSalary,
//         ],
//         type: QueryTypes.INSERT,
//       },
//     );
//     console.log("data:", data);

//     if (!data) {
//       return res.status(400).json({
//         message: "data failed to insert........",
//       });
//     }

//     return res.status(200).json({
//       message: "teacher created successfully..........",
//     });
//   }
// }

// export default TeacherController;
