import { toaster } from "./toaster";

  export const menssage = (title: string, msg: string, infRes: string) => {
    const type = infRes;
    toaster.create({
      title: title,
      description: msg,
      type: type,
    });
  };