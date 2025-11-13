import { Injectable } from "@angular/core";
import { Camera, CameraResultType, Photo } from "@capacitor/camera";
import { ToastController } from "@ionic/angular";
import { Directory, Filesystem } from "@capacitor/filesystem";
import { Capacitor } from "@capacitor/core";

@Injectable({
    providedIn: 'root'
})
export class CamaraService {
    private savedFile: any;
    public albumName: string = 'ALBUM-SOCIAL-MEDIA'

    constructor(private toastCtrl: ToastController) {
    }

    public async pedirPermisos() {
        const permisos = await Camera.checkPermissions();
        if (permisos.camera != 'granted' || permisos.photos != 'granted') {
            const respuesta = await Camera.requestPermissions();
            if (respuesta.camera != 'granted' || respuesta.photos != 'granted') {
                const toast = await this.toastCtrl.create({
                    message: 'Se han demegado el acceso a la cámara!'
                });
                await toast.present();
                return false;
            } else return true;
        } else {
            return true;
        }
    }

    public async tomarFoto() {
        const foto = await Camera.getPhoto({
            quality: 90,
            resultType: CameraResultType.Base64,
        });
        return foto;
    }

    public async guardarFoto(foto: Photo) {
        const archivo64 = await this.fotoBase64(foto);
        const nombreArchivo = Date.now() + '.jpeg';
        const archivo = await Filesystem.writeFile({
            path: nombreArchivo,
            data: archivo64,
            directory: Directory.Data,
        });
        return {
            nombreArchivo,
            webPath: foto.webPath,
        }
    }

    public async listaFotos() {
        const listaArchivos = await Filesystem.readdir({
            path: '',
            directory: Directory.Data,
        });
        const listaFotos = listaArchivos.files.filter((archivo) => {
            return archivo.name.includes('.jpeg');
        });
        let resultado: any[] = [];
        listaFotos.map(async (foto) => {
            const archivo = await Filesystem.readFile({
                path: foto.name,
                directory: Directory.Data,
            });
            resultado.push({
                ...foto,
                webPath: `data:image/jpeg;base64,${archivo.data}`,
            })
        });
        console.log(resultado);
        return resultado;
    }

    private async fotoBase64(foto: Photo) {
        const respuesta = await fetch(foto.webPath!);
        const blob = await respuesta.blob();
        return await this.convertirBlobABase64(blob) as string;
    }

    private async convertirBlobABase64(blob: Blob) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onerror = reject;
            reader.onload = () => {
                resolve(reader.result);
            };
            reader.readAsDataURL(blob);
        })
    }

    public async guardarVideo(blob: any) {
        const fileName = new Date().getTime() + '.mp4';
        const base64Data = await this.convertirBlobABase64(blob) as string;
        const savedFile = await Filesystem.writeFile({
            path: fileName,
            data: base64Data,
            directory: Directory.Data
        });
        return {
            fileName,
            videoUri: savedFile.uri,
            tipo: 'video',
        }
    }

    public async getVideoUrl(fullPath: string) {
        return Capacitor.convertFileSrc(this.savedFile.uri);
    }
}
