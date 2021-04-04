"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const nodejs_shared_1 = require("nodejs-shared");
/**
 * AWS Rekognition Client.
 */
class default_1 {
    /**
     * Create a Rekognition client instance.
     */
    constructor() {
        this.client = new aws_sdk_1.default.Rekognition({
            region: process.env.AWS_REKOGNITION_REGION,
            accessKeyId: process.env.AWS_REKOGNITION_ACCESS_KEY,
            secretAccessKey: process.env.AWS_REKOGNITION_SECRET_KEY
        });
    }
    /**
     * Detect face.
     *
     * @example
     * import RekognitionClient from '~/shared/RekognitionClient';
     * import fs from 'fs';
     *
     * const client = new RekognitionClient();
     * await client.detectFaces('/upload/image.png');
     * await client.detectFaces('data:image/png;base64,/9j/4AAQ...');
     * await client.detectFaces(fs.readFileSync('/upload/image.png'));
     *
     * @param  {string} img Image file path, base 64 character string, or BLOB
     * @param  {number} threshold
     * @return {Promise<AWS.Rekognition.BoundingBox[]>}
     */
    async detectFaces(img, threshold = 90) {
        if (/^data:image\//.test(img))
            img = this.base64ToBlob(img);
        else if (nodejs_shared_1.File.isFile(img))
            img = fs_1.default.readFileSync(img).toString();
        const data = await new Promise((resolve, reject) => this.client.detectFaces({
            Image: { Bytes: img },
            Attributes: ['ALL']
        }, (error, data) => error ? reject(error) : resolve(data)));
        if (!data.FaceDetails)
            return [];
        const boundingBoxes = [];
        for (let faceDetail of data.FaceDetails)
            if (faceDetail.BoundingBox && faceDetail.Confidence && faceDetail.Confidence >= threshold)
                boundingBoxes.push(faceDetail.BoundingBox);
        return boundingBoxes;
    }
    /**
     * Compare faces.
     *
     * @example
     * import RekognitionClient from '~/shared/RekognitionClient';
     * import fs from 'fs';
     *
     * const client = new RekognitionClient();
     * await client.compareFaces('/upload/image1.png', '/upload/image2.png');
     * await client.compareFaces('data:image/png;base64,/9j/4AAQ...'. 'data:image/png;base64,/9j/4AAQ...');
     * await client.compareFaces(fs.readFileSync('/upload/image1.png'), fs.readFileSync('/upload/image1.png'));
     *
     * @param  {string} img1 Image file path, base 64 character string, or BLOB
     * @param  {string} img2 Image file path, base 64 character string, or BLOB
     * @return {Promise<number>}
     */
    async compareFaces(img1, img2) {
        if (/^data:image\//.test(img1))
            img1 = this.base64ToBlob(img1);
        else if (nodejs_shared_1.File.isFile(img1))
            img1 = fs_1.default.readFileSync(img1).toString();
        if (/^data:image\//.test(img2))
            img2 = this.base64ToBlob(img2);
        else if (nodejs_shared_1.File.isFile(img2))
            img2 = fs_1.default.readFileSync(img2).toString();
        const data = await new Promise((resolve, reject) => this.client.compareFaces({
            SourceImage: { Bytes: img1 },
            TargetImage: { Bytes: img2 },
            SimilarityThreshold: 0
        }, (error, data) => error ? reject(error) : resolve(data)));
        let similarity = .0;
        if (data.FaceMatches && data.FaceMatches.length > 0 && data.FaceMatches[0].Similarity)
            similarity = Math.round(data.FaceMatches[0].Similarity * 10) / 10;
        return similarity;
    }
    /**
     * Add a collection.
     */
    async addCollection(collectionId) {
        const data = await new Promise((resolve, reject) => this.client.createCollection({ CollectionId: collectionId }, (error, data) => error ? reject(error) : resolve(data)));
        if (data.StatusCode !== 200)
            throw new Error('Collection could not be created');
        return collectionId;
    }
    /**
     * Returns a list of collections.
     */
    async getCollections() {
        const data = await new Promise((resolve, reject) => this.client.listCollections({}, (error, data) => error ? reject(error) : resolve(data)));
        if (!data.CollectionIds || !data.CollectionIds.length)
            return [];
        return data.CollectionIds;
    }
    /**
     * Delete collection.
     */
    async deleteCollection(collectionId) {
        const data = await new Promise((resolve, reject) => this.client.deleteCollection({ CollectionId: collectionId }, (error, data) => error ? reject(error) : resolve(data)));
        if (data.StatusCode !== 200)
            throw new Error('Collection could not be delete');
    }
    /**
     * Converts a base64 string to a Blob string and returns it.
     */
    base64ToBlob(base64) {
        const tmpPath = nodejs_shared_1.File.getTmpPath('.png');
        nodejs_shared_1.Media.writeBase64Image(tmpPath, base64);
        return fs_1.default.readFileSync(tmpPath).toString();
    }
}
exports.default = default_1;
