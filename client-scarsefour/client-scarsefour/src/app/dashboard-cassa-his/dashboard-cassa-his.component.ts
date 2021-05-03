import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AutomaCassa } from '../automa-gestione-cassa-his/automa';
import { AutomabileDashboardHis } from '../automa-gestione-cassa-his/automabile-dashboard-his';
import { AnnullaEvent, AnnullaScontrinoEvent, ChiudiEvent, ConfermaEvent, EanEvent, StornaEvent, VediPrezzoEvent } from '../automa-gestione-cassa-his/eventi';
import { AnnullaScontrinoDto } from '../dto/annulla-scontrino-dto';
import { LeggiEanRequestDto } from '../dto/leggi-ean-request-dto';
import { LeggiEanResponseDto } from '../dto/leggi-ean-response-dto';
import { StornaUltimoDto } from '../dto/storna-ultimo-dto';
import { StornaRitornoDto } from '../dto/storna-ritorno-dto';
import { RigaScontrino } from '../entità/riga-scontrino';
import { Scontrino } from '../entità/scontrino';

@Component({
  selector: 'app-dashboard-cassa-his',
  templateUrl: './dashboard-cassa-his.component.html',
  styleUrls: ['./dashboard-cassa-his.component.css', '../theme.css']
})
export class DashboardCassaHisComponent implements OnInit, AutomabileDashboardHis {


  barcode = "";
  messaggioErrore = "";
  righeScontrino: RigaScontrino[] = [];
  rigaScontrino = new RigaScontrino();
  scontrino = new Scontrino();

  ean: boolean;
  vediPrezzoVis: boolean;
  table: boolean;
  storna: boolean;
  annullaScontrinoVis: boolean;
  annullaScontrinoEnabled: boolean;
  confermaVis: boolean;
  confermaEnabled: boolean;
  annullaVis: boolean;
  annullaEnabled: boolean;
  chiudi: boolean;
  chiudiEnabled: boolean;
  prezzo: boolean;

  automaCassa: AutomaCassa;
  constructor(private http: HttpClient) {
    this.automaCassa = new AutomaCassa(this);
  }

  ngOnInit(): void {
  }
  generaVediPrezzoEvent() {
    this.automaCassa.next(new VediPrezzoEvent, this.automaCassa);
  }

  generaEanEvent(barcode: string) {
    this.automaCassa.next(new EanEvent(barcode), this.automaCassa);
  }

  chiudiScontrino() {
    this.automaCassa.next(new ChiudiEvent, this.automaCassa);
  }
  annullaScontrino() {
    this.automaCassa.next(new AnnullaScontrinoEvent, this.automaCassa);
  }
  stornaUltimo() {
    this.automaCassa.next(new StornaEvent(this.righeScontrino.length), this.automaCassa);
  }

  conferma() {
    this.automaCassa.next(new ConfermaEvent, this.automaCassa);
  }

  annulla() {
    console.log("annulla");
    this.automaCassa.next(new AnnullaEvent, this.automaCassa);
  }

  entraStatoScontrinoVuotoEvChiudi() {
    this.ean = true;//
    this.vediPrezzoVis = true;//
    this.table = true;//
    this.storna = true;//
    this.annullaScontrinoVis = true;//
    this.confermaVis = false;//
    this.annullaVis = false;//
    this.chiudi = true;//
    this.prezzo = true;//
    this.annullaScontrinoEnabled = true;//
    this.confermaEnabled = true;//
    this.annullaEnabled = true;//
    this.chiudiEnabled = true;//
  }

  entraStatoVediPrezzo() {
    this.ean = true;
    this.vediPrezzoVis = false;
    this.table = false;
    this.storna = false;
    this.annullaScontrinoVis = false;
    this.confermaVis = false;
    this.annullaVis = false;
    this.chiudi = false;
    this.prezzo = false;
    this.annullaScontrinoEnabled = false;
    this.confermaEnabled = false;
    this.annullaEnabled = false;
    this.chiudiEnabled = false;
  }


  entraStatoScontrinoVuoto() {
    this.ean = true;
    this.vediPrezzoVis = true;
    this.table = false;
    this.storna = false;
    this.annullaScontrinoVis = true;
    this.confermaVis = true;
    this.annullaVis = true;
    this.chiudi = true;
    this.prezzo = false;
    this.annullaScontrinoEnabled = true;
    this.confermaEnabled = true;
    this.annullaEnabled = true;
    this.chiudiEnabled = true;
  }

  
  entraStatoScontrinoNonVuoto() {
    this.ean = true;
    this.vediPrezzoVis = true;
    this.table = true;
    this.storna = true;
    this.annullaScontrinoVis = true;
    this.confermaVis = false;
    this.annullaVis = false;
    this.chiudi = true;
    this.prezzo = true;
    this.annullaScontrinoEnabled = false;
    this.confermaEnabled = false;
    this.annullaEnabled = false;
    this.chiudiEnabled = false;
  }
  entraStatoAnnullamentoScontrino() {
    this.ean = false;
    this.vediPrezzoVis = false;
    this.table = false;
    this.storna = false;
    this.annullaScontrinoVis = false;
    this.confermaVis = true;
    this.annullaVis = true;
    this.chiudi = false;
    this.prezzo = false;
    this.annullaScontrinoEnabled = false;
    this.confermaEnabled = false;
    this.annullaEnabled = false;
    this.chiudiEnabled = false;
  }

  leggiEan() {
    let leggiEanRequestDto = new LeggiEanRequestDto();
    leggiEanRequestDto.eanProdotto = this.barcode;
    leggiEanRequestDto.scontrino = this.scontrino;
    this.http.post<LeggiEanResponseDto>("http://localhost:8080/verifica-ean", leggiEanRequestDto)
      .subscribe(r => {
        //il messaggio è sempre visualizzato perchè se non c'è errore il server invia
        //un messaggio vuoto
        this.messaggioErrore = r.messaggio;

        if (r.rigaScontrino) {
          this.righeScontrino.push(r.rigaScontrino);
        }

        this.rigaScontrino = r.rigaScontrino;

        if (r.scontrino) {
          this.scontrino = r.scontrino;
        }
        console.log(this.scontrino);

        this.generaEanEvent(r.rigaScontrino.prodotto.ean);
      });
  }
  eliminaUltimoElemento() { 
    let dto = new StornaUltimoDto();
    dto.rigaScontrino = this.rigaScontrino;
    dto.scontrino = this.scontrino;
    this.http.post<StornaRitornoDto>("http://localhost:8080/storna-ultimo", dto)
    .subscribe( a =>{
     this.righeScontrino = a.righe
    });

  }

  stampaScontrino() {
    this.scontrino = new Scontrino();
    this.righeScontrino = [];
    this.rigaScontrino = new RigaScontrino();
  }

  vediPrezzo() {
    
  }

  confermaAnnullaScontrino() {
    let dto = new AnnullaScontrinoDto();
    dto.scontrino = this.scontrino;
    dto.righeScontrino = this.righeScontrino;

    this.http.post<AnnullaScontrinoDto>("http://localhost:8080/annulla-scontrino", dto)
      .subscribe(r => {
        this.scontrino = new Scontrino();
        this.righeScontrino = [];
        this.rigaScontrino = new RigaScontrino();
      });
  }
}


