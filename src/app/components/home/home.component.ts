import { Component, OnInit, OnDestroy } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {
  /**
   * POST https://accounts.spotify.com/api/token
   */
   public CLIENT_CREDENTIALS = 'e70933252fba4575bc0cef0c405a77f6';
   public CLIENT_SECRET = '9578acb18f7144f7902ffe9aed988dbe';
   public tokenUsuarioSpotify: string;
   public newReleases: any[] = [];
   public loading: boolean;
   public error = false;
   public mensajeError: string;

  constructor(
    private spotifyService: SpotifyService
  ) {
      this.loading = true;
  }

  consultarTokenUsuario() {
    this.spotifyService.obtenerTokenUsuario(this.CLIENT_CREDENTIALS,
                                            this.CLIENT_SECRET)
        .subscribe( token => {
          this.tokenUsuarioSpotify = token.token_type + ' ' + token.access_token;
          this.spotifyService.HEADERS = this.tokenUsuarioSpotify;

          this.consultarNuevasCanciones();
        }, error => {
          console.error('Error: ' + error);
        });
  }

  consultarNuevasCanciones() {
    this.spotifyService.getNewReleases()
              .subscribe( ( releases: any ) => {
                this.newReleases = releases;
                this.loading = false;
              }, error => {
                this.loading = false;
                this.error = true;
                this.mensajeError = error.error.error.message;
              });
  }

  ngOnInit() {
    this.consultarTokenUsuario();
  }

}
