import { IsNumber, IsString } from "class-validator";
;

export class addROleDto {
    @IsString({message: "Entered type must be string"})
    readonly value : string;
    @IsNumber({},{message: "UserId should be number"})
    readonly userId : number;
}