import bcrypt from "bcryptjs";

export const instituteNumber = (): string => {
  return `${Math.floor(10000 + Math.random() * 90000)}`;
};

export const generateRandomPassword = async (
  teacherPassword: string,
  teacherName: string,
) => {
  let hashedVersion = await bcrypt.hash(teacherPassword, 12);
  let encriptedVersion = `${hashedVersion}_${teacherName} `;
  let plainVersion = `${teacherPassword}_${teacherName}`;

  const finalPassword = {
    encriptedVersion,
    plainVersion,
  };

  return finalPassword;
};
