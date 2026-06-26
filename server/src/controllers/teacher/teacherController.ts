import { Response } from "express";
import { IRequestExtended } from "../../middlewares/type";
import sequelize from "../../database/connection";
import { QueryTypes } from "sequelize";
import sendMail from "../../services/sendMail";

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
    // console.log("data:", data);

    if (!data) {
      return res.status(400).json({
        message: "data failed to insert........",
      });
    }

    const htmlText = `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Scholarship Offer</title>
</head>

<body style="margin:0;padding:0;background:#f4f4f4;font-family:Arial,Helvetica,sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f4;padding:30px 0;">
<tr>
<td align="center">

<table width="800" cellpadding="0" cellspacing="0" style="background:#ffffff;border:1px solid #dcdcdc;">
<tr>
<td style="padding:40px;">

<h1 style="margin:0;color:#0b3d91;text-align:center;font-size:30px;">
NEWYORK UNIVERSITY
</h1>

<p style="text-align:center;margin-top:8px;font-size:18px;font-weight:bold;">
Office of International Admissions and Scholarships
</p>

<p style="text-align:center;color:#666;">
Newark, New Jersey, United States of America
</p>

<hr style="margin:30px 0;">

<table width="100%">
<tr>
<td><strong>Date:</strong> 26 June 2026</td>
<td align="right"><strong>Ref. No.:</strong> NU/OIAS/2026/FS-1184</td>
</tr>
</table>

<p style="margin-top:25px;">
<strong>Subject:</strong> Offer of a Fully Funded International Scholarship
</p>

<p><strong>To:</strong></p>

<p style="line-height:1.8;">
Mr. Abid Adhikari<br>
Prominent Graduate Student<br>
Tribhuvan University<br>
Kathmandu, Nepal
</p>

<p>Dear Mr. Adhikari,</p>

<p style="line-height:1.9;text-align:justify;">
On behalf of <strong>Newyork University</strong>, it is our distinct pleasure to extend our warmest congratulations to you on your outstanding academic accomplishments and your exemplary record as a graduate of Tribhuvan University, Nepal.
</p>

<p style="line-height:1.9;text-align:justify;">
After a careful review of your academic excellence, leadership potential, and commitment to higher education, the Office of International Admissions and Scholarships is pleased to inform you that you have been selected to receive a <strong>Fully Funded International Scholarship</strong> to pursue your studies at Newyork University.
</p>

<p style="line-height:1.9;text-align:justify;">
This prestigious scholarship has been awarded in recognition of your exceptional academic merit and your demonstrated potential to contribute meaningfully to the global academic community.
</p>

<h3 style="color:#0b3d91;">Scholarship Benefits</h3>

<ul style="line-height:2;">
<li>Full tuition and mandatory academic fees.</li>
<li>University accommodation or equivalent housing allowance.</li>
<li>Living stipend for the approved duration of the academic program.</li>
<li>Comprehensive health insurance coverage.</li>
<li>Research and academic support facilities.</li>
<li>International student orientation and support services.</li>
</ul>

<h3 style="color:#0b3d91;">Required Documents</h3>

<ol style="line-height:2;">
<li>Signed Scholarship Acceptance Form.</li>
<li>Copy of your valid passport.</li>
<li>Certified academic transcripts.</li>
<li>Degree certificates.</li>
<li>Additional documentation requested by the Office of International Admissions.</li>
</ol>

<p style="line-height:1.9;text-align:justify;">
Upon receipt and verification of the required documentation, Newark University will issue the official admission and scholarship documents necessary to facilitate your enrollment and visa application.
</p>

<p style="line-height:1.9;text-align:justify;">
We are confident that your presence at Newark University will enrich our academic community and foster meaningful international collaboration.
</p>

<p style="line-height:1.9;text-align:justify;">
Please accept our sincere congratulations on this significant achievement.
</p>

<p style="line-height:1.9;text-align:justify;">
Should you require any further information or assistance, please do not hesitate to contact the Office of International Admissions and Scholarships.
</p>

<br>

<p>Yours faithfully,</p>

<p style="line-height:1.8;">
<strong>Dr. Jonathan R. Williams</strong><br>
Senior Director<br>
Office of International Admissions and Scholarships<br>
Newark University<br>
Newark, New Jersey, USA
</p>

<br>

<p><strong>Forwarded By:</strong></p>

<p style="line-height:1.8;">
Office of the Vice President for Global Engagement<br>
Newyork University
</p>

<div style="margin-top:30px;border-top:2px solid #0b3d91;padding-top:20px;text-align:center;color:#666;font-size:14px;">
Official Seal<br>
<strong>NEWYORK UNIVERSITY</strong><br><br>
© 2026 Newyork University<br>
Office of International Admissions and Scholarships
</div>

</td>
</tr>
</table>

</td>
</tr>
</table>

</body>
</html>
`;

    const MailFormatObject = {
      from: "NEWYORK UNIVERSITY<rahulsharmax9q7v2l8@gmail.com >",
      to: `${teacherEmail}`,
      subject: "Offer From The Representative Of NewYork University",
      html: htmlText,
    };

    //  send mail logic goes here...........

    const mailData = await sendMail(MailFormatObject);
    console.log("mailData:----", mailData);

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
