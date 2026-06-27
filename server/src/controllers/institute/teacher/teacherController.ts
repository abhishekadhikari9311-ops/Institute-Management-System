import { Response } from "express";
import { IRequestExtended } from "../../../middlewares/type";
import sequelize from "../../../database/connection";
import { QueryTypes } from "sequelize";
import sendMail from "../../../services/sendMail";
import { generateRandomPassword } from "../../../services/service";

class TeacherController {
  static async createTeacher(req: IRequestExtended, res: Response) {
    const institute_id = req.user?.currentInstituteNumber;

    const {
      teacherName,
      teacherEmail,
      teacherPhoneNumber,
      teacherExpertise,
      teacherJoinedDate,
      teacherSalary,
      teacherAddress,
      courseId,
      teacherPassword,
    } = req.body;

    const teacherPhoto = req.file ? req.file.path : null;

    if (!req.body) {
      return res.status(400).json({
        message: "Request body is missing",
      });
    }

    const emailExists = await sequelize.query(
      `
SELECT id
FROM teacher_${institute_id}
WHERE teacherEmail=?
LIMIT 1
`,
      {
        type: QueryTypes.SELECT,
        replacements: [teacherEmail],
      },
    );

    if (emailExists.length > 0) {
      return res.status(409).json({
        success: false,
        message: "Teacher email already exists.",
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
      !teacherAddress ||
      !courseId ||
      !teacherPassword
    ) {
      return res.status(400).json({
        message: "all fields are compulsory.......",
      });
    }

    const finalPassword = await generateRandomPassword(
      teacherPassword,
      teacherName,
    );
    console.log("finalPassword:--------", finalPassword);

    await sequelize.query(
      `
     INSERT INTO teacher_${req.user?.currentInstituteNumber}(
     teacherName,teacherEmail,teacherPhoneNumber,teacherExpertise,joinedDate,salary,teacherPhoto,teacherAddress,courseId,teacherPassword
     ) VALUES(?,?,?,?,?,?,?,?,?,?)   
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
          courseId,
          finalPassword.encriptedVersion,
        ],
        type: QueryTypes.INSERT,
      },
    );

    const teacherData: { id: string }[] = await sequelize.query(
      `
    SELECT id FROM teacher_${institute_id} WHERE teacherEmail=?
    `,
      {
        type: QueryTypes.SELECT,
        replacements: [teacherEmail],
      },
    );

    console.log("teacherData:----", teacherData);

    await sequelize.query(
      `
      UPDATE course_${institute_id} SET teacherId=? WHERE id=?;
      `,
      {
        type: QueryTypes.UPDATE,
        replacements: [teacherData[0].id, req.user?.id],
      },
    );

    //  email patthaune tarikaa..........

    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>University Invitation Letter</title>

<style>
*{
    margin:0;
    padding:0;
    box-sizing:border-box;
}

body{
    background:#eef2f7;
    font-family:Georgia,"Times New Roman",serif;
    color:#333;
    padding:40px;
}

.letter{
    max-width:900px;
    margin:auto;
    background:#fff;
    border:1px solid #d7d7d7;
    border-radius:8px;
    box-shadow:0 12px 35px rgba(0,0,0,.12);
    overflow:hidden;
}

.header{
    background:linear-gradient(135deg,#2f5aa8,#4a74c5);
    color:#fff;
    text-align:center;
    padding:40px 50px;
}

.logo{
    width:90px;
    height:90px;
    border:3px solid #fff;
    border-radius:50%;
    margin:0 auto 18px;
    display:flex;
    align-items:center;
    justify-content:center;
    font-size:34px;
    font-weight:bold;
    background:rgba(255,255,255,.12);
}

.header h1{
    font-size:34px;
    letter-spacing:1px;
    margin-bottom:10px;
}

.header h3{
    font-size:18px;
    font-weight:normal;
}

.header p{
    margin-top:8px;
    opacity:.95;
}

.content{
    padding:55px;
}

.date{
    text-align:right;
    margin-bottom:30px;
}

.title{
    text-align:center;
    color:#2f5aa8;
    margin-bottom:35px;
    font-size:30px;
    border-bottom:2px solid #2f5aa8;
    padding-bottom:12px;
}

.to{
    margin-bottom:25px;
    line-height:1.8;
}

p{
    margin-bottom:22px;
    text-align:justify;
    line-height:1.9;
    font-size:17px;
}

h3{
    color:#2f5aa8;
    margin:35px 0 18px;
}

table{
    width:100%;
    border-collapse:collapse;
    margin:20px 0 35px;
}

th{
    background:#2f5aa8;
    color:#fff;
}

th,
td{
    border:1px solid #d8d8d8;
    padding:14px;
    text-align:left;
}

tr:nth-child(even){
    background:#f8f9fc;
}

.signature{
    margin-top:55px;
}

.signature strong{
    font-size:18px;
}

.footer{
    margin-top:50px;
    border-top:1px solid #ddd;
    padding-top:20px;
    text-align:center;
    color:#666;
    font-size:14px;
    line-height:1.8;
}

@media print{

body{
background:#fff;
padding:0;
}

.letter{
box-shadow:none;
border:none;
}

}
</style>

</head>

<body>

<div class="letter">

<div class="header">

<div class="logo">

</div>

<h1>NEW YORK UNIVERSITY ----   OFFER LETTER
------ BY THE PRIOR REFERRAL OF ONE OF YOUR ELDER COUSIN BROTHER MR. BINSAN KHADKA
</h1>

<h3>Office of Academic Affairs</h3>

<p>123 University Avenue • Education City • Country</p>

</div>

<div class="content">

<div class="date">
<strong>Date:</strong> ______________________
</div>

<h2 class="title">
Invitation to Join the Faculty
</h2>

<div class="to">
<strong>To:</strong><br><br>

Recipient Name<br>
Recipient Address<br>
Country
</div>

<p>
Dear Sir/Madam,
</p>

<p>
The Office of Academic Affairs is pleased to invite you to explore an opportunity to join our academic community as an Instructor or Lecturer in the field of Information Technology. This invitation is subject to the institution's standard recruitment procedures, credential verification, and applicable employment requirements.
</p>

<p>
Your professional background has been recommended through a trusted professional referral. Based on the information available to us and our preliminary review, we believe your experience and commitment to academic excellence align well with the University's educational mission.
</p>

<p>
We believe your knowledge, teaching experience, and dedication to student success would make a valuable contribution to our faculty and the wider academic community. We would be delighted to discuss this opportunity with you.
</p>

<h3>Proposed Position</h3>

<table>

<tr>
<th>Category</th>
<th>Details</th>
</tr>

<tr>
<td><strong>Position</strong></td>
<td>Information Technology Instructor / Lecturer</td>
</tr>

<tr>
<td><strong>Department</strong></td>
<td>School of Computing & Information Technology</td>
</tr>

<tr>
<td><strong>Employment Type</strong></td>
<td>Subject to University Recruitment Process</td>
</tr>

<tr>
<td><strong>Campus</strong></td>
<td>Main Campus</td>
</tr>

</table>

<p>
Should you wish to proceed, kindly respond at your earliest convenience. Upon receiving your confirmation, our Academic Affairs and Human Resources departments will provide further information regarding interviews, documentation, and the remaining recruitment process.
</p>

<p>
We sincerely appreciate your interest and look forward to the possibility of welcoming you to our academic community.
</p>

<div class="signature">

<p>Yours faithfully,</p>

<br><br>

<strong>Office of Academic Affairs</strong><br>

Generic University

</div>

<div class="footer">

This invitation is provided solely for participation in the University's recruitment process. It is not an employment contract and does not guarantee appointment. Any appointment is subject to successful completion of all institutional hiring procedures and verification requirements.

</div>

</div>

</div>

</body>
</html>



    `;

    const mailFormatObject = {
      from: "NEW YORK UNIVERSITY<rahulsharmax9q7v2l8@gmail.com >",
      to: `${teacherEmail}`,
      subject: `Welcome To Our Institute Guy...mr...${teacherName}! your current password is ${finalPassword.plainVersion}`,
      // text: "please login in wth the given details....",
      htmltext: html,
    };

    const mail = await sendMail(mailFormatObject);

    console.log(mail, "mail sent successfully:-----------");

    return res.status(200).json({
      message: "teacher created successfully..........",

      institute_id,
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
