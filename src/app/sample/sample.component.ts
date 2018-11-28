import { JokesService } from './../services/jokes.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sample',
  templateUrl: './sample.component.html',
  styleUrls: ['./sample.component.css']
})
export class SampleComponent implements OnInit, OnDestroy {
  subscribeFetchJokes: Subscription;
  subscribeFetchOne: Subscription;
  subscribeFetchPago: Subscription;

  cacheFirstError = false;
  cacheFirstLoaded = false;

  networkFirstError = false;
  networkFirstLoaded = false;

  dataCacheFirst = null;
  dataNetworkFirst = null;
  dataPago = null;

  pagoProcesado = false;
  pagoError = false;

  constructor(private jokes: JokesService) { }

  ngOnInit() {
  }

  getCacheFirst() {
    this.subscribeFetchJokes = this.jokes.getJokes().subscribe( (data) => {
      this.dataCacheFirst = data;
      this.cacheFirstLoaded = true;
      this.cacheFirstError = false;
    }, (e) => this.cacheFirstError = true);
  }

  getNetworkFirst() {
    this.subscribeFetchOne =  this.jokes.fetchOne().subscribe((data) => {
      this.dataNetworkFirst = data;
      this.networkFirstError = false;
      this.networkFirstLoaded = true;
    }, (e) => this.networkFirstError = true);
  }

  postPagos () {
    this.subscribeFetchPago = this.jokes.postPagos()
      .subscribe((data) => {
        this.dataPago = 'ok';
        this.pagoProcesado = false;
        this.pagoError = false;
      }, (e) => {
        this.dataPago = 'error';
        this.pagoProcesado = false;
        this.pagoError = true;
      }
    );
  }

  ngOnDestroy() {
    if (this.subscribeFetchPago) {
      this.subscribeFetchPago.unsubscribe();
    }
    if (this.subscribeFetchJokes) {
      this.subscribeFetchJokes.unsubscribe();
    }
    if (this.subscribeFetchOne) {
      this.subscribeFetchOne.unsubscribe();
    }
  }
}
