module.exports = {
  apps: [
    {
      name: "JCWD-0210-02", // Format JCWD-{batchcode}-{groupnumber}
      script: "./apps/api/dist/index.js",
      env: {
        NODE_ENV: "production",
        PORT: 2102,
      },
      time: true,
    },
  ],
};
