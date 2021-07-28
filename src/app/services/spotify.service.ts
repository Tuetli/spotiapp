import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

//    { providedIn: 'root'}
/**
 * Nos permite declarar el servicio en toda la aplicación sin necesidad
 * de ponerlo en todos los constructores de los componentes.
 */

@Injectable()
export class SpotifyService {

    public HEADERS: any = {};

    constructor(
        private http: HttpClient
    ) { }

    getQuery( query: string) {
        const url = `https://api.spotify.com/v1/${ query }`;
        const headers = new HttpHeaders({
            Authorization: this.HEADERS
        });
        
        return this.http.get(url, {headers});
    }

    getNewReleases() {
        return this.getQuery('browse/new-releases/')
                   .pipe(map(data => data['albums'].items));
    }

    obtenerTokenUsuario(clientCredentials: string, clientSecret: string): Observable<any> {
        const params = new URLSearchParams();

        params.set('grant_type', 'client_credentials');
        params.set('client_id', clientCredentials);
        params.set('client_secret', clientSecret);

        const options = {
            headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
        };

        return this.http.post('https://accounts.spotify.com/api/token', params.toString(), options);
    }

    getArtistas(id: string) {
        return this.getQuery(`search?q=${id}&type=artist&limit=15`)
                   .pipe( map( data => data['artists'].items));
    }

    getArtista(id: string) {
        return this.getQuery(`artists/${ id }`);
    }

    getTopTracks(id: string) {
        return this.getQuery(`artists/${ id }/top-tracks?country=us`)
        .pipe( map( data => data['tracks']));
    }
}
