export class MYDOWNLOAD {
    static downloadFile(file: any) {
        let dataType = file.type;
        let binaryData = [];
        binaryData.push(file);
        let downloadLink = document.createElement('a');
        downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, { type: dataType }));
        downloadLink.setAttribute('download', `Alarms-${Date.now()}.xlsx`);
        document.body.appendChild(downloadLink);
        downloadLink.click();
    }
}