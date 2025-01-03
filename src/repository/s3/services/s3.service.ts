import * as path from 'node:path';

import {
  DeleteObjectCommand,
  ObjectCannedACL,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { Injectable, NotFoundException } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { v4 } from 'uuid';
import getConfigs from '../../../configs/configuration';
import { s3ClientMinio } from '../configs/minio-config';
import {VenuesRepository} from "../../services/venues.repository";
dotenv.config({ path: './environments/local.env' });

const s3Config = getConfigs().s3;

@Injectable()
export class S3Service {
  private readonly client: S3Client;
  constructor(private readonly venuesRepository: VenuesRepository) {
    this.client = s3ClientMinio;
  }

  async uploadVenuePhoto(
    file: Express.Multer.File,
    venueId: string,
  ): Promise<string> {
    const venue = await this.venuesRepository.findByIdOrThrow(venueId);

    if (venue.image) {
      await this.deleteFileFromS3(venue.image);
    }

    const filePath = this.buildPath(file.originalname, venueId);
    await this.client.send(
      new PutObjectCommand({
        Bucket: s3Config.bucketName,
        Key: filePath,
        Body: file.buffer,
        ContentType: file.mimetype,
        ACL: s3Config.objectAcl as ObjectCannedACL,
        ContentLength: file.size,
      }),
    );
    await this.venuesRepository.save(venue);
    return filePath;
  }

  async deleteFileFromS3(filePath: string): Promise<void> {
    try {
      await this.client.send(
        new DeleteObjectCommand({
          Bucket: s3Config.bucketName,
          Key: filePath,
        }),
      );
    } catch (error) {
      throw new NotFoundException(`Delete file from S3: ${error}`);
    }
  }

  private buildPath(fileName: string, venueId: string): string {
    return `venues/${venueId}/${v4()}${path.extname(fileName)}`;
  }
}
