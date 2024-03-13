export const isAuth = () => {
  const token = localStorage.getItem("betblack-admin-token");
  return token ? true : false;
};
