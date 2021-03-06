package it.sirfin.scarsefour.dto;

import it.sirfin.scarsefour.model.Cassa;

public class CassaDto {
    
    private Cassa cassa;

    public CassaDto() {
    }

    public CassaDto(Cassa cassa) {
        this.cassa = cassa;
    }

    public Cassa getCassa() {
        return cassa;
    }

    public void setCassa(Cassa cassa) {
        this.cassa = cassa;
    }

    @Override
    public String toString() {
        return "CassaDto{" + "cassa=" + cassa + '}';
    }
    
    
}
