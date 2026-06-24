import multer from "multer";

import { IRequestExtended } from "./type";

//locally store garnu  paryo hae

const storage = multer.diskStorage({
  //  location kaha haalnu paryo tyo file

  destination: function (
    req: IRequestExtended,
    file: Express.Multer.File,
    cb: any,
  ) {
    //  location incoming file kata rakhne vanne ho........

    //  cb(error,success)

    cb(null, "./src/storage");
  },

  //  file name kunn haalne ho.............

  filename: function (
    req: IRequestExtended,
    file: Express.Multer.File,
    cb: any,
  ) {
    cb(null, Date.now() + "---" + file.originalname);
  },
});

const upload = multer({
  storage,
});

export default upload;
