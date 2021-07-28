import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-artista',
  templateUrl: './artista.component.html',
  styles: []
})
export class ArtistaComponent implements OnInit {

  public artista: any = {};
  public topTracks: any[] = [];
  public loading = true;

  constructor(
    private activatedRoute: ActivatedRoute,
    private spotifyService: SpotifyService
  ) {


    this.activatedRoute.params.subscribe( params => {
        this.getArtista(params['id']);
        this.getTopTracks(params['id']);
    });
   }


   getArtista( id: string) {
      this.spotifyService.getArtista(id).subscribe(
        data => {
          this.artista = data;
          this.loading = false;
        }, error => {
          
        }
      );
   }

   getTopTracks( id: string ) {
     this.spotifyService.getTopTracks(id).subscribe(
       data => {
         console.log('topTracks: ' + JSON.stringify(data));
          this.topTracks = data;
       }, error => {

       }
     );
   }

  ngOnInit(): void {
  }

}
