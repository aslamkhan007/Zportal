import { store } from "react-notifications-component";

export const CreateNotification = (type, message) => {
  store.addNotification({
    // title: "Wonderful!",
    message: message,
    type: type, //success danger info default warning
    insert: "top",
    container: "top-right",
    animationIn: ["animate__animated", "animate__fadeIn"],
    animationOut: ["animate__animated", "animate__fadeOut"],
    dismiss: {
      duration: 2000,
      pauseOnHover: true,
      onScreen: true,
    },
  });
};
