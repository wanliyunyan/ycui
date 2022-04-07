module.exports = ({ env }) => {
  const array = [];

  if (env === "production") {
    array.push(
      require("cssnano")({
        preset: "default",
      })
    );
    array.push(require("autoprefixer"));
  }
  return {
    plugins: array,
  };
};
