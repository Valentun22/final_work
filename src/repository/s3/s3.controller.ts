import {
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { S3Service } from './services/s3.service';
import { imageFileFilter } from './utils/file-upload.utils';
import { photoConfig } from './utils/photo.config';
import { ApiOperation, ApiTags } from "@nestjs/swagger";

@ApiTags('s3 - work with images')
@Controller('s3')
export class S3Controller {
  constructor(private readonly s3Service: S3Service) {}

  @ApiOperation({ summary: 'Upload photo' })
  @Post('/:venueId/photo')
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(
    FileInterceptor('image', {
      fileFilter: imageFileFilter,
      limits: {
        fileSize: photoConfig.MAX_SIZE,
      },
    }),
  )
  async uploadVenuePhoto(
    @UploadedFile() file: Express.Multer.File,
    @Param('venueId', ParseUUIDPipe) venueId: string,
  ) {
    console.log(venueId);
    const urlPhoto = await this.s3Service.uploadVenuePhoto(file, venueId);
    return { urlPhoto };
  }

  @ApiOperation({ summary: 'Delete photo' })
  @Delete('/venueId/photo')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteVenuePhoto(@Param(':venueId') venueId: string) {
    await this.s3Service.deleteFileFromS3(venueId);
  }
}

