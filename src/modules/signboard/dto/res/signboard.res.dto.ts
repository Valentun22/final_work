import {UserEntity} from "../../../user/entity/user.entity";
import {NewsEntity} from "../../../news/entity/news.entity";
import {ReviewEntity} from "../../../review/entities/review.entity";
import {FavoriteEntity} from "../../../favorite/entities/favorite.entity";

export class SignboardResDto {
  signboard_id: string;
  title: string;
  description: string;
  body: string;
  userId: string;
  venue: {
    venueId: string;
    name: string;
    location: string;
    averageCheck: number;
    workingHours: string;
    contactInfo: string;
    tags: string[];
    image: string;
    owner: UserEntity;
    reviews: ReviewEntity[];
    news: NewsEntity[];
    favorites: FavoriteEntity[];
  };
}

