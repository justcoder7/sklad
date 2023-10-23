import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as fs from 'fs'
import * as path from 'path';
import * as uuid from 'uuid';

@Injectable()
export class FilesService {

    async createFile(file): Promise<string>  {
        try {
            const FileName = uuid.v4() + '.jpg';
            const FilePath = path.resolve(__dirname, '..', 'static')
            if(!fs.existsSync(FilePath)) {
                fs.mkdirSync(FilePath, {recursive : true} )
            }
            fs.writeFileSync(path.join(FilePath, FileName), file.buffer);
            return FileName;
        } catch (error) {
            console.log(error);
            throw new HttpException(("Issue with uploading file"), HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
    
}
