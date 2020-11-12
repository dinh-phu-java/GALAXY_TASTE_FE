import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class FileService {
    public fileType = ['jpg', 'png', 'jpeg'];
    public MAX_FILE_SIZE = 5242880;//~5MB 5242880
    public getFileType() {
        return this.fileType.slice();
    }
    public getFileSize() {
        return this.MAX_FILE_SIZE;
    }
}