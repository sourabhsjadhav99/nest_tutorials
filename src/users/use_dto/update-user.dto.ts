import { PartialType } from "@nestjs/mapped-types";
import { Create_user_dto } from "./create_user.dto";
export class UpdateUserDto extends PartialType(Create_user_dto) {}
