import  aws from 'aws-sdk';

const bucketName = 'istudy'
const dspaces = new aws.Endpoint("sfo3.digitaloceanspaces.com")
const s3 = new aws.S3({
    endpoint: dspaces,
    accessKeyId: '7KAGZFPBE5UFTUTDBLNK',
    secretAccessKey: "Z4BNC3IWMH8T/X8Y25YhTHQGFwxF2G8XSEGp7jUwaXQ"
})

export const uploadImage = async (image) => {
    const key = `${Date.now()}.png`
    const s3Params = {
        Bucket: bucketName,
        Key: key,
        Body: image
    }

    try {
        const uploadURL = await s3.upload(s3Params).promise()
        const s3ParamsImage = {
            Bucket: bucketName,
            Key: key
        }
        const getUrl = await s3.getSignedUrlPromise('getObject', s3ParamsImage)

        return {"status": 200, "url": getUrl, "name": key}
    } catch (e) {
        return {"status": 400, "error": e}
    }
}
