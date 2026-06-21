import { Table, Column, Model, DataType } from "sequelize-typescript";
// import { UserRole } from "../../middleware/type";

@Table({
  tableName: "users",
  modelName: "User",
  timestamps: true,
})
class User extends Model {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  declare id: string;
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare userName: string;
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  declare userEmail: string;
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare password: string;
  @Column({
    type: DataType.ENUM("teacher", "institute", "super-admin", "student"),
    defaultValue: "student",
  })
  declare role: string;

  @Column({
    type: DataType.STRING,
  })
  declare currentInstituteNumber: string | null;
}
export default User;
