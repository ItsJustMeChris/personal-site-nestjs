export default () => ({
  s3: {
    accessKey: process.env.S3ACCESSKEY,
    secret: process.env.S3SECRET,
    endpoint: process.env.S3ENDPOINT,
    bucket: process.env.S3BUCKET,
  },
});
