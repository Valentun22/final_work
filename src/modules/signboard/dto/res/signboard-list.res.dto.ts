import { SignboardResDto } from './signboard.res.dto';

export class SignboardListResDto {
  data: SignboardResDto[];
  meta: {
    limit: number;
    offset: number;
    total: number;
  };
}
