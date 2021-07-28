import { Component, OnInit, OnDestroy } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: []
})
export class SearchComponent  {

  public token = 'Bearer BQB0NWN1pI64ILNCFfA7fEYYY4hy26psLMpsVGmx35QZ5Bd1TthqEoERE3CPwZ9L5NKpurmBeAGQdzaMmW8';
  public loading: boolean;
  public artistas: any[] = [];

  constructor(
    private spotifyService: SpotifyService
  ) {

    

   }

  buscar(id: string) {
    this.loading = true;
   this.spotifyService.getArtistas(id)
        .subscribe( ( artistas: any ) => {
          this.artistas = artistas;
          this.loading = false;
        });
  }

}
