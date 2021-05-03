/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package it.sirfin.scarsefour.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

@Entity
public class Scontrino implements Serializable {

    @Id
    @GeneratedValue
    private Long id;

    @Column
    private LocalDateTime timestamp;
    @Column
    private Integer numero;
    @Column
    private Double totale;

    @ManyToOne
    @JoinColumn(referencedColumnName = "id")
    private Cassiera cassiera;

    @ManyToOne
    @JoinColumn(referencedColumnName = "id")
    private Cassa cassa;

    @JsonIgnoreProperties(value = "scontrino")
    @OneToMany(mappedBy = "scontrino")
    private Set<RigaScontrino> righeScontrino;

    public Scontrino() {
    }

    public Scontrino(LocalDateTime timestamp, Integer numero, Double totale) {
        this.timestamp = timestamp;
        this.numero = numero;
        this.totale = totale;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }

    public Integer getNumero() {
        return numero;
    }

    public void setNumero(Integer numero) {
        this.numero = numero;
    }

    public Double getTotale() {
        return totale;
    }

    public void setTotale(Double totale) {
        this.totale = totale;
    }

    public Cassiera getCassiera() {
        return cassiera;
    }

    public void setCassiera(Cassiera cassiera) {
        this.cassiera = cassiera;
    }

    public Cassa getCassa() {
        return cassa;
    }

    public void setCassa(Cassa cassa) {
        this.cassa = cassa;
    }

    public Set<RigaScontrino> getRigheScontrino() {
        if (righeScontrino == null) {
            righeScontrino = new HashSet<>();
        }
        return righeScontrino;
    }

    public void setRigheScontrino(Set<RigaScontrino> righeScontrino) {
        this.righeScontrino = righeScontrino;
    }

    @Override
    public String toString() {
        return "Scontrino{" + "id=" + id + ", timestamp=" + timestamp + ", numero=" + numero + ", totale=" + totale + '}';
    }

}

//{"righeScontrino":[{
//"idRiga":31,"idScontrino":30,"idProdotto":19,"quantita":1,"descrizione":"Secondo prodotto \uD83E\uDD48 ","prezzo":0.0}],
//"scontrino":
//{"id":30,"timestamp":null,"numero":null,"totale":null,"cassiera":null,"cassa":null,
//"righeScontrino":
//[{"id":31,"quantita":1,"prodotto":
//                            {"id":19,"ean":"ASFGH12345HJF","codice":"ZXCVBN1234","descrizione":
//                            "Secondo prodotto \uD83E\uDD48 ","prezzo":0.0,"scortaMinimaScaf":0,"scortaMinimaMag":0,"lottoRiordino":0,"sconti":[]},
//                            "movimentiScaffale":null}]}
//    
//,"messaggio":"scontrino pronto!"}
