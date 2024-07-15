

export const formatDate=(str)=>{
    const date=new Date(str);
    const year=date.getFullYear();
    const month=String(date.getMonth()+1).padStart(2,'0');
    const day = String(date.getDate()).padStart(2, '0');   
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    //const seconds = String(date.getSeconds()).padStart(2, '0');    :${seconds}
    
    return `${year}-${month}-${day} ${hours}:${minutes}`;

}

export const formatDob=(str)=>{
    const date=new Date(str);
    const year=date.getFullYear();
    const month=String(date.getMonth()+1).padStart(2,'0');
    const day = String(date.getDate()).padStart(2, '0');   
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${day}/${month}/${year}`;
}


export const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
            resolve(fileReader.result);
        };
        fileReader.onerror = (error) => {
            reject(error);
        };
    });
};