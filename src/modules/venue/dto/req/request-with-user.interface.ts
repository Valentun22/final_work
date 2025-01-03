import { Request } from 'express';
import {IUserData} from "../../../auth/interfaces/user-data.interface";

interface RequestWithUser extends Request {
    user: IUserData;
}

export default RequestWithUser;
