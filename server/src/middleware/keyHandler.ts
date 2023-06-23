import * as fs from "fs";

export const publicKey: string = fs.readFileSync(
  `/Users/s.abdulqadir/Desktop/DockerPractice/server/src/middleware/publicKey.txt`,
  "utf8"
);
export const privateKey: string = fs.readFileSync(
  "/Users/s.abdulqadir/Desktop/DockerPractice/server/src/middleware/privateKey.txt",
  "utf8"
);
